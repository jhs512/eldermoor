import { Geist_Mono } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

import ContextLayout from "./ContextLayout";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "10xunicon",
  description: "10xunicon - 개발자 성장 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ContextLayout>{children}</ContextLayout>
      </body>
    </html>
  );
}
