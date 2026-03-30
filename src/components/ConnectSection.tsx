"use client";

import { Panel } from "@/components/LayoutParts";
import {
  LinkedInIcon,
  MailIcon,
  ResumeIcon,
} from "@/components/icons";
import { StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import { useCallback } from "react";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sarthak-navalekar/", icon: LinkedInIcon },
  { label: "Mail", href: "mailto:snaval300@caledonian.ac.uk", icon: MailIcon },
  { label: "Resume", href: "/resume.pdf", icon: ResumeIcon },
];

function VCardButton() {
  const download = useCallback(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Sarthak Navalekar",
      "N:Navalekar;Sarthak;Uday;;",
      "TITLE:Physiotherapist",
      "EMAIL:snaval300@caledonian.ac.uk",
      "URL:https://www.linkedin.com/in/sarthak-navalekar/",
      "ADR:;;;;;;Scotland, UK",
      "END:VCARD",
    ].join("\r\n");
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sarthak-navalekar.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <button onClick={download} className="touch-manipulation active:opacity-75">
      <motion.div
        className="justify-center rounded-xl border transition-all duration-200 border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 shadow-sm hover:shadow-md h-9 px-3 flex items-center gap-2 whitespace-nowrap select-none"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
          className="shrink-0 text-neutral-800 dark:text-white/80"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" x2="19" y1="8" y2="14" />
          <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
        <span className="text-xs font-medium leading-none text-neutral-800 dark:text-white/80">
          Save Contact
        </span>
      </motion.div>
    </button>
  );
}

export function ConnectSection() {
  return (
    <Panel title="Connect" id="connect">
      <div className="p-4">
        <StaggerContainer className="flex flex-wrap items-center gap-3 overflow-visible pb-1 sm:gap-4">
          {links.map((link) => (
            <StaggerItem key={link.label} className="relative inline-block">
              <a
                className="touch-manipulation active:opacity-75"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="justify-center rounded-xl border transition-all duration-200 border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 shadow-sm hover:shadow-md h-9 px-3 flex items-center gap-2 whitespace-nowrap select-none"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <link.icon className="size-[14px] shrink-0 text-neutral-800 dark:text-white/80" />
                  <span className="text-xs font-medium leading-none text-neutral-800 dark:text-white/80">
                    {link.label}
                  </span>
                </motion.div>
              </a>
            </StaggerItem>
          ))}
          <StaggerItem className="relative inline-block">
            <VCardButton />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </Panel>
  );
}
