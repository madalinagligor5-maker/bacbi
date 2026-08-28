import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BacPilot",
    template: "%s | BacPilot",
  },
  description: "BacPilot — pregătire inteligentă pentru examenul de bacalaureat.",
  applicationName: "BacPilot",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "BacPilot",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} antialiased`}>{children}</body>
      <ServiceWorkerRegister />
    </html>
  );
}
