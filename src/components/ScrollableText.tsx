import { useRef, useState, useEffect, useCallback } from 'react';
import './ScrollableText.css';

interface ScrollableTextProps {
  children: React.ReactNode;
}

/**
 * Wraps content in a container that is capped at the parent's height.
 * If the content overflows, up/down arrow buttons appear to scroll it.
 */
export default function ScrollableText({ children }: ScrollableTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 4);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const scrollBy = (dir: 1 | -1) => {
    containerRef.current?.scrollBy({ top: dir * containerRef.current.clientHeight * 0.8, behavior: 'smooth' });
  };

  const showControls = canScrollUp || canScrollDown;

  return (
    <div className="scrollable-text-wrapper">
      <div className="scrollable-text-content" ref={containerRef}>
        {children}
      </div>
      {showControls && (
        <div className="scrollable-text-controls">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canScrollUp}
            aria-label="Scroll up"
          >&#8593;</button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canScrollDown}
            aria-label="Scroll down"
          >&#8595;</button>
        </div>
      )}
    </div>
  );
}
