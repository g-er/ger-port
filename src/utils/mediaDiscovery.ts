/**
 * Static media manifest — all files are hosted on GitHub Releases.
 * Base URL for all assets:
 */
const BASE = 'https://github.com/g-er/ger-port/releases/download/portfolio';

const imageExts = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
const videoExts = /\.(mp4|mov|webm|ogg|avi)$/i;
const subtitleExts = /\.(vtt)$/i;

// Map of virtual path -> remote URL
// Key format: /images/<folder>/<filename>
const allFiles: Record<string, string> = {};

const manifest: string[] = [
  // cycles
  'cycles/1.JPEG',
  'cycles/2.mov',
  'cycles/3.jpg',
  'cycles/b.jpg',
  'cycles/DSC05888.jpg',
  'cycles/DSC05889.jpg',
  'cycles/IMG_0661.MP4',
  'cycles/img_0692-1-4.png',
  // mee
  'mee/dsc02273-1024x683.jpg',
  'mee/dsc02302-1024x683.jpg',
  'mee/dsc02323-1024x683.jpg',
  'mee/IMG_0629.JPEG',
  'mee/IMG_0639.MOV',
  // noah-choking
  'noah-choking/1.jpg',
  'noah-choking/2.jpg',
  'noah-choking/3.MOV',
  // sld
  'sld/1.JPEG',
  'sld/3.JPEG',
  'sld/video_20250505_171001.mp4',
  'sld/video_20250505_171001.vtt',
  'sld/video_20250506_142001.mp4',
  'sld/video_20250506_142001.vtt',
  'sld/video_20250506_175001.mp4',
  'sld/video_20250506_175001.vtt',
  'sld/video_20250512_170501.mp4',
  'sld/video_20250512_170501.vtt',
  'sld/z.MOV',
];

for (const rel of manifest) {
  const filename = rel.split('/').pop()!;
  allFiles[`/images/${rel}`] = `${BASE}/${filename}`;
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
