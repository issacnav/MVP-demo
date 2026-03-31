"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn } from "@/components/Motion";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/notion-blog";

function BlogHeroCover({
  title,
  coverUrl,
}: {
  title: string;
  coverUrl: string | null;
}) {
  if (!coverUrl) {
    return (
      <div className="flex max-h-[380px] min-h-56 w-full items-end rounded-[24px] border border-border bg-gradient-to-br from-info/15 via-accent/60 to-background p-6">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-info">
          Writing
        </span>
      </div>
    );
  }

  return (
    <div
      className="max-h-[380px] min-h-56 w-full rounded-[24px] border border-border bg-card bg-cover bg-center"
      style={{ backgroundImage: `url("${coverUrl}")` }}
      aria-label={title}
    />
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <>
      <div className="screen-line-before screen-line-after border-x border-edge">
        <div className="relative px-4 py-6 sm:py-8">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="mt-5">
              <BlogHeroCover title={post.title} coverUrl={post.coverUrl} />
            </div>
          </FadeIn>

          <FadeIn delay={0.22}>
            <h1 className="mt-6 font-pixel text-3xl font-semibold leading-tight sm:text-4xl">
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm text-muted-foreground">
              <span>{post.formattedDate}</span>
              <span>|</span>
              <span>{post.readTimeMinutes} min read</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          <FadeIn delay={0.08}>
            <div className="mx-auto max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ className, ...props }) => (
                    <h1
                      className={cn(
                        "mt-8 font-pixel text-3xl font-semibold leading-tight first:mt-0",
                        className
                      )}
                      {...props}
                    />
                  ),
                  h2: ({ className, ...props }) => (
                    <h2
                      className={cn(
                        "mt-10 font-pixel text-2xl font-semibold leading-tight",
                        className
                      )}
                      {...props}
                    />
                  ),
                  h3: ({ className, ...props }) => (
                    <h3
                      className={cn(
                        "mt-8 font-pixel text-xl font-semibold leading-tight",
                        className
                      )}
                      {...props}
                    />
                  ),
                  p: ({ className, ...props }) => (
                    <p
                      className={cn(
                        "mt-4 font-sans text-[15px] leading-8 text-foreground/95",
                        className
                      )}
                      {...props}
                    />
                  ),
                  ul: ({ className, ...props }) => (
                    <ul
                      className={cn(
                        "mt-4 list-disc space-y-2 pl-6 font-sans text-[15px] leading-8 text-foreground/95",
                        className
                      )}
                      {...props}
                    />
                  ),
                  ol: ({ className, ...props }) => (
                    <ol
                      className={cn(
                        "mt-4 list-decimal space-y-2 pl-6 font-sans text-[15px] leading-8 text-foreground/95",
                        className
                      )}
                      {...props}
                    />
                  ),
                  li: ({ className, ...props }) => (
                    <li className={cn("pl-1", className)} {...props} />
                  ),
                  blockquote: ({ className, ...props }) => (
                    <blockquote
                      className={cn(
                        "mt-6 rounded-r-[20px] border-l-2 border-info/50 bg-card/55 px-5 py-4 font-sans text-[15px] italic leading-8 text-muted-foreground",
                        className
                      )}
                      {...props}
                    />
                  ),
                  a: ({ className, ...props }) => (
                    <a
                      className={cn("text-info underline underline-offset-4", className)}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  hr: ({ className, ...props }) => (
                    <hr className={cn("my-8 border-border", className)} {...props} />
                  ),
                  pre: ({ className, ...props }) => (
                    <pre
                      className={cn(
                        "mt-6 overflow-x-auto rounded-[20px] border border-border bg-card/75 p-4 font-mono text-sm leading-7",
                        className
                      )}
                      {...props}
                    />
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;

                    if (isInline) {
                      return (
                        <code
                          className="rounded-md border border-border bg-muted/70 px-1.5 py-0.5 font-mono text-[0.9em]"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code className={cn("font-mono text-sm", className)} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.markdown}
              </ReactMarkdown>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          <FadeIn delay={0.08}>
            <div className="flex flex-col gap-3 rounded-[22px] border border-border bg-card/55 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                Found this helpful? Book a session.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-full border border-info/30 bg-info/10 px-4 py-2 font-mono text-sm font-medium text-info transition-colors hover:border-info/40 hover:text-foreground"
              >
                Book a Session
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
