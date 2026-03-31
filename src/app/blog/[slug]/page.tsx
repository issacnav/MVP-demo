import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CrossMarker, SectionSeparator } from "@/components/LayoutParts";
import { FadeIn } from "@/components/Motion";
import { BlogPostContent } from "@/components/BlogPostContent";
import {
  getBlogPostBySlug,
  getBlogStaticParams,
} from "@/lib/notion-blog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") {
    return [];
  }

  return getBlogStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog | Sarthak Navalekar",
    };
  }

  return {
    title: `${post.title} | Sarthak Navalekar`,
    description: post.excerpt || "Article from the Sarthak Navalekar blog.",
  };
}

function BlogPostUnavailable() {
  return (
    <>
      <div className="screen-line-before screen-line-after border-x border-edge">
        <div className="relative px-4 py-8 sm:py-10">
          <CrossMarker position="top-left" />
          <CrossMarker position="top-right" />

          <FadeIn delay={0.08}>
            <h1 className="font-pixel text-3xl font-semibold sm:text-4xl">
              Article unavailable
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              This article could not be loaded right now. Please try again in a
              little while.
            </p>
          </FadeIn>
        </div>
      </div>
    </>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { post, error, configured } = await getBlogPostBySlug(slug);

  if (!post) {
    if (!error && configured) {
      notFound();
    }

    return (
      <>
        <CommandPalette />
        <ScrollToTop />
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
        <Header />
        <main className="px-3 sm:px-4 md:px-2">
          <div className="mx-auto md:max-w-3xl">
            <BlogPostUnavailable />
            <SectionSeparator />
            <Footer />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <CommandPalette />
      <ScrollToTop />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          <BlogPostContent post={post} />
          <SectionSeparator />
          <Footer />
        </div>
      </main>
    </>
  );
}
