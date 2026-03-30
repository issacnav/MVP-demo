"use client";

import { Panel } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Motion";

export function AboutSection() {
  return (
    <Panel title="About" id="about">
      <div className="p-4 space-y-4">
        <StaggerContainer className="max-w-none text-sm font-mono text-foreground space-y-3">
            <StaggerItem>
              <p>
                <span className="text-muted-foreground mr-1">•</span>
                I&apos;m a physiotherapy practitioner with experience in musculoskeletal
                and neuromuscular rehabilitation. I&apos;ve worked in leading tertiary care
                hospitals delivering personalized rehabilitation programs for
                post-operative, geriatric, and neurological patients.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                <span className="text-muted-foreground mr-1">•</span>
                Currently pursuing my MSc in Advanced Physiotherapy Practice at
                Glasgow Caledonian University, Scotland. I&apos;m passionate about
                evidence-based patient care and collaborative healthcare.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                <span className="text-muted-foreground mr-1">•</span>
                Beyond clinical work, I volunteer with organizations like the Stroke
                Association and Chest Heart &amp; Stroke Scotland, supporting community
                health initiatives. I believe in compassionate care and continuous
                professional development.
              </p>
            </StaggerItem>
        </StaggerContainer>
      </div>
    </Panel>
  );
}
