import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import ClientOverlays from "@/components/ClientOverlays";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarthak Navalekar – Physiotherapist",
  description:
    "Sarthak Uday Navalekar – Physiotherapy Practitioner based in Scotland, UK",
  authors: [{ name: "Sarthak Navalekar" }],
  keywords: [
    "Sarthak Navalekar",
    "Physiotherapy",
    "Physiotherapist",
    "Scotland",
    "Healthcare",
  ],
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Sarthak N",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full overflow-x-clip antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <ClientOverlays />
        </ThemeProvider>
      </body>
    </html>
  );
}
