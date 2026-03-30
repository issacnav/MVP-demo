"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { VerifiedIcon } from "@/components/icons";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn, ScaleIn, SlideIn, motion } from "@/components/Motion";
import { AnimatePresence } from "framer-motion";

const titles = ["Physiotherapist", "Researcher", "Rehab Specialist", "Educator"];

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
      {/* Invisible spacers stacked on same grid cell — sizes container to widest title */}
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
    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
      <span>🕐</span>
      <span>{time} Scotland</span>
    </span>
  );
}

function PronounceName() {
  const speak = useCallback(() => {
    const utter = new SpeechSynthesisUtterance("Sarthak Navalekar");
    utter.lang = "en-IN";
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
      title="Pronounce my name"
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
            className="aspect-square h-auto w-full rounded-[12px] border border-border p-[4px] transition duration-300 hover:brightness-90 sm:size-32"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative aspect-square h-auto w-full overflow-hidden rounded-[8px]">
              <Image
                alt="Sarthak Navalekar's avatar"
                fill
                className="select-none rounded-[8px] object-cover scale-[1.3] object-[center_20%]"
                src="/images/pfp1.png"
                priority
              />
            </div>
          </motion.div>
        </ScaleIn>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-center gap-1 pl-2 sm:pl-4">
          <SlideIn direction="right" delay={0.3}>
            <div className="flex items-center gap-2 pt-2 pb-2">
              <h1 className="font-pixel text-xl leading-none font-black sm:text-3xl">
                Sarthak Navalekar
              </h1>
              <PronounceName />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
              >
                <VerifiedIcon className="size-4.5 text-info select-none" />
              </motion.span>
            </div>
          </SlideIn>

          <FadeIn delay={0.5}>
            <p className="flex items-baseline gap-1.5 font-mono text-sm leading-snug text-muted-foreground">
              <TextFlip />
              <span>•</span>
              <span>Scotland, UK</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex min-h-4 items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="status-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <span>Open to opportunities</span>
              </span>
              <LocalTime />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Separator */}
      <div className="section-separator relative flex h-6 w-full border-x border-edge" />
    </>
  );
}
