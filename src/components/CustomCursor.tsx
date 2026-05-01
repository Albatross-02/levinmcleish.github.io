import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const cursor = cursorRef.current;
      const trail = trailRef.current;
      if (cursor && trail) {
        cursor.style.transform = `translate(${posRef.current.x - 8}px, ${posRef.current.y - 8}px)`;
        trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.12;
        trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.12;
        trail.style.transform = `translate(${trailPosRef.current.x - 20}px, ${trailPosRef.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    const onMouseDown = () => {
      cursorRef.current?.classList.add('scale-75');
      trailRef.current?.classList.add('scale-125');
    };
    const onMouseUp = () => {
      cursorRef.current?.classList.remove('scale-75');
      trailRef.current?.classList.remove('scale-125');
    };
    const onMouseEnterLink = () => {
      cursorRef.current?.classList.add('mix-blend-difference');
      trailRef.current?.style.setProperty('opacity', '0.5');
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          border: '1px solid rgba(0, 191, 255, 0.4)',
          background: 'rgba(0, 191, 255, 0.04)',
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[10000] transition-transform duration-75"
        style={{
          background: 'radial-gradient(circle, #00ffff, #00bfff)',
          boxShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 16px rgba(0, 191, 255, 0.5)',
        }}
      />
    </>
  );
}
