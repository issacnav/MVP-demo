"use client";

import React, { useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export interface ThreeDCarouselItem {
  id: number;
  reviewer: string;
  review: string;
  color: string;
}

interface ThreeDCarouselProps {
  items: ThreeDCarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  isMobileSwipe?: boolean;
}

export default function ThreeDCarousel({
  items,
  autoRotate = true,
  rotateInterval = 4500,
  cardHeight = 410,
  isMobileSwipe = true,
}: ThreeDCarouselProps) {
  if (items.length === 0) {
    return null;
  }

  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate || !isInView || isHovering || items.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, rotateInterval);

    return () => window.clearInterval(interval);
  }, [autoRotate, isHovering, isInView, items.length, rotateInterval]);

  const onTouchStart = (e: TouchEvent) => {
    if (!isMobileSwipe) {
      return;
    }

    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isMobileSwipe) {
      return;
    }

    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isMobileSwipe || touchStart === null || touchEnd === null) {
      return;
    }

    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === active) {
      return "translate-x-0 rotate-0 scale-100 opacity-100 z-30";
    }

    if (index === (active + 1) % items.length) {
      return "translate-x-[40%] rotate-[4deg] scale-[0.945] opacity-80 z-20";
    }

    if (index === (active - 1 + items.length) % items.length) {
      return "translate-x-[-40%] rotate-[-4deg] scale-[0.945] opacity-80 z-20";
    }

    return "translate-x-0 scale-[0.88] opacity-0 z-0";
  };

  const goToPrevious = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  return (
    <section
      id="ThreeDCarousel"
      className="w-full"
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
    >
      <div className="w-full">
        <div
          ref={carouselRef}
          className="relative h-[470px] overflow-hidden sm:h-[510px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              goToPrevious();
            }

            if (event.key === "ArrowRight") {
              goToNext();
            }
          }}
          tabIndex={0}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-3 w-full max-w-[460px] transform px-2 transition-all duration-500 ease-out sm:max-w-[480px] sm:px-0 ${getCardAnimationClass(index)}`}
              >
                <Card
                  className="relative isolate overflow-hidden rounded-[34px] border border-black/8 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.26),0_36px_110px_-60px_rgba(0,0,0,0.42)]"
                  style={{ height: cardHeight, backgroundColor: item.color }}
                >
                  <div className="pointer-events-none absolute inset-[1px] rounded-[33px] border border-white/20" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/22 via-white/6 to-transparent" />
                  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/12 blur-3xl" />
                  <div className="pointer-events-none absolute right-16 top-8 h-12 w-20 rotate-[18deg] rounded-full bg-white/14 blur-xl" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/4 to-transparent" />

                  <CardContent className="relative h-full p-7 sm:p-8">
                    <div className="relative z-10 mx-auto flex h-full w-full max-w-[18.75rem] flex-col sm:max-w-[21rem]">
                      <div className="pointer-events-none -ml-1 text-5xl leading-none text-black/16 sm:text-6xl">
                        &ldquo;
                      </div>

                      <p className="mt-4 text-left text-pretty text-[1.44rem] leading-[1.2] tracking-[-0.028em] text-zinc-950 sm:text-[1.58rem] sm:leading-[1.18]">
                        {item.review}
                      </p>

                      <div className="mt-auto inline-flex w-fit self-start rounded-full border border-black/8 bg-white/28 px-4 py-2 font-pixel text-base font-semibold uppercase tracking-[0.04em] text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-[2px] sm:text-lg">
                        {item.reviewer}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {!isMobile && (
            <>
              <button
                className="absolute left-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/85 text-muted-foreground shadow-sm transition-all hover:scale-110 hover:bg-accent hover:text-foreground"
                onClick={goToPrevious}
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/85 text-muted-foreground shadow-sm transition-all hover:scale-110 hover:bg-accent hover:text-foreground"
                onClick={goToNext}
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-0 right-0 z-40 flex items-center justify-center space-x-3">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === idx
                    ? "w-6 bg-info"
                    : "w-2 bg-border hover:bg-muted-foreground/40"
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
