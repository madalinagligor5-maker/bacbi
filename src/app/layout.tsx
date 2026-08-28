import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BacPilot - Pregătire inteligentă pentru BAC",
  description: "Trasee de învățare adaptative și simulări inteligente pentru examenul de Bacalaureat.",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen relative">
        {children}
        
        {/* Service Worker Registration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
