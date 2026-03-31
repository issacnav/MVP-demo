"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(
  () => import("@/components/CommandPalette").then((mod) => mod.CommandPalette),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () => import("@/components/ScrollToTop").then((mod) => mod.ScrollToTop),
  { ssr: false }
);

export default function ClientOverlays() {
  return (
    <>
      <CommandPalette />
      <ScrollToTop />
    </>
  );
}
