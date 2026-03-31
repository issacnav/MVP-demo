"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, useRef } from "react";
import { VerifiedIcon } from "@/components/icons";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn, ScaleIn, SlideIn, motion } from "@/components/Motion";
import { AnimatePresence } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});

const titles = ["Physiotherapist", "MSK Rehab", "Manual Therapy", "Private Practice"];

function TextFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
      {/* Invisible spacers stacked on same grid cell - sizes container to widest title */}
      {titles.map((t) => (
        <span key={t} className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">{t}</span>
      ))}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={titles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
      <span>Time</span>
      <span>{time} Local</span>
    </span>
  );
}

function PronounceName() {
  const speak = useCallback(() => {
    const utter = new SpeechSynthesisUtterance("Alex Morgan");
    utter.lang = "en-US";
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, []);

  return (
    <motion.button
      onClick={speak}
      className="inline-flex items-center justify-center rounded-full border border-border p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Pronounce name"
      title="Pronounce name"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </motion.button>
  );
}

export function HeroSection() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [catAnimation, setCatAnimation] = useState<object | null>(null);

  useEffect(() => {
    import("../../public/loader-cat.json").then((mod) => {
      setCatAnimation(mod.default);
    });
  }, []);

  return (
    <>
      {/* Dotted banner */}
      <div className="border-x border-edge select-none screen-line-before screen-line-after">
        <motion.div
          className="overflow-hidden p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="dot-pattern h-full min-h-[70px] w-full px-[5px] sm:min-h-[110px]" />
        </motion.div>
      </div>

      {/* Profile row */}
      <div className="screen-line-after relative flex border-x border-edge">
        <CrossMarker position="top-left" />
        <CrossMarker position="top-right" />

        {/* Avatar */}
        <ScaleIn delay={0.2} className="w-[35%] shrink-0 p-2 sm:w-auto sm:shrink-0 sm:p-5">
          <motion.div
            className="aspect-square h-auto w-full rounded-[12px] border border-border p-[4px] transition duration-200 hover:brightness-95 sm:size-32"
            whileHover={{ scale: 1.07, y: -3, rotate: -1.8, rotateX: 2.5, rotateY: -5.5 }}
            transition={{ type: "spring", stiffness: 560, damping: 17, mass: 0.58 }}
            style={{ transformPerspective: 1000 }}
          >
            <div className="relative flex aspect-square h-auto w-full items-center justify-center overflow-hidden rounded-[8px] bg-muted/30">
              {catAnimation && (
                <Lottie
                  lottieRef={lottieRef}
                  animationData={catAnimation}
                  loop
                  autoplay
                  className="h-full w-full scale-[1.15]"
                />
              )}
            </div>
          </motion.div>
        </ScaleIn>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-center gap-1.5 overflow-hidden pl-2 pr-2 sm:pl-4 sm:pr-0">
          <SlideIn direction="right" delay={0.3}>
            <div className="flex items-center gap-1.5 pt-1 pb-1 sm:gap-2 sm:pt-2 sm:pb-2">
              <h1 className="font-pixel text-xl leading-tight font-black sm:text-3xl">
                Alex Morgan
              </h1>
              <div className="flex items-center gap-1 shrink-0">
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
                >
                  <VerifiedIcon className="size-4 text-info select-none sm:size-4.5" />
                </motion.span>
                <PronounceName />
              </div>
            </div>
          </SlideIn>

          <FadeIn delay={0.5}>
            <div className="flex items-baseline gap-0 font-mono text-sm leading-snug text-muted-foreground sm:text-base">
              <TextFlip />
              <span className="mx-1.5">/</span>
              <span className="whitespace-nowrap">Independent Practice / UK</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground sm:text-base">
              <span className="status-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
              <span>Currently accepting new patients</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Separator */}
      <div className="section-separator relative flex h-6 w-full border-x border-edge" />
    </>
  );
}
