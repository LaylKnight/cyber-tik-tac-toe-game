import type { Metadata, Viewport } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
});

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech",
});

export const metadata: Metadata = {
  title: "Cyber T-T-T | Cyberpunk Tic-Tac-Toe",
  description: "A classic two-player tic-tac-toe game with a neon cyberpunk twist.",
  icons: {
    icon: [
      { url: "/img/favicon-package/favicon.ico" },
      { url: "/img/favicon-package/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/img/favicon-package/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-package/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/img/favicon-package/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/img/favicon-package/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${shareTech.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}
