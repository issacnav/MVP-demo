"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn } from "@/components/Motion";
import { Signature } from "@/components/Signature";
import { cn } from "@/lib/utils";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});

export function Footer({ showMascot = false }: { showMascot?: boolean }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hiAnimation = useRef<object | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!showMascot) {
      return;
    }

    import("../../public/Hi.json").then((mod) => {
      hiAnimation.current = mod.default;
      setLoaded(true);
    });
  }, [showMascot]);

  const handleClick = () => {
    lottieRef.current?.goToAndPlay(0);
  };

  const handleComplete = () => {
    lottieRef.current?.pause();
  };

  return (
    <FadeIn>
      <footer className="screen-line-before screen-line-after relative border-x border-edge">
        <CrossMarker position="bottom-left" />
        <CrossMarker position="bottom-right" />

        <div
          className={cn(
            "flex items-end gap-2 px-3 pb-4 sm:px-4",
            showMascot ? "justify-between" : "justify-start"
          )}
        >
          <div className="mt-6 flex flex-col leading-none">
            <Signature className="mb-2 w-24 text-foreground sm:w-28" />
            <span className="font-mono text-[12px] text-muted-foreground">
              Â© 2026 Sarthak Navalekar
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">
              Physiotherapist Â· Scotland, UK
            </span>
          </div>

          {showMascot && (
            <div className="h-20 w-20 flex-shrink-0 cursor-pointer" onClick={handleClick}>
              {loaded && hiAnimation.current && (
                <Lottie
                  lottieRef={lottieRef}
                  animationData={hiAnimation.current}
                  loop={false}
                  autoplay
                  onComplete={handleComplete}
                />
              )}
            </div>
          )}
        </div>
      </footer>
    </FadeIn>
  );
}
