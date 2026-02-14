import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        "w-full max-w-xl rounded-3xl border border-border/40 bg-card/80 text-card-foreground shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur",
        "px-6 py-8 md:px-10 md:py-10",
        className,
      )}
    >
      {children}
    </section>
  );
}

