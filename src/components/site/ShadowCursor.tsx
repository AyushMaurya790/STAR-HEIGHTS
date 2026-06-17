import { useEffect, useRef, useState } from "react";

export function ShadowCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const shadowRef = useRef({ x: -100, y: -100 });
  const [shadowPos, setShadowPos] = useState({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      const lerp = 0.12;
      shadowRef.current.x += (pos.x - shadowRef.current.x) * lerp;
      shadowRef.current.y += (pos.y - shadowRef.current.y) * lerp;
      setShadowPos({ x: shadowRef.current.x, y: shadowRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pos.x, pos.y]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <style>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"], input, textarea, select, label[for] {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          body, a, button, [role="button"], input, textarea, select, label[for] {
            cursor: auto !important;
          }
        }
      `}</style>
      {/* outer gold glow ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${shadowPos.x}px, ${shadowPos.y}px)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 48,
            height: 48,
            background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0) 70%)",
            filter: "blur(6px)",
          }}
        />
      </div>

      {/* middle dark shadow ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          transform: `translate(${shadowPos.x}px, ${shadowPos.y}px)`,
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40"
          style={{
            width: 32,
            height: 32,
            boxShadow: "0 0 20px rgba(212,175,55,0.3), inset 0 0 10px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* core gold dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          style={{
            width: 8,
            height: 8,
            boxShadow: "0 0 12px rgba(212,175,55,0.8), 0 0 4px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </>
  );
}
