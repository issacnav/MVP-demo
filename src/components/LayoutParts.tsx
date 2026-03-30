"use client";

import { FadeIn } from "@/components/Motion";

export function SectionSeparator() {
  return (
    <div className="section-separator relative flex h-6 w-full border-x border-edge" />
  );
}

export function CrossMarker({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const posClasses = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  return (
    <div className={`absolute ${posClasses[position]}`}>
      <div className="relative flex size-3 items-center justify-center">
        <div className="absolute h-[1px] w-full bg-zinc-300 dark:bg-zinc-500" />
        <div className="absolute h-full w-[1px] bg-zinc-300 dark:bg-zinc-500" />
      </div>
    </div>
  );
}

export function Panel({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id={id}>
      <header className="screen-line-after px-4">
        <FadeIn y={10}>
          <h2 className="font-pixel text-3xl font-semibold">{title}</h2>
        </FadeIn>
      </header>
      {children}
    </section>
  );
}
