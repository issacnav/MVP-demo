"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "@/components/icons";

const sections = [
  { label: "Home", id: "top", icon: "🏠" },
  { label: "About", id: "about", icon: "👤" },
  { label: "Connect", id: "connect", icon: "🔗" },
  { label: "Certifications & Skills", id: "certifications", icon: "📜" },
  { label: "Experience", id: "experience", icon: "💼" },
  { label: "Education", id: "education", icon: "🎓" },
  { label: "Quote", id: "quote", icon: "💬" },
];

const actions = [
  { label: "Download Resume", icon: "📄", action: () => window.open("/resume.pdf", "_blank") },
  { label: "Send Email", icon: "✉️", action: () => window.open("mailto:snaval300@caledonian.ac.uk") },
  { label: "Open LinkedIn", icon: "💼", action: () => window.open("https://www.linkedin.com/in/sarthak-navalekar/", "_blank") },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = [
    ...sections.map((s) => ({ ...s, type: "section" as const })),
    ...actions.map((a) => ({ ...a, type: "action" as const, id: a.label })),
  ];

  const filtered = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (item: (typeof allItems)[0]) => {
      setOpen(false);
      setQuery("");
      if (item.type === "section") {
        const el = item.id === "top" ? document.body : document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if ("action" in item) {
        (item as (typeof actions)[0]).action();
      }
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQuery(""); }}
            />
            <motion.div
              className="fixed left-1/2 top-[20%] z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-border bg-background shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-2 border-b border-border px-3">
                <SearchIcon className="size-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  className="h-11 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Search for a command to run..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                />
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <div className="max-h-64 overflow-y-auto p-1">
                {filtered.length === 0 && (
                  <p className="p-4 text-center font-mono text-sm text-muted-foreground">
                    No results found.
                  </p>
                )}
                {filtered.length > 0 && (
                  <div className="space-y-0.5">
                    {filtered.map((item, i) => (
                      <button
                        key={item.id}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors ${
                          i === selectedIndex
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(i)}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                        <span className="ml-auto text-xs text-muted-foreground capitalize">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function useCommandPalette() {
  return {
    open: () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
    },
  };
}
