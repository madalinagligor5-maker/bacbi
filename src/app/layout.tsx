import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const text = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-text" });
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "BacBio",
  description: "Pregătire pentru Bacalaureatul la biologie, 10–20 de minute pe zi.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1714" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${text.variable} ${display.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
