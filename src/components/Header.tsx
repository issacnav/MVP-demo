"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { SearchIcon, SunIcon, MoonIcon } from "@/components/icons";
import { useCommandPalette } from "@/components/CommandPalette";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openCommandPalette } = useCommandPalette();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background px-3 sm:px-4 md:px-2 transition-shadow duration-300"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-1.5 border-x border-edge px-2 sm:gap-4 md:max-w-3xl">
        <Link href="/" aria-label="Home" className="transition-[scale] ease-out active:scale-[0.98]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/images/icon.svg"
            alt="Sarthak Navalekar"
            className="h-9 w-9"
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>

        <div className="flex-1" />

        <nav className="flex items-center gap-4 max-sm:hidden">
          <Link
            href="/"
            className="font-mono text-sm font-medium text-foreground transition-[color] duration-300 hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300 hover:text-foreground"
          >
            Projects
          </Link>
        </nav>

        <div className="flex items-center">
          <button onClick={openCommandPalette} className="mr-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-input bg-white px-2.5 h-8 text-sm font-medium text-muted-foreground shadow-xs select-none hover:bg-white dark:bg-input/30 dark:hover:bg-input/30">
            <SearchIcon className="size-4" />
            <kbd className="hidden sm:inline-flex items-center gap-1">
              <span className="pointer-events-none inline-flex h-5 items-center justify-center rounded-sm px-1 text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10 w-fit min-w-6">
                Ctrl
              </span>
              <span className="pointer-events-none inline-flex h-5 items-center justify-center rounded-sm px-1 text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10 w-5 min-w-5">
                K
              </span>
            </kbd>
          </button>

          <span className="mx-2 flex h-4 w-px bg-border" />

          <button
            className="inline-flex items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground size-8 shrink-0"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Theme Toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground size-8 shrink-0 sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="border-x border-b border-edge bg-background px-4 py-3 sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="font-mono text-sm font-medium text-foreground py-1"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="font-mono text-sm font-medium text-muted-foreground py-1"
                onClick={() => setMenuOpen(false)}
              >
                Projects
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
