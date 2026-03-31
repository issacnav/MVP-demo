"use client";

import Link from "next/link";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import type { BlogPostPreview } from "@/lib/notion-blog";

function BlogCover({
  title,
  coverUrl,
}: {
  title: string;
  coverUrl: string | null;
}) {
  if (!coverUrl) {
    return (
      <div className="flex h-48 items-end rounded-[18px] border border-border bg-gradient-to-br from-info/15 via-accent/60 to-background p-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-info">
          Physio Notes
        </span>
      </div>
    );
  }

  return (
    <div
      className="h-48 rounded-[18px] border border-border bg-card bg-cover bg-center"
      style={{ backgroundImage: `url("${coverUrl}")` }}
      aria-label={title}
    />
  );
}

export function BlogListingContent({
  posts,
  hasError,
}: {
  posts: BlogPostPreview[];
  hasError: boolean;
}) {
  return (
    <>
      <div className="screen-line-before screen-line-after border-x border-edge">
        <div className="relative px-4 py-8 sm:py-10">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <div className="font-mono text-xs uppercase tracking-[0.24em] text-info">
              Writing
            </div>
            <h1 className="mt-3 font-pixel text-3xl font-semibold sm:text-4xl">
              Blog
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              Thoughts on physiotherapy, rehabilitation science, and
              evidence-based practice.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="screen-line-after border-x border-edge">
        <div className="px-4 py-6 sm:py-7">
          {posts.length > 0 ? (
            <StaggerContainer>
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 360, damping: 26 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block rounded-[22px] border border-border bg-card/60 p-4 transition-colors duration-200 hover:border-info/25 hover:bg-accent/60"
                      >
                        <BlogCover title={post.title} coverUrl={post.coverUrl} />

                        <div className="mt-5">
                          <h2 className="font-pixel text-[18px] font-semibold leading-tight text-foreground">
                            {post.title}
                          </h2>
                          <p className="mt-3 line-clamp-3 font-mono text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt || "A new article is on the way."}
                          </p>
                        </div>

                        <div className="mt-4 font-mono text-xs text-muted-foreground">
                          {post.formattedDate} | {post.readTimeMinutes} min read
                        </div>

                        {post.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <FadeIn delay={0.08}>
              <div className="rounded-[22px] border border-border bg-card/55 px-4 py-8 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  {hasError
                    ? "The blog is unavailable right now - please check back soon."
                    : "No articles yet - check back soon."}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </>
  );
}
