/**
 * Static media manifest.
 *
 * Images are served from the portfolio GitHub Release. Videos use same-origin
 * MP4 copies because Safari rejects GitHub Release attachment responses.
 */
const BASE = 'https://github.com/g-er/ger-port/releases/download/portfolio';

const imageExts = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
const videoExts = /\.(mp4|mov|webm|ogg|avi|qt)$/i;
const subtitleExts = /\.(vtt)$/i;

// Map of virtual path -> URL
// Key format: /images/<folder>/<filename>
const allFiles: Record<string, string> = {};

const localVideoOverrides: Record<string, string> = {
  '/images/cycles/2.mp4': '/images/cycles/2.mp4',
  '/images/cycles/IMG_0661.MP4': '/images/cycles/IMG_0661.MP4',
  '/images/mee/IMG_0639.mp4': '/images/mee/IMG_0639.mp4',
  '/images/noah-choking/3.mp4': '/images/noah-choking/3.mp4',
  '/images/sld/video_20250505_171001.mp4': '/images/sld/video_20250505_171001.mp4',
  '/images/sld/video_20250506_142001.mp4': '/images/sld/video_20250506_142001.mp4',
  '/images/sld/video_20250506_175001.mp4': '/images/sld/video_20250506_175001.mp4',
  '/images/sld/video_20250512_170501.mp4': '/images/sld/video_20250512_170501.mp4',
  '/images/sld/z.mp4': '/images/sld/z.mp4',
};

const localNovelObjectsMedia = [
  'IMG_1560.MOV',
  'Screencast_20260918_163742.mp4',
  'Screenshot_20260918_163641.png',
  '„spring2026-44.jpg“ kopija.JPEG',
  '„spring2026-47.jpg“ kopija.JPEG',
  '„spring2026-49.jpg“ kopija.JPEG',
  'birth defects or reproductive harm/9c239eca3476427f8f64272148a08c0d.qt',
  'birth defects or reproductive harm/IMG_1664.JPEG',
  'birth defects or reproductive harm/IMG_1699.JPEG',
  'birth defects or reproductive harm/IMG_1708.JPEG',
];

for (const rel of localNovelObjectsMedia) {
  allFiles[`/images/novel-objects/${rel}`] = `/images/novel-objects/${rel}`;
}

// Large remote files (GitHub Releases)
const remoteManifest: string[] = [
  // cycles
  'cycles/1.JPEG',
  'cycles/2.mp4',
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
  'mee/IMG_0639.mp4',
  // noah-choking
  'noah-choking/1.jpg',
  'noah-choking/2.jpg',
  'noah-choking/3.mp4',
  // sld — videos only (subtitles served locally)
  'sld/1sld.JPEG',
  'sld/3.JPEG',
  'sld/video_20250505_171001.mp4',
  'sld/video_20250506_142001.mp4',
  'sld/video_20250506_175001.mp4',
  'sld/video_20250512_170501.mp4',
  'sld/z.mp4',
];

for (const rel of remoteManifest) {
  const filename = rel.split('/').pop()!;
  allFiles[`/images/${rel}`] = `${BASE}/${filename}`;
}

for (const [path, url] of Object.entries(localVideoOverrides)) {
  allFiles[path] = url;
}

// Local subtitle files (.vtt) — must be served from same origin for <track> CORS
const localSubtitles: string[] = [
  'sld/video_20250505_171001.vtt',
  'sld/video_20250506_142001.vtt',
  'sld/video_20250506_175001.vtt',
  'sld/video_20250512_170501.vtt',
];

for (const rel of localSubtitles) {
  allFiles[`/images/${rel}`] = `/images/${rel}`;
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
