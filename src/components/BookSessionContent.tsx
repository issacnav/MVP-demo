"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  CalendarDays,
  Clock3,
  Layers3,
  MapPin,
  PhoneCall,
  Video,
} from "lucide-react";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import { cn } from "@/lib/utils";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type SessionType = {
  id: string;
  namespace: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  calLink: string;
  Icon: ComponentType<{ className?: string }>;
};

const sessions: SessionType[] = [
  {
    id: "discovery-call",
    namespace: "book-discovery-call",
    title: "Free Discovery Call",
    duration: "15 min",
    price: "Free",
    description: "A quick intro call to see if we're the right fit.",
    calLink: "sarthak-navalekar",
    Icon: PhoneCall,
  },
  {
    id: "in-person-appointment",
    namespace: "book-in-person-appointment",
    title: "In-Person Appointment",
    duration: "60 min",
    price: "Paid",
    description: "One-to-one physiotherapy at the clinic.",
    calLink: "sarthak-navalekar",
    Icon: MapPin,
  },
  {
    id: "online-consultation",
    namespace: "book-online-consultation",
    title: "Online Consultation",
    duration: "45 min",
    price: "Paid",
    description: "Video session via Google Meet from anywhere.",
    calLink: "sarthak-navalekar",
    Icon: Video,
  },
  {
    id: "session-package",
    namespace: "book-session-package",
    title: "Session Package",
    duration: "6 sessions",
    price: "Paid",
    description: "Commit to a full rehab programme and save.",
    calLink: "sarthak-navalekar",
    Icon: Layers3,
  },
];

const steps = [
  {
    number: "01",
    title: "Pick your session type",
    description: "Choose the option that best matches your goals, symptoms, and preferred format.",
  },
  {
    number: "02",
    title: "Choose a date and time",
    description: "Browse live availability and book a slot that fits comfortably into your week.",
  },
  {
    number: "03",
    title: "Get a confirmation email",
    description: "Your confirmation arrives instantly with the time, date, and everything you need to join.",
  },
];

const calEmbedLoader = `
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
`;

export function BookSessionContent() {
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0].id);
  const [calSnippetReady, setCalSnippetReady] = useState(false);

  const selectedSession =
    sessions.find((session) => session.id === selectedSessionId) ?? sessions[0];
  const embedSelector = "#booking-cal-inline";

  useEffect(() => {
    if (!calSnippetReady || typeof window === "undefined") {
      return;
    }

    const cal = window.Cal;
    const embedContainer = document.querySelector<HTMLElement>(embedSelector);

    if (!cal || !embedContainer) {
      return;
    }

    embedContainer.innerHTML = "";

    cal("init", selectedSession.namespace, { origin: "https://cal.com" });

    const namespacedCal = cal.ns?.[selectedSession.namespace] ?? cal;

    namespacedCal("inline", {
      elementOrSelector: embedSelector,
      calLink: selectedSession.calLink,
    });

    namespacedCal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [calSnippetReady, selectedSession, embedSelector]);

  return (
    <>
      <Script
        id="cal-com-inline-embed"
        strategy="afterInteractive"
        onReady={() => setCalSnippetReady(true)}
      >
        {calEmbedLoader}
      </Script>

      <div className="screen-line-before screen-line-after border-x border-edge">
        <div className="relative px-4 py-8 sm:py-10">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <h1 className="font-pixel text-3xl font-semibold sm:text-4xl">
              Book a Session
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              Choose a session type below and pick a time that works for you.
              You&apos;ll get a confirmation email instantly, along with the
              details you need for your appointment.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <CalendarDays className="size-3.5" />
              Session Types
            </div>
          </FadeIn>

          <StaggerContainer className="mt-4">
            <div
              className="grid grid-flow-col auto-cols-[minmax(16.5rem,1fr)] gap-3 overflow-x-auto pb-1 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:overflow-visible"
              role="radiogroup"
              aria-label="Session type"
            >
              {sessions.map((session) => {
                const isSelected = session.id === selectedSession.id;

                return (
                  <StaggerItem key={session.id}>
                    <motion.button
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={cn(
                        "group flex h-full min-h-52 w-full flex-col rounded-[22px] border p-4 text-left transition-colors duration-200",
                        "bg-card/60 backdrop-blur-sm",
                        isSelected
                          ? "border-info/40 bg-info/10 text-foreground"
                          : "border-border text-foreground hover:border-info/30 hover:bg-accent/60"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={cn(
                            "flex size-11 items-center justify-center rounded-2xl border transition-colors",
                            isSelected
                              ? "border-info/30 bg-info/10 text-info"
                              : "border-border bg-background/60 text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          <session.Icon className="size-5" />
                        </div>

                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
                            isSelected
                              ? "border-info/30 bg-info/10 text-info"
                              : "border-border bg-background/60 text-muted-foreground"
                          )}
                        >
                          {isSelected ? "Selected" : "Choose"}
                        </span>
                      </div>

                      <div className="mt-5">
                        <h2 className="font-pixel text-xl font-semibold leading-tight">
                          {session.title}
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                            <Clock3 className="size-3.5" />
                            {session.duration}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                            {session.price}
                          </span>
                        </div>
                        <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
                          {session.description}
                        </p>
                      </div>
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          <FadeIn delay={0.08}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Booking Calendar
                </div>
                <h2 className="mt-2 font-pixel text-2xl font-semibold sm:text-3xl">
                  {selectedSession.title}
                </h2>
                <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
                  {selectedSession.description} Availability is shown inline
                  below so patients can book without leaving the site.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  {selectedSession.duration}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                  {selectedSession.price}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-border bg-card/70 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Live Cal.com Embed
                </div>
                <a
                  href={`https://cal.com/${selectedSession.calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-info transition-colors hover:text-foreground"
                >
                  Open in a new tab
                </a>
              </div>

              <div className="bg-background/70 p-2 sm:p-3">
                <div
                  id="booking-cal-inline"
                  className="min-h-[620px] rounded-[20px] border border-border bg-background sm:min-h-[720px]"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          <FadeIn delay={0.08}>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              What To Expect
            </div>
            <h2 className="mt-2 font-pixel text-2xl font-semibold sm:text-3xl">
              A simple, clear booking flow
            </h2>
          </FadeIn>

          <div className="relative mt-6">
            <div className="absolute left-8 right-8 top-5 hidden h-px bg-border md:block" />

            <StaggerContainer className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="relative rounded-[22px] border border-border bg-card/60 p-4">
                    <div className="flex items-start gap-4 md:flex-col md:gap-5">
                      <span className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-muted-foreground">
                        {step.number}
                      </span>

                      <div>
                        <h3 className="font-pixel text-xl font-semibold">
                          {step.title}
                        </h3>
                        <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </>
  );
}
