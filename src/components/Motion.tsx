"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

const standardEase = [0.21, 0.47, 0.32, 0.98] as const;

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const reducedStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: standardEase },
  },
};

const reducedStaggerItem: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.16, ease: standardEase },
  },
};

// Reusable fade-in-up animation triggered on scroll
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
  y = 20,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? Math.min(duration, 0.18) : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: standardEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedStaggerContainer : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedStaggerItem : staggerItem}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale-in for avatar, logo, etc.
export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: shouldReduceMotion ? 0.18 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: standardEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from a direction
export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const x = direction === "left" ? -30 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0.18 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: standardEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Re-export motion for direct use
export { motion };
