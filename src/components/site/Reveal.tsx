import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = As as React.ElementType;
  return (
    <Tag
      ref={ref}
      style={{
        animationDelay: shown ? `${delay}ms` : undefined,
        opacity: shown ? undefined : 0,
      }}
      className={`${shown ? "animate-reveal-up" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
