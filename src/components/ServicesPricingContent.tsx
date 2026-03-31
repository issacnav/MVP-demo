"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Layers3,
  PhoneCall,
  RefreshCw,
  User,
  Video,
} from "lucide-react";
import { CrossMarker, SectionSeparator } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  duration: string;
  price: string;
  Icon: ComponentType<{ className?: string }>;
  featured?: boolean;
};

type Feature = {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
};

const services: Service[] = [
  {
    title: "Free Discovery Call",
    description:
      "A 15-minute intro call to understand your goals and see if we're the right fit. No commitment required.",
    duration: "15 min",
    price: "Free",
    Icon: PhoneCall,
  },
  {
    title: "Initial Assessment",
    description:
      "A thorough assessment of your condition, movement, and history. Includes a personalised treatment plan.",
    duration: "60 min",
    price: "£65",
    Icon: ClipboardList,
  },
  {
    title: "Follow-Up Session",
    description:
      "Hands-on treatment session building on your previous assessment and plan.",
    duration: "45 min",
    price: "£50",
    Icon: RefreshCw,
  },
  {
    title: "Online Consultation",
    description:
      "Full physiotherapy consultation via Google Meet. Ideal for movement analysis, advice, and exercise programming.",
    duration: "45 min",
    price: "£45",
    Icon: Video,
  },
  {
    title: "Rehab Programme (6 sessions)",
    description:
      "A structured 6-session rehabilitation programme with ongoing progress tracking and a personalised home exercise plan.",
    duration: "6 × 45 min",
    price: "£270 (save £30)",
    Icon: Layers3,
    featured: true,
  },
];

const platformFeatures: Feature[] = [
  {
    title: "Beautiful profile",
    description:
      "Your clinical identity, certifications, experience and research — all on one clean page.",
    Icon: User,
  },
  {
    title: "Integrated booking",
    description:
      "Let patients book in-person, online, or discovery calls directly from your site.",
    Icon: CalendarDays,
  },
  {
    title: "Blog & content",
    description:
      "Share articles and build your reputation as a clinician. SEO-friendly out of the box.",
    Icon: FileText,
  },
];

export function ServicesPricingContent() {
  return (
    <>
      <div className="screen-line-before screen-line-after border-x border-edge">
        <div className="relative px-4 py-8 sm:py-10">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <h1 className="font-pixel text-3xl font-semibold sm:text-4xl">
              Services &amp; Pricing
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              Transparent pricing, no surprises. All sessions are tailored to
              your goals and delivered with evidence-based care.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          <FadeIn delay={0.1}>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              My Services
            </div>
          </FadeIn>

          <StaggerContainer className="mt-4">
            <div className="grid gap-3 md:grid-cols-2">
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 360, damping: 26 }}
                    className={cn(
                      "group flex h-full flex-col rounded-[22px] border p-4 transition-colors duration-200",
                      "bg-card/60 backdrop-blur-sm",
                      service.featured
                        ? "border-info/30 hover:border-info/40 hover:bg-info/10 md:col-span-2"
                        : "border-border hover:border-info/25 hover:bg-accent/60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          "flex size-11 items-center justify-center rounded-2xl border transition-colors",
                          service.featured
                            ? "border-info/30 bg-info/10 text-info"
                            : "border-border bg-background/60 text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        <service.Icon className="size-5" />
                      </div>

                      {service.featured && (
                        <span className="inline-flex items-center rounded-full border border-info/30 bg-info/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-info">
                          Best value
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <h2 className="font-pixel text-xl font-semibold leading-tight">
                        {service.title}
                      </h2>
                      <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                        {service.duration}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px]",
                          service.featured
                            ? "border-info/30 bg-info/10 text-info"
                            : "border-border bg-background/60 text-muted-foreground"
                        )}
                      >
                        {service.price}
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <FadeIn delay={0.22}>
            <div className="mt-5 flex flex-col gap-3 rounded-[22px] border border-border bg-card/55 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-pixel text-xl font-semibold">
                  Ready to get started?
                </h3>
              </div>

              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-info/30 bg-info/10 px-4 py-2 font-mono text-sm font-medium text-info transition-colors hover:border-info/40 hover:text-foreground"
              >
                Book a Session
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      <SectionSeparator />

      <div className="screen-line-after border-x border-edge">
        <div className="relative px-4 py-6 sm:py-8">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <div className="rounded-[26px] border border-border bg-accent/45 p-4 sm:p-5">
            <FadeIn delay={0.08}>
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-info">
                For Physiotherapists
              </div>
              <h2 className="mt-3 font-pixel text-2xl font-semibold sm:text-3xl">
                Want a site like this for your own practice?
              </h2>
              <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
                This portfolio was built on an early version of a platform
                I&apos;m building — designed specifically for physios. Profile,
                booking, blog, and more. All in one place.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-5">
              <div className="grid gap-3 md:grid-cols-3">
                {platformFeatures.map((feature) => (
                  <StaggerItem key={feature.title}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 360, damping: 26 }}
                      className="h-full rounded-[22px] border border-border bg-background/70 p-4"
                    >
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card/80 text-muted-foreground">
                        <feature.Icon className="size-5" />
                      </div>
                      <h3 className="mt-5 font-pixel text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            <FadeIn delay={0.22}>
              <div className="mt-5 flex flex-col gap-3 rounded-[22px] border border-info/20 bg-background/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
                  I&apos;m building this for physiotherapists. If you&apos;d like
                  early access, get in touch.
                </p>

                <a
                  href="mailto:snaval300@caledonian.ac.uk"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-info/30 bg-info/10 px-4 py-2 font-mono text-sm font-medium text-info transition-colors hover:border-info/40 hover:text-foreground"
                >
                  Express interest →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
}
