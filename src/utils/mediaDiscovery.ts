/**
 * Auto-discover media files from public/images/ using import.meta.glob.
 * Vite resolves these at build time. Each key is like
 * "/images/DSC05889.jpg" — already the public URL path.
 *
 * We eagerly import everything from public/images/ so page components
 * can filter by folder prefix at runtime.
 */

const imageExts = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
const videoExts = /\.(mp4|mov|webm|ogg|avi)$/i;
const subtitleExts = /\.(vtt)$/i;

// Glob all files under public/images/ — import.meta.glob needs the filesystem
// path (including /public/), but at runtime files in public/ are served from root.
const rawFiles = import.meta.glob<string>('/public/images/**/*.*', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Strip the /public prefix from keys so they match the runtime serving path
const allFiles: Record<string, string> = {};
for (const [path, url] of Object.entries(rawFiles)) {
  allFiles[path.replace(/^\/public/, '')] = url;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  subtitle?: string;
}

/**
 * Get all media items from a given folder under /images/.
 * @param folder - e.g. "" for root /images/, or "sld" for /images/sld/
 */
export function getMediaFromFolder(folder: string): MediaItem[] {
  const prefix = folder
    ? `/images/${folder}/`
    : '/images/';

  const items: MediaItem[] = [];

  // Build a map of subtitle files: base filename (without ext) -> URL
  const subtitles = new Map<string, string>();
  for (const [path, url] of Object.entries(allFiles)) {
    if (!path.startsWith(prefix)) continue;
    const relativePart = path.slice(prefix.length);
    if (folder && relativePart.includes('/')) continue;
    if (!folder && path.replace('/images/', '').includes('/')) continue;
    const fileName = path.split('/').pop() || '';
    if (subtitleExts.test(fileName)) {
      const baseName = fileName.replace(/\.[^.]+$/, '');
      subtitles.set(baseName, url);
    }
  }

  for (const [path, url] of Object.entries(allFiles)) {
    // Only include files directly in the target folder (not deeper subfolders)
    // unless folder is root
    if (!path.startsWith(prefix)) continue;

    const relativePart = path.slice(prefix.length);
    // Skip files in subdirectories when requesting a specific folder
    if (folder && relativePart.includes('/')) continue;
    // Skip files in subdirectories when requesting root
    if (!folder && path.replace('/images/', '').includes('/')) continue;

    const fileName = path.split('/').pop() || '';

    if (imageExts.test(fileName)) {
      items.push({ type: 'image', src: url, alt: fileName });
    } else if (videoExts.test(fileName)) {
      const baseName = fileName.replace(/\.[^.]+$/, '');
      items.push({ type: 'video', src: url, subtitle: subtitles.get(baseName) });
    }
  }

  // Sort alphabetically by filename for consistent order
  items.sort((a, b) => {
    const nameA = a.src.split('/').pop() || '';
    const nameB = b.src.split('/').pop() || '';
    return nameA.localeCompare(nameB);
  });

  return items;
}
