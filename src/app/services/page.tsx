import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionSeparator } from "@/components/LayoutParts";
import { ServicesPricingContent } from "@/components/ServicesPricingContent";

export const metadata: Metadata = {
  title: "Services & Pricing | Sarthak Navalekar",
  description:
    "View physiotherapy services, session pricing, and practice platform updates from Sarthak Navalekar.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          <ServicesPricingContent />
          <SectionSeparator />
          <Footer />
        </div>
      </main>
    </>
  );
}
