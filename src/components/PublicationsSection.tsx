"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Panel } from "@/components/LayoutParts";
import { StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import { BookOpen, ChevronDown, FileText, Presentation } from "lucide-react";

interface Publication {
  title: string;
  type: "dissertation" | "paper" | "poster";
  venue: string;
  year: string;
  url?: string;
  description?: string;
}

const publications: Publication[] = [
  {
    title: "Exercise Adherence in Private Musculoskeletal Practice",
    type: "paper",
    venue: "Independent Practice Journal",
    year: "2025",
    description:
      "A placeholder research summary focused on helping patients stay consistent with rehabilitation plans through clear education, progressive goal setting, and practical home exercise design.",
  },
  {
    title: "Early Mobility Strategies After Orthopaedic Procedures",
    type: "poster",
    venue: "Regional Physiotherapy Conference",
    year: "2024",
    description:
      "A placeholder conference poster exploring safe early movement, confidence building, and staged return-to-function planning after common orthopaedic procedures.",
  },
];

const typeConfig = {
  dissertation: { icon: BookOpen, label: "Dissertation" },
  paper: { icon: FileText, label: "Paper" },
  poster: { icon: Presentation, label: "Poster" },
};

const accordionTransition = {
  duration: 0.28,
  ease: [0.21, 0.47, 0.32, 0.98] as const,
};

export function PublicationsSection() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <Panel title="Publications & Research" id="publications">
      <div className="space-y-4 p-4">
        <StaggerContainer className="space-y-4">
          {publications.map((pub) => {
            const config = typeConfig[pub.type];
            const Icon = config.icon;
            const isOpen = openTitle === pub.title;

            return (
              <StaggerItem key={pub.title}>
                <motion.div layout className="rounded-lg border border-border p-4" transition={accordionTransition}>
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <button
                          type="button"
                          onClick={() => setOpenTitle(isOpen ? null : pub.title)}
                          aria-expanded={isOpen}
                          className="group flex min-w-0 flex-1 items-start justify-between gap-3 text-left"
                        >
                          <h3 className="font-mono text-sm font-medium text-foreground">
                            {pub.title}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 1 : 0.8 }}
                            transition={accordionTransition}
                            className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
                          >
                            <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          </motion.div>
                        </button>
                        <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:mt-0.5">
                          {config.label}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {pub.venue} - {pub.year}
                      </p>
                      <AnimatePresence initial={false}>
                        {pub.description && isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={accordionTransition}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                              {pub.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </Panel>
  );
}
