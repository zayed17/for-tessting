import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Happy Birthday - A Special Celebration",
  description: "A heartfelt birthday celebration with meaningful wishes",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
    >
      <body className="font-sans bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
