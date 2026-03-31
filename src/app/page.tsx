import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ConnectSection } from "@/components/ConnectSection";
import { CertificationsSection } from "@/components/GitHubActivitySection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { QuoteSection } from "@/components/QuoteSection";
import { Footer } from "@/components/Footer";
import { SectionSeparator } from "@/components/LayoutParts";

export default function Home() {
  return (
    <>
      {/* Scroll fade overlay */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          <HeroSection />

          <AboutSection />
          <SectionSeparator />

          <ConnectSection />
          <SectionSeparator />

          <CertificationsSection />
          <SectionSeparator />

          <ExperienceSection />
          <SectionSeparator />

          <EducationSection />
          <SectionSeparator />

          <PublicationsSection />
          <SectionSeparator />

          <QuoteSection />
          <SectionSeparator />

          <Footer showMascot />
        </div>
      </main>
    </>
  );
}
