import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import HydrationProvider from "@/components/HydrationProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Dev-Overflow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <body className={inter.className}>
          <HydrationProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
            </ThemeProvider>
          </HydrationProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
