"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { SearchIcon, SunIcon, MoonIcon } from "@/components/icons";
import { useCommandPalette } from "@/components/CommandPalette";
import { motion, AnimatePresence } from "framer-motion";

const COLOR_THEMES = [
  { id: "default" as const, label: "Default", desc: "Clean & minimal", dot: "oklch(0.556 0 0)" },
  { id: "ember" as const, label: "Ember", desc: "Warm & earthy", dot: "oklch(0.55 0.15 30)" },
  { id: "amethyst" as const, label: "Amethyst", desc: "Bold & vibrant", dot: "oklch(0.55 0.25 300)" },
  { id: "sepia" as const, label: "Sepia", desc: "Ink & paper, dark", dot: "oklch(0.5 0.1 30)" },
  { id: "sandstone" as const, label: "Sandstone", desc: "Ink & paper, light", dot: "oklch(0.55 0.12 25)" },
  { id: "dune" as const, label: "Dune", desc: "Minimal & warm", dot: "oklch(0.4 0.02 60)" },
  { id: "slate" as const, label: "Slate", desc: "Muted & focused", dot: "oklch(0.4 0.03 250)" },
] as const;

export function Header() {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const { open: openCommandPalette } = useCommandPalette();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Close theme menu on outside click
  useEffect(() => {
    if (!themeMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [themeMenuOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background px-3 sm:px-4 md:px-2 transition-shadow duration-300"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-1.5 border-x border-edge px-2 sm:gap-4 md:max-w-3xl">
        <Link href="/" aria-label="Home" className="transition-[scale] ease-out active:scale-[0.98]">
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
          <Link
            href="/services"
            className="font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300 hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300 hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center rounded-full border border-info/30 px-3 py-1 font-mono text-sm font-medium text-info transition-colors duration-300 hover:border-info/40 hover:bg-info/10 hover:text-foreground"
          >
            Book a Session
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

          <div className="relative" ref={themeMenuRef}>
            <button
              className="inline-flex items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground size-8 shrink-0"
              onClick={() => setThemeMenuOpen((v) => !v)}
              aria-label="Theme options"
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

            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-border bg-popover p-1.5 shadow-lg"
                >
                  {/* Light / Dark toggle */}
                  <div className="mb-1.5 flex rounded-lg bg-muted p-0.5">
                    {(["light", "dark"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={(e) => { setTheme(m, e); }}
                        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                          (theme === m || (theme === "system" && ((m === "dark" && isDark) || (m === "light" && !isDark))))
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {m === "light" ? "Light" : "Dark"}
                      </button>
                    ))}
                  </div>

                  <div className="h-px bg-border my-1.5" />

                  {/* Color themes */}
                  {COLOR_THEMES.map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => { setColorTheme(ct.id); }}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent ${
                        colorTheme === ct.id ? "bg-accent" : ""
                      }`}
                    >
                      <span
                        className="size-3 shrink-0 rounded-full border border-border"
                        style={{ backgroundColor: ct.dot }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{ct.label}</span>
                        <span className="text-[11px] text-muted-foreground">{ct.desc}</span>
                      </div>
                      {colorTheme === ct.id && (
                        <span className="ml-auto size-2 rounded-full bg-info shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
              <Link
                href="/services"
                className="font-mono text-sm font-medium text-muted-foreground py-1"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="font-mono text-sm font-medium text-muted-foreground py-1"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/book"
                className="inline-flex w-fit items-center rounded-full border border-info/30 px-3 py-1 font-mono text-sm font-medium text-info transition-colors hover:border-info/40 hover:bg-info/10 hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Book a Session
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
