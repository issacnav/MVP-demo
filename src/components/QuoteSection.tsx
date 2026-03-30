"use client";

import { QuoteIcon } from "@/components/icons";
import { FadeIn, ScaleIn } from "@/components/Motion";

export function QuoteSection() {
  return (
    <div id="quote" className="relative flex flex-col items-center justify-center border-x border-edge px-6 py-12 text-center screen-line-before screen-line-after">
      <ScaleIn>
        <QuoteIcon className="mb-6 size-10 fill-current text-zinc-300 dark:text-zinc-600" />
      </ScaleIn>
      <FadeIn delay={0.2} y={30}>
        <blockquote className="mb-6 max-w-2xl text-xl font-medium text-zinc-700 italic sm:text-2xl dark:text-zinc-300">
        &quot;Movement is a medicine for creating change in a person&apos;s physical, emotional, and mental states.&quot;
      </blockquote>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
          <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Carol Welch
          </span>
          <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </FadeIn>
    </div>
  );
}
