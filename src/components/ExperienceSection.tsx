"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Panel } from "@/components/LayoutParts";
import { ExpandIcon } from "@/components/icons";
import { Heart, HandHelping } from "lucide-react";
import { FadeIn, motion } from "@/components/Motion";

interface ExperienceEntry {
  company: string;
  companyUrl?: string;
  title: string;
  type: string;
  period: string;
  tags: string[];
  icon: "medical" | "volunteer";
  bullets?: string[];
}

const experiences: ExperienceEntry[] = [
  {
    company: "Meditrina Institute of Medical Science",
    title: "Physiotherapy Practitioner",
    type: "Full-time",
    period: "06.2023—06.2024",
    icon: "medical",
    tags: ["Manual Therapy", "Electrotherapy", "Neurorehabilitation", "Orthopaedics", "Patient Assessment"],
    bullets: [
      "Conducted comprehensive physical assessments of musculoskeletal and neuromuscular conditions.",
      "Delivered personalized rehabilitation programs for post-operative, geriatric, and neurological patients.",
      "Managed pain using manual therapy, electrotherapy, and therapeutic exercise.",
      "Collaborated with multidisciplinary teams including nurses, occupational therapists, and physicians.",
      "Maintained accurate, confidential patient records in compliance with healthcare standards.",
    ],
  },
  {
    company: "Healthcare Support Volunteer",
    title: "Support Volunteer",
    type: "Volunteer",
    period: "01.2023—05.2024",
    icon: "volunteer",
    tags: ["Elderly Care", "Vital Signs", "Physiotherapy", "Fall Prevention"],
    bullets: [
      "Assisted elderly residents with activities of daily living including mobility, hygiene, and feeding.",
      "Collaborated with nursing staff to monitor vital signs and ensure timely medication.",
      "Supported physiotherapy sessions focused on balance, strength, and fall prevention.",
    ],
  },
  {
    company: "Stroke Association",
    title: "Community Connector",
    type: "Volunteer",
    period: "11.2025—Present",
    icon: "volunteer",
    tags: ["Community Health", "Stroke Support"],
  },
  {
    company: "Chest Heart & Stroke Scotland",
    title: "Community Support Services Group Volunteer",
    type: "Volunteer",
    period: "11.2025—Present",
    icon: "volunteer",
    tags: ["Community Support", "Healthcare Advocacy"],
  },
];

const accordionTransition = {
  duration: 0.28,
  ease: [0.21, 0.47, 0.32, 0.98] as const,
};

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(false);

  const IconComponent = entry.icon === "medical" ? Heart : HandHelping;

  return (
    <motion.div layout className="screen-line-after space-y-4 py-4" transition={accordionTransition}>
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          <motion.span
            className={`flex size-2 rounded-full ${open ? "bg-info" : "bg-zinc-300 dark:bg-zinc-600"}`}
            animate={{ scale: open ? 1.2 : 1, opacity: open ? 1 : 0.8 }}
            transition={accordionTransition}
          />
        </div>
        <h3 className="text-base leading-snug font-medium sm:text-lg">
          {entry.companyUrl ? (
            <a
              className="underline-offset-4 hover:underline"
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.company}
            </a>
          ) : (
            entry.company
          )}
        </h3>
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="group relative block w-full text-left before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent/50"
          >
            <div className="relative z-1 mb-1 flex items-center gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background">
                <IconComponent className="size-4" />
              </div>
              <h4 className="flex-1 font-medium text-balance">{entry.title}</h4>
              <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
                <motion.div
                  animate={{ y: open ? 1 : 0, opacity: open ? 1 : 0.75 }}
                  transition={accordionTransition}
                  className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
                >
                  <ExpandIcon />
                </motion.div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pl-9 text-xs text-muted-foreground sm:text-sm">
              <dl>
                <dt className="sr-only">Employment Type</dt>
                <dd>{entry.type}</dd>
              </dl>
              <div className="shrink-0 bg-border w-px h-4" />
              <dl>
                <dt className="sr-only">Employment Period</dt>
                <dd className="flex items-center gap-0.5">
                  <span>{entry.period.split("—")[0]}</span>
                  <span className="font-mono">—</span>
                  <span>{entry.period.split("—")[1]}</span>
                </dd>
              </dl>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {open && entry.bullets && (
              <motion.ul
                className="overflow-hidden pl-9 pt-2 text-sm text-muted-foreground space-y-1 list-disc list-inside"
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={accordionTransition}
              >
                {entry.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <motion.ul layout className="flex flex-wrap gap-1.5 pt-3 pl-9" transition={accordionTransition}>
            {entry.tags.map((tag) => (
              <li key={tag} className="flex">
                <span className="inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-zinc-900">
                  {tag}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <Panel title="Experience" id="experience">
      <div className="pr-2 pl-4">
        {experiences.map((entry, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <ExperienceItem entry={entry} />
          </FadeIn>
        ))}
      </div>
    </Panel>
  );
}
