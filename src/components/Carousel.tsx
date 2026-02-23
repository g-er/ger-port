import { useState } from 'react';
import './Carousel.css';
import { getMediaFromFolder } from '../utils/mediaDiscovery';
import type { MediaItem } from '../utils/mediaDiscovery';

// Re-export so existing imports still work
export type { MediaItem };

interface CarouselProps {
  items?: MediaItem[];
  folder?: string;
}

export default function Carousel({ items: itemsProp, folder }: CarouselProps) {
  const [index, setIndex] = useState(0);

  // If folder is given, auto-discover; otherwise use provided items
  const items = itemsProp ?? (folder != null ? getMediaFromFolder(folder) : []);

  if (items.length === 0) return null;

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }
  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  const current = items[index];

  return (
    <div className="carousel">
      <div className="carousel-media">
        {current.type === 'video' ? (
          <video key={current.src} controls src={current.src} className="carousel-item">
            {current.subtitle && (
              <track
                kind="subtitles"
                src={current.subtitle}
                srcLang="en"
                label="English"
                default
              />
            )}
            Your browser does not support the video tag.
          </video>
        ) : (
          <img key={current.src} src={current.src} alt={current.alt || ''} className="carousel-item" />
        )}
      </div>
      {items.length > 1 && (
        <div className="carousel-controls">
          <button onClick={prev} aria-label="Previous">&#8592;</button>
          <span className="carousel-counter">{index + 1} / {items.length}</span>
          <button onClick={next} aria-label="Next">&#8594;</button>
        </div>
      )}
    </div>
  );
}
