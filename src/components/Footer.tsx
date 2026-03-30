"use client";

import { useRef } from "react";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn } from "@/components/Motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import hiAnimation from "../../public/Hi.json";

export function Footer() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

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

        <div className="flex items-end justify-between gap-2 px-3 pb-4 sm:px-4">
          <div className="mt-6 flex flex-col leading-none">
            <span className="font-mono text-[12px] text-muted-foreground">
              © 2026 Sarthak Navalekar
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">
              Physiotherapist · Scotland, UK
            </span>
          </div>
          <div className="w-20 h-20 cursor-pointer flex-shrink-0" onClick={handleClick}>
            <Lottie
              lottieRef={lottieRef}
              animationData={hiAnimation}
              loop={false}
              autoplay
              onComplete={handleComplete}
            />
          </div>
        </div>
    </footer>
    </FadeIn>
  );
}
