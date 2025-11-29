import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"; // EKLENDİ
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Menu SaaS",
  description: "En iyi QR Menü deneyimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ClerkProvider ile sarmaladık
    <ClerkProvider>
      <html lang="tr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}