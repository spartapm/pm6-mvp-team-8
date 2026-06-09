import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MobileShell from "@/components/layout/MobileShell";
import PostHogProvider from "@/components/providers/PostHogProvider";
import { CompareProvider } from "@/lib/compare-store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "화해 MVP - 비교함",
  description: "화장품 비교함 & 의사결정 가이드 MVP",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "group8 MVP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <PostHogProvider>
          <MobileShell>
            <CompareProvider>{children}</CompareProvider>
          </MobileShell>
        </PostHogProvider>
      </body>
    </html>
  );
}
