"use client";

import { useCallback } from "react";
import {
  type Easing,
  motion,
  type Variants,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ── Path data split into 4 sequential stroke groups ── */
const PATHS = [
  // Group 1 — first cursive letter cluster (compound sub-paths must stay together)
  "M13 36.04L13 36.04Q12.04 34.76 10.52 32.48L10.52 32.48Q0 31.44 0 28.08L0 28.08Q0 27.32 0.78 26.84Q1.56 26.36 3.16 26.36L3.16 26.36Q7.16 26.36 11.12 31.44L11.12 31.44Q15.12 31.84 20.20 31.84L20.20 31.84L20.64 31.84Q25.76 28.76 30.16 25.64L30.16 25.64Q31.96 22.36 33.28 20.22Q34.60 18.08 36.48 15.76L36.48 15.76Q40.20 11.04 44.32 11.04L44.32 11.04Q45.40 11.04 45.40 12L45.40 12Q45.40 14.32 41.56 18.08Q37.72 21.84 31.36 26.16L31.36 26.16Q29.44 29.84 28.48 31.52L28.48 31.52Q34.08 31.08 36.56 30.16L36.56 30.16L36.68 30.16Q36.84 30.16 36.84 30.38Q36.84 30.60 36.56 31L36.56 31Q33.56 31.92 27.92 32.44L27.92 32.44Q25.76 36.16 23.74 38.22Q21.72 40.28 19.68 40.28L19.68 40.28Q16.40 40.28 13.48 36.64L13.48 36.64Q7.76 39.52 3.36 41.04L3.36 41.04Q2.76 41.24 1.98 41.24Q1.20 41.24 1.20 40.64L1.20 40.64Q1.20 40.32 1.52 40.06Q1.84 39.80 2.36 39.80L2.36 39.80Q5.56 39.80 13 36.04ZM20.64 32.84L20.64 32.84Q17.60 34.56 14.64 36.08L14.64 36.08Q17.32 39.40 19.52 39.40L19.52 39.40Q21.16 39.40 22.78 37.64Q24.40 35.88 26.36 32.56L26.36 32.56Q23.92 32.76 20.64 32.84ZM43.20 12L43.20 12Q40.44 12 37.64 15.68L37.64 15.68Q35.32 18.80 32.56 23.92L32.56 23.92Q37.60 20.20 40.64 17.14Q43.68 14.08 43.68 12.40L43.68 12.40Q43.68 12 43.20 12ZM1.92 27.92L1.92 27.92Q1.92 30.20 9.64 31.24L9.64 31.24Q6.52 27.08 3.36 27.08L3.36 27.08Q1.92 27.08 1.92 27.92ZM14.16 35.48L14.16 35.48Q16.64 34.16 18.92 32.84L18.92 32.84L18.76 32.84Q15.28 32.84 12.04 32.60L12.04 32.60Q13.56 34.72 14.16 35.48ZM29.08 27.68L29.08 27.68Q26.92 29.12 22.36 31.84L22.36 31.84Q25.44 31.76 26.88 31.64L26.88 31.64Q27.64 30.32 29.08 27.68Z",
  // Group 2
  "M40.24 35.20L40.24 35.20Q40 35.20 40 35.02Q40 34.84 40.28 34.60L40.28 34.60Q41.60 33.52 41.60 32.64L41.60 32.64Q41.60 32.08 40.60 32L40.60 32Q38.80 32.04 36.30 34.60Q33.80 37.16 33.80 38.44L33.80 38.44Q33.80 38.88 34.30 38.88Q34.80 38.88 35.64 38.20L35.64 38.20Q36.40 37.72 38.48 35.80L38.48 35.80Q38.96 35.32 39.40 35.32L39.40 35.32Q39.96 35.32 39.96 35.84L39.96 35.84Q39.96 36.04 39.84 36.16Q39.72 36.28 39.40 36.66Q39.08 37.04 38.84 37.36L38.84 37.36Q38.12 38.40 38.12 38.72L38.12 38.72Q38.12 39.52 38.76 39.52L38.76 39.52Q39.60 39.52 41.92 37.98Q44.24 36.44 46.16 34.88L46.16 34.88L48.08 33.36Q48.36 33.16 48.60 33.16Q48.84 33.16 48.84 33.44L48.84 33.44L48.84 33.52Q45.76 36.12 42.34 38.40Q38.92 40.68 37.84 40.68L37.84 40.68Q36.56 40.68 36.56 39.32L36.56 39.32Q36.56 39 36.68 38.72Q36.80 38.44 36.80 38.32Q36.80 38.20 36.72 38.16L36.72 38.16Q36.60 38.16 35.18 39.24Q33.76 40.32 32.70 40.32Q31.64 40.32 31.64 39.20Q31.64 38.08 33.14 36.18Q34.64 34.28 37.16 32.72Q39.68 31.16 42.08 31.16L42.08 31.16Q42.64 31.16 43.02 31.44Q43.40 31.72 43.40 32.30Q43.40 32.88 42.24 34.04Q41.08 35.20 40.24 35.20Z",
  // Group 3
  "M48.92 39.48L48.92 39.48Q48.92 38.88 49.50 37.92Q50.08 36.96 50.12 36.80Q50.16 36.64 50.04 36.64Q49.92 36.64 49.70 36.86Q49.48 37.08 47.26 38.54Q45.04 40 44.20 40L44.20 40Q43.64 40 43.64 39.28Q43.64 38.56 45.88 35.56Q48.12 32.56 49.04 32.56L49.04 32.56Q49.24 32.56 49.42 32.74Q49.60 32.92 49.60 33.02Q49.60 33.12 47.54 35.48Q45.48 37.84 45.48 38.52L45.48 38.52Q45.48 38.68 45.64 38.68L45.64 38.68Q46.40 38.68 48.92 36.64Q51.44 34.60 52.50 33.48Q53.56 32.36 54.16 32.36Q54.76 32.36 54.76 32.88L54.76 32.88Q54.76 33.20 54.52 33.52Q54.28 33.84 53.62 34.66Q52.96 35.48 52.40 36.20L52.40 36.20Q50.84 38.20 50.84 38.70Q50.84 39.20 51.26 39.20Q51.68 39.20 53.32 38.08L53.32 38.08Q56.36 36.08 58.88 34.04L58.88 34.04L59.76 33.32Q60.04 33.12 60.24 33.12Q60.44 33.12 60.44 33.36L60.44 33.36L60.44 33.48Q60.60 33.48 58.30 35.24Q56 37 53.38 38.76Q50.76 40.52 50.08 40.52L50.08 40.52Q48.92 40.52 48.92 39.48Z",
  // Group 4
  "M75.92 33.36L75.92 33.48Q67.48 40.52 65.48 40.52L65.48 40.52Q64.32 40.52 64.32 39.56Q64.32 38.60 65.18 37.28Q66.04 35.96 66.90 34.94Q67.76 33.92 67.76 33.72Q67.76 33.52 67.64 33.52L67.64 33.52Q63.92 36 63.22 36.56Q62.52 37.12 60.94 38.40Q59.36 39.68 58.88 40Q58.40 40.32 57.84 40.32L57.84 40.32Q57.28 40.32 57.28 39.84L57.28 39.84Q57.28 39.28 59.52 36.32L59.52 36.32Q61.68 33.36 61.68 33L61.68 33Q61.68 32.92 61.54 32.92Q61.40 32.92 58.08 35.36L58.08 35.36L57.92 34.76Q60.76 32.48 61.76 31.84Q62.76 31.20 63.38 31.20Q64 31.20 64 31.80L64 31.80Q64 32.20 61.74 35.06Q59.48 37.92 59.48 38.14Q59.48 38.36 59.62 38.36Q59.76 38.36 64.18 35.14Q68.60 31.92 69.56 31.92L69.56 31.92Q69.84 31.92 70.10 32.14Q70.36 32.36 70.36 32.56L70.36 32.56Q70.36 33.04 68.24 35.74Q66.12 38.44 66.12 38.80Q66.12 39.16 66.62 39.16Q67.12 39.16 68.76 38.08L68.76 38.08Q71.76 36.12 74.28 34.04L74.28 34.04L75.16 33.32Q75.44 33.12 75.68 33.12Q75.92 33.12 75.92 33.36L75.92 33.36Z",
] as const;

/* ── Timing & easing per stroke ── */
const STROKE_DURATIONS = [1.2, 0.8, 1.0, 1.5] as const;

const STROKE_EASINGS: Easing[] = [
  [0.4, 0, 0.2, 1],
  [0.4, 0, 0.6, 1],
  [0.35, 0, 0.25, 1],
  [0.22, 0.03, 0.26, 1],
];

const DELAYS = STROKE_DURATIONS.reduce<number[]>(
  (acc, _, i) => [
    ...acc,
    i === 0 ? 0 : acc[i - 1] + STROKE_DURATIONS[i - 1],
  ],
  [],
);

/* ── Variant factories ── */
const container: Variants = { initial: {}, animate: {} };

const createDrawVariant = (i: number): Variants => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      opacity: { duration: 0.01, delay: DELAYS[i] },
      pathLength: {
        ease: STROKE_EASINGS[i],
        duration: STROKE_DURATIONS[i],
        delay: DELAYS[i],
      },
    },
  },
});

