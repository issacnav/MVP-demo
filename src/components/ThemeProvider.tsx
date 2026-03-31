"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type Theme = "light" | "dark" | "system";
type ColorTheme = "default" | "ember" | "amethyst" | "sepia" | "sandstone" | "dune" | "slate";

const ThemeContext = createContext<{
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (t: Theme, event?: React.MouseEvent) => void;
  setColorTheme: (c: ColorTheme) => void;
}>({ theme: "light", colorTheme: "default", setTheme: () => {}, setColorTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function applyColorTheme(colorTheme: ColorTheme) {
  const root = document.documentElement;
  if (colorTheme === "default") {
    root.removeAttribute("data-color-theme");
  } else {
    root.setAttribute("data-color-theme", colorTheme);
  }
}

function playToggleSound(isDark: boolean) {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    // Light mode: higher, brighter tone; Dark mode: lower, deeper tone
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(isDark ? 380 : 580, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(isDark ? 280 : 880, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);

    oscillator.onended = () => ctx.close();
  } catch {
    // Audio not available — silently ignore
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("default");
  const initializedRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored && ["light", "dark", "system"].includes(stored) ? stored : "light";
    setThemeState(initial);
    applyTheme(initial);

    const storedColor = localStorage.getItem("color-theme") as ColorTheme | null;
    const validColors: ColorTheme[] = ["default", "ember", "amethyst", "sepia", "sandstone", "dune", "slate"];
    const initialColor = storedColor && validColors.includes(storedColor) ? storedColor : "default";
    setColorThemeState(initialColor);
    applyColorTheme(initialColor);

    initializedRef.current = true;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if ((localStorage.getItem("theme") || "system") === "system") {
        applyTheme("system");
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((t: Theme, event?: React.MouseEvent) => {
    const willBeDark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    playToggleSound(willBeDark);

    // Use View Transition API for circular clip animation
    if (document.startViewTransition && event) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setThemeState(t);
        localStorage.setItem("theme", t);
        applyTheme(t);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setThemeState(t);
      localStorage.setItem("theme", t);
      applyTheme(t);
    }
  }, []);

  const setColorTheme = useCallback((c: ColorTheme) => {
    setColorThemeState(c);
    localStorage.setItem("color-theme", c);
    applyColorTheme(c);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, setTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
