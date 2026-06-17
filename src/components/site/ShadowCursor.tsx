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
      const lerp = 0.08;
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
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${shadowPos.x}px, ${shadowPos.y}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 28,
          height: 28,
          background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
}
