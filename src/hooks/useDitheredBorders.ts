import { useRef, useEffect } from 'react';

/** Per-element state: its own fade */
interface ElementBorder {
  el: HTMLElement;
  hoverFade: number;   // 0–1, independent per element
  hovered: boolean;
  _mouseHover: boolean;
}

export function useDitheredBorders(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  options?: {
    color?: string;
    lineWidth?: number;
    extend?: number;
    pad?: number;
  }
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number>(0);
  const bordersMap = useRef<Map<HTMLElement, ElementBorder>>(new Map());
  const prevTime = useRef(0);

  const color = options?.color ?? '#2600ffff';
  const lineWidth = options?.lineWidth ?? 1;
  const extend = options?.extend ?? 0;
  const pad = options?.pad ?? 15;

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const container = containerRef.current || document.body;

    function getBorder(el: HTMLElement): ElementBorder {
      let b = bordersMap.current.get(el);
      if (!b) {
        b = {
          el,
          hoverFade: 0,
          hovered: false,
          _mouseHover: false,
        };
        bordersMap.current.set(el, b);
      }
      return b;
    }

    const onEnter = (e: Event) => {
      const t = (e.target as HTMLElement).closest(selector) as HTMLElement | null;
      if (t) {
        const b = getBorder(t);
        b.hovered = true;
        b._mouseHover = true;
      }
    };
    const onLeave = (e: Event) => {
      const t = (e.target as HTMLElement).closest(selector) as HTMLElement | null;
      if (t) {
        const b = bordersMap.current.get(t);
        if (b) {
          b._mouseHover = false;
          if (!t.classList.contains('active')) {
            b.hovered = false;
          }
        }
      }
    };

    container.addEventListener('mouseenter', onEnter, true);
    container.addEventListener('mouseleave', onLeave, true);

    const frame = (time: number) => {
      const dt = prevTime.current ? Math.min((time - prevTime.current) / 1000, 0.05) : 0.016;
      prevTime.current = time;

      const cvs = canvasRef.current;
      if (!cvs) { animRef.current = requestAnimationFrame(frame); return; }
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      // Purge stale entries
      for (const [el] of bordersMap.current) {
        if (!document.body.contains(el)) {
          bordersMap.current.delete(el);
        }
      }

      // Ensure .active elements have borders
      const activeEls = container.querySelectorAll<HTMLElement>(`${selector}.active`);
      for (const el of activeEls) {
        const b = getBorder(el);
        b.hovered = true;
      }
      // Non-active, non-hovered elements shouldn't stay alive
      for (const b of bordersMap.current.values()) {
        if (!b.el.classList.contains('active') && !b._mouseHover) {
          b.hovered = false;
        }
      }

      // Check if anything needs drawing
      let anyActive = false;
      for (const b of bordersMap.current.values()) {
        if (b.hovered || b.hoverFade > 0.001) { anyActive = true; break; }
      }

      if (!anyActive) {
        cvs.width = 0; cvs.height = 0;
        animRef.current = requestAnimationFrame(frame);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      cvs.style.width = `${vw}px`;
      cvs.style.height = `${vh}px`;
      if (cvs.width !== vw * dpr || cvs.height !== vh * dpr) {
        cvs.width = vw * dpr;
        cvs.height = vh * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      for (const b of bordersMap.current.values()) {
        // Fade independently
        if (b.hovered && b.hoverFade < 1) {
          b.hoverFade = Math.min(1, b.hoverFade + dt * 3);
        } else if (!b.hovered && b.hoverFade > 0) {
          b.hoverFade = Math.max(0, b.hoverFade - dt * 3);
        }

        if (b.hoverFade < 0.001) continue;

        const rect = b.el.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) continue;

        ctx.globalAlpha = b.hoverFade;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        const left = rect.left - pad;
        const right = rect.right + pad;
        const top = rect.top - pad;
        const bottom = rect.bottom + pad;

        ctx.beginPath();
        // Top line
        ctx.moveTo(left - extend, top);
        ctx.lineTo(right + extend, top);
        // Bottom line
        ctx.moveTo(left - extend, bottom);
        ctx.lineTo(right + extend, bottom);
        // Left line
        ctx.moveTo(left, top - extend);
        ctx.lineTo(left, bottom + extend);
        // Right line
        ctx.moveTo(right, top - extend);
        ctx.lineTo(right, bottom + extend);
        ctx.stroke();
      }

      // Clean up fully faded elements
      for (const [el, b] of bordersMap.current) {
        if (!b.hovered && b.hoverFade < 0.001) {
          bordersMap.current.delete(el);
        }
      }

      animRef.current = requestAnimationFrame(frame);
    };

    animRef.current = requestAnimationFrame(frame);

    return () => {
      container.removeEventListener('mouseenter', onEnter, true);
      container.removeEventListener('mouseleave', onLeave, true);
      cancelAnimationFrame(animRef.current);
      canvas.remove();
      bordersMap.current.clear();
    };
  }, [containerRef, selector, color, lineWidth, extend, pad]);
}