const createFillVariant = (i: number): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: DELAYS[i] + STROKE_DURATIONS[i] * 0.4,
    },
  },
});

/* ── Component ── */
export type SignatureProps = React.ComponentProps<"div">;

export const Signature = ({ className, ...props }: SignatureProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (isInView && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      controls.start("animate");
    }
  }, [isInView, controls, shouldReduceMotion]);

  const replay = useCallback(() => {
    controls.set("initial");
    controls.start("animate");
  }, [controls]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={cn("h-auto w-full", className)} {...props}>
        <svg
          viewBox="0 11.04 75.92 30.2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full overflow-visible"
        >
          {PATHS.map((d, i) => (
            <g key={i}>
              <path d={d} fill="currentColor" opacity={0.08} />
              <path d={d} fill="currentColor" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("h-auto w-full cursor-pointer", className)}
      onClick={replay}
      {...props}
    >
      <motion.svg
        viewBox="0 11.04 75.92 30.2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full overflow-visible"
        variants={container}
        animate={controls}
        initial="initial"
      >
        {PATHS.map((d, i) => (
          <g key={i}>
            {/* Ghost layer — faint ink-indent guide */}
            <path d={d} fill="currentColor" opacity={0.08} />

            {/* Stroke draw — pathLength animation traces the outline */}
            <motion.path
              d={d}
              stroke="currentColor"
              strokeWidth="0.4"
              strokeLinecap="round"
              fill="none"
              variants={createDrawVariant(i)}
            />

            {/* Fill reveal — fades in as stroke progresses */}
            <motion.path
              d={d}
              fill="currentColor"
              variants={createFillVariant(i)}
            />
          </g>
        ))}
      </motion.svg>
    </div>
  );
};
