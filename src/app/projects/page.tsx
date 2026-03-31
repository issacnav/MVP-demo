"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CrossMarker, SectionSeparator } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Motion";
import { motion } from "framer-motion";

const projects = [
  {
    title: "PhysioHub",
    description:
      "A comprehensive physiotherapy platform consist of Quiz, Flashcard and Blog features. The Quiz feature offers interactive quizzes with real-time scoring, while the Flashcard feature provides a spaced repetition system for effective learning. Discontinued in 2025 due to examination commitments.",
    tags: ["Healthcare", "Physiotherapy", "Platform"],
    url: "https://physiohub.io",
    status: "Archived" as const,
  },
  {
    title: "Quizl",
    description:
      "An interactive quiz application with real-time scoring, multiple categories, and a clean user interface. Built with Next.js for fast performance and smooth transitions between questions.",
    tags: ["Next.js", "Quiz", "Interactive"],
    url: "https://quizl-opal.vercel.app/",
    status: "Live" as const,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          {/* Page header */}
          <div className="screen-line-before screen-line-after border-x border-edge">
            <div className="relative px-4 py-8">
              <CrossMarker position="top-left" />
              <CrossMarker position="top-right" />
              <FadeIn delay={0.1}>
                <h1 className="font-pixel text-3xl font-semibold sm:text-4xl">
                  Projects
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-2 font-mono text-sm text-muted-foreground">
                  Things I&apos;ve built and shipped.
                </p>
              </FadeIn>
            </div>
          </div>

          <SectionSeparator />

          {/* Project cards */}
          <StaggerContainer className="space-y-0">
            {projects.map((project, i) => (
              <StaggerItem key={project.title}>
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block screen-line-after border-x border-edge transition-colors hover:bg-accent/50"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="relative px-4 py-5">
                    {i === 0 && (
                      <>
                        <CrossMarker position="top-left" />
                        <CrossMarker position="top-right" />
                      </>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="font-pixel text-lg font-semibold group-hover:text-foreground sm:text-xl">
                            {project.title}
                          </h2>
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                            project.status === "Live"
                              ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                              : "border-muted-foreground/30 bg-muted text-muted-foreground"
                          }`}>
                            <span className={`size-1.5 rounded-full ${
                              project.status === "Live" ? "bg-green-500" : "bg-muted-foreground"
                            }`} />
                            {project.status}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <SectionSeparator />

          {/* Back link */}
          <div className="screen-line-after border-x border-edge">
            <div className="px-4 py-4">
              <FadeIn delay={0.4}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Back to home
                </Link>
              </FadeIn>
            </div>
          </div>

          <SectionSeparator />

          <Footer />
        </div>
      </main>
    </>
  );
}
