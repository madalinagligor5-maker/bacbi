import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BacPilot - Pregătire inteligentă pentru BAC",
  description: "Trasee de învățare adaptative și simulări inteligente pentru examenul de Bacalaureat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen">
        {children}
      </body>
    </html>
  );
}
