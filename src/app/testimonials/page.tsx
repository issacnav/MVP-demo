import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionSeparator } from "@/components/LayoutParts";
import TestimonialsSection from "@/components/TestimonialsSection";

export const metadata: Metadata = {
  title: "Testimonials | Alex Morgan",
  description:
    "Read patient feedback about treatment, recovery, and working with Alex Morgan.",
};

export default function TestimonialsPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          <TestimonialsSection />
          <SectionSeparator />
          <Footer />
        </div>
      </main>
    </>
  );
}
