"use client";

import { Panel } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import { useState, useEffect } from "react";
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
  "Master's in Advanced Physiotherapy Practice",
  "Manual Therapy Certification",
  "Sports Massage Level 3",
  "Dry Needling CPD",
];

const hoverColors = [
  "oklch(0.93 0.05 0)",
  "oklch(0.93 0.04 250)",
  "oklch(0.92 0.05 150)",
  "oklch(0.93 0.05 30)",
  "oklch(0.92 0.04 280)",
  "oklch(0.93 0.04 190)",
  "oklch(0.93 0.04 80)",
  "oklch(0.92 0.04 220)",
  "oklch(0.92 0.05 330)",
];

const hoverColorsDark = [
  "oklch(0.30 0.05 0)",
  "oklch(0.30 0.04 250)",
  "oklch(0.28 0.05 150)",
  "oklch(0.30 0.05 30)",
  "oklch(0.28 0.04 280)",
  "oklch(0.30 0.04 190)",
  "oklch(0.30 0.04 80)",
  "oklch(0.28 0.04 220)",
  "oklch(0.28 0.05 330)",
];

const skills: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Patient Care", icon: Heart },
  { label: "Communication", icon: MessageCircle },
  { label: "Clinical Reasoning", icon: Brain },
  { label: "MSK Rehab", icon: Bone },
  { label: "Mobility Support", icon: Accessibility },
  { label: "Infection Control", icon: ShieldCheck },
  { label: "Documentation", icon: ClipboardList },
  { label: "Team Collaboration", icon: Users },
  { label: "Manual Therapy", icon: Hand },
];

const interests = [
  "Community wellbeing",
  "Strength training",
  "Rehab education",
  "Evidence-based care",
];

const interestHoverColors = [
  "oklch(0.965 0.016 350)",
  "oklch(0.962 0.016 155)",
  "oklch(0.968 0.015 85)",
  "oklch(0.965 0.016 235)",
];

const interestHoverColorsDark = [
  "oklch(0.29 0.022 350)",
  "oklch(0.285 0.022 155)",
  "oklch(0.3 0.02 85)",
  "oklch(0.29 0.022 235)",
];

export function CertificationsSection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Panel title="Certifications & Skills" id="certifications">
      <div className="p-4 space-y-4">
        <FadeIn>
          <div>
            <h3 className="mb-2 font-mono text-sm font-medium text-foreground">Certifications</h3>
            <StaggerContainer className="space-y-1.5">
              {certifications.map((cert) => (
                <StaggerItem key={cert}>
                  <li className="list-none flex items-start gap-2 font-mono text-sm text-muted-foreground">
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
            <h3 className="mb-2 font-mono text-sm font-medium text-foreground">Skills</h3>
            <StaggerContainer className="grid grid-cols-2 overflow-hidden rounded-lg border divide-x divide-y divide-border sm:grid-cols-3">
              {skills.map((skill, i) => (
                <StaggerItem key={skill.label}>
                  <motion.div
                    className="cursor-default flex items-center gap-2.5 px-3 py-3 font-mono text-xs text-muted-foreground"
                    whileHover={{ backgroundColor: isDark ? hoverColorsDark[i] : hoverColors[i] }}
                    transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
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
          <div>
            <h3 className="mb-2 font-mono text-sm font-medium text-foreground">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <motion.span
                  key={interest}
                  className="inline-flex items-center rounded-lg border bg-zinc-50 px-2.5 py-1 font-mono text-xs text-muted-foreground dark:bg-zinc-900"
                  whileHover={{
                    y: -1,
                    scale: 1.02,
                    backgroundColor: isDark
                      ? interestHoverColorsDark[index]
                      : interestHoverColors[index],
                  }}
                  transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </Panel>
  );
}
