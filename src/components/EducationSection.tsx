"use client";

import { useState } from "react";
import { Panel } from "@/components/LayoutParts";
import { GraduationCapIcon, ExpandIcon } from "@/components/icons";
import { FadeIn, motion } from "@/components/Motion";

interface EducationEntry {
  school: string;
  schoolUrl?: string;
  degree: string;
  field: string;
  period: string;
  details?: string[];
}

const educations: EducationEntry[] = [
  {
    school: "Glasgow Caledonian University",
    schoolUrl: "https://www.gcu.ac.uk/",
    degree: "Master of Science",
    field: "Advanced Physiotherapy Practice",
    period: "2024—2025",
    details: [
      "Advanced clinical reasoning and evidence-based practice in musculoskeletal and neurological physiotherapy.",
      "Research methods, critical appraisal, and healthcare leadership modules.",
      "Clinical placements across NHS Scotland settings.",
    ],
  },
  {
    school: "Government Medical College Nagpur",
    degree: "Bachelor of Physiotherapy",
    field: "Physiotherapy",
    period: "2018—2023",
    details: [
      "Comprehensive study of anatomy, physiology, biomechanics, kinesiology, and pathology.",
      "Clinical rotations in orthopaedics, neurology, cardiopulmonary, paediatrics, and sports rehabilitation.",
      "Dissertation on effectiveness of manual therapy techniques in chronic low back pain management.",
    ],
  },
];

function EducationItem({ entry }: { entry: EducationEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
        <h3 className="flex-1 text-lg leading-snug font-medium">
          {entry.schoolUrl ? (
            <a
              className="underline-offset-4 hover:underline"
              href={entry.schoolUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.school}
            </a>
          ) : (
            entry.school
          )}
        </h3>
      </div>

      <div className="relative space-y-2 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="block w-full text-left relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent/50"
          >
            <div className="relative z-1 mb-1 flex items-center gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background">
                <GraduationCapIcon className="size-4" />
              </div>
              <h4 className="flex-1 font-medium text-balance">
                {entry.degree}
                <span className="font-normal text-muted-foreground">
                  {" "}· {entry.field}
                </span>
              </h4>
              <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
                <ExpandIcon />
              </div>
            </div>
            <div className="flex items-center gap-0.5 pl-9 text-sm text-muted-foreground">
              <span>{entry.period.split("—")[0]}</span>
              <span className="font-mono">—</span>
              <span>{entry.period.split("—")[1]}</span>
            </div>
          </button>

          {open && entry.details && (
            <motion.div
              className="pl-9 pt-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-1.5">
                {entry.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export function EducationSection() {
  return (
    <Panel title="Education" id="education">
      <div className="pr-2 pl-4">
        {educations.map((entry, i) => (
          <FadeIn key={i} delay={i * 0.15}>
            <EducationItem entry={entry} />
          </FadeIn>
        ))}
      </div>
    </Panel>
  );
}
