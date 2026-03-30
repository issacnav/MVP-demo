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
    title:
      "Comparison Between Immediate Effect Of Positional Release Technique And Ischemic Compression Release In Patients With Quadratus Lumborum Trigger Point On Pain Intensity And Pressure Threshold Having Non-Specific Low Back Pain",
    type: "dissertation",
    venue: "Government Medical College Nagpur",
    year: "2023",
    description:
      "Conducted a clinical research study comparing the immediate effectiveness of two evidence-based manual therapy interventions - Positional Release Technique (PRT) and Ischemic Compression Release (ICR) - for treating myofascial trigger points in the quadratus lumborum muscle among patients with chronic non-specific low back pain.",
  },
  {
    title:
      "Effect of NMES on quadriceps strength, balance, and mobility outcomes in acute stroke survivor",
    type: "dissertation",
    venue: "Glasgow Caledonian University (GCU)",
    year: "2024",
    description:
      "Investigating the effect of neuromuscular electrical stimulation (NMES) on quadriceps strength, balance, and mobility outcomes in acute stroke survivors.",
  },
];

const typeConfig = {
  dissertation: { icon: BookOpen, label: "Dissertation" },
  paper: { icon: FileText, label: "Paper" },
  poster: { icon: Presentation, label: "Poster" },
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
                <div className="rounded-lg border border-border p-4">
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
                          className="flex min-w-0 flex-1 items-start justify-between gap-3 text-left"
                        >
                          <h3 className="font-mono text-sm font-medium text-foreground">
                            {pub.title}
                          </h3>
                          <ChevronDown
                            className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
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
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
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
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </Panel>
  );
}
