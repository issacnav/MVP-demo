"use client";

import { Panel } from "@/components/LayoutParts";
import { StaggerContainer, StaggerItem } from "@/components/Motion";

export function AboutSection() {
  return (
    <Panel title="About" id="about">
      <div className="p-4 space-y-4">
        <StaggerContainer className="max-w-none text-sm font-mono text-foreground space-y-3">
          <StaggerItem>
            <p>
              <span className="text-muted-foreground mr-1">-</span>
              I&apos;m a physiotherapy practitioner working in independent practice,
              supporting adults through musculoskeletal rehabilitation, post-operative
              recovery, and long-term pain management.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              <span className="text-muted-foreground mr-1">-</span>
              I hold a <strong>Master&apos;s in Advanced Physiotherapy Practice</strong> and
              combine evidence-based treatment, movement education, and tailored
              exercise programming to help patients return to confident daily life.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              <span className="text-muted-foreground mr-1">-</span>
              My approach is centred on one-to-one care, clear communication, and
              realistic rehabilitation plans. I regularly support patients with
              mobility goals, strength rebuilding, and sustainable self-management
              between sessions.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </Panel>
  );
}
