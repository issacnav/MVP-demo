"use client";

import { Panel } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import {
  Heart,
  MessageCircle,
  Brain,
  Bone,
  Accessibility,
  ShieldCheck,
  ClipboardList,
  Users,
  Hand,
} from "lucide-react";
import { type ComponentType } from "react";

const certifications = [
  "Level 3 Health and Social Care with Adult Nursing",
  "VTCT Skills (ITEC) Level 3 Extended Diploma in Sport Massage",
  "Certified Acupuncture & Dry Needling Therapist",
  "Manual Therapy Certification",
];

const skills: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Patient Care", icon: Heart },
  { label: "Communication", icon: MessageCircle },
  { label: "Neuro Rehab", icon: Brain },
  { label: "Ortho Rehab", icon: Bone },
  { label: "Mobility Support", icon: Accessibility },
  { label: "Infection Control", icon: ShieldCheck },
  { label: "Documentation", icon: ClipboardList },
  { label: "Team Collaboration", icon: Users },
  { label: "Manual Therapy", icon: Hand },
];

export function CertificationsSection() {
  return (
    <Panel title="Certifications & Skills" id="certifications">
      <div className="p-4 space-y-4">
        <FadeIn>
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground mb-2">Certifications</h3>
            <StaggerContainer className="space-y-1.5">
              {certifications.map((cert) => (
                <StaggerItem key={cert}>
                  <li className="flex items-start gap-2 font-mono text-sm text-muted-foreground list-none">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
                    {cert}
                  </li>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground mb-2">Skills</h3>
            <StaggerContainer className="grid grid-cols-3 divide-x divide-y divide-border rounded-lg border overflow-hidden">
              {skills.map((skill) => (
                <StaggerItem key={skill.label}>
                  <motion.div
                    className="flex items-center gap-2.5 px-3 py-3 font-mono text-xs text-muted-foreground cursor-default"
                    whileHover={{ backgroundColor: "var(--color-accent)" }}
                    transition={{ duration: 0.15 }}
                  >
                    <skill.icon className="size-4 shrink-0" />
                    <span className="leading-tight">{skill.label}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mx-auto w-full max-w-sm">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Interests</span>
                <span className="text-sm text-neutral-800 dark:text-white/80">
                  Creative writing · Volunteering · Chess · Documentaries
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Panel>
  );
}
