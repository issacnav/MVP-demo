import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionSeparator } from "@/components/LayoutParts";
import { BlogListingContent } from "@/components/BlogListingContent";
import { getBlogIndexData } from "@/lib/notion-blog";

export const metadata: Metadata = {
  title: "Blog | Sarthak Navalekar",
  description:
    "Thoughts on physiotherapy, rehabilitation science, and evidence-based practice.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const { posts, error } = await getBlogIndexData();

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          <BlogListingContent posts={posts} hasError={error} />
          <SectionSeparator />
          <Footer />
        </div>
      </main>
    </>
  );
}
