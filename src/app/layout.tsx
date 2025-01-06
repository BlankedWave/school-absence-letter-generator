import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Penjana Surat Tidak Hadir Sekolah",
  description: "Generate school absence letters in Malay and English",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
          <Analytics />
          <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
