"use client";

import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn } from "@/components/Motion";
import ThreeDCarousel, {
  type ThreeDCarouselItem,
} from "@/components/ThreeDCarousel";

const patientTestimonials: ThreeDCarouselItem[] = [
  {
    id: 1,
    reviewer: "Amelia R.",
    review:
      "Alex gave me a plan I could actually stick to. The pain settled down fast, and full workdays stopped feeling overwhelming.",
    color: "#d7ecff",
  },
  {
    id: 2,
    reviewer: "Daniel K.",
    review:
      "I finally understood what was driving the pain. Alex helped me rebuild confidence as much as strength, and I am back running consistently.",
    color: "#ffd9c8",
  },
  {
    id: 3,
    reviewer: "Priya S.",
    review:
      "Every session felt structured and calm. I always left knowing what to work on next, which made recovery so much less stressful.",
    color: "#d8d0ff",
  },
  {
    id: 4,
    reviewer: "Sophie L.",
    review:
      "The biggest difference was how personal it felt. Alex worked around my routine and gave me exercises realistic enough to keep doing.",
    color: "#d8f1e5",
  },
  {
    id: 5,
    reviewer: "Mark T.",
    review:
      "I came in worried I was stuck with the same problem. After a few focused weeks, I was moving better and worrying a lot less.",
    color: "#ffe4b8",
  },
];

export default function TestimonialsSection() {
  return (
    <>
      <section className="screen-line-before screen-line-after border-x border-edge">
        <div className="relative px-4 py-8 sm:py-10">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <h1 className="font-pixel text-3xl font-semibold sm:text-4xl">
              Patient Testimonials
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              A few words from patients about recovery, confidence, and what it
              feels like to work with Alex Morgan.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="screen-line-after border-x border-edge">
        <div className="relative px-4 py-6 sm:py-8">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              From Patients to Alex Morgan
            </div>
          </FadeIn>

          <div className="mt-4">
            <ThreeDCarousel
              items={patientTestimonials}
              autoRotate
              rotateInterval={5000}
              cardHeight={410}
            />
          </div>
        </div>
      </section>
    </>
  );
}
