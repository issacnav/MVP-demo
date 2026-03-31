import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionSeparator } from "@/components/LayoutParts";
import { BookSessionContent } from "@/components/BookSessionContent";

export const metadata: Metadata = {
  title: "Book a Session | Sarthak Navalekar",
  description:
    "Book a physiotherapy session with Sarthak Navalekar. Choose the right appointment type and reserve a time online.",
};

export default function BookPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          <BookSessionContent />
          <SectionSeparator />
          <Footer />
        </div>
      </main>
    </>
  );
}
