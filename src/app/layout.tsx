import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider"; // next-themes ayarı
import { Toaster } from "@/components/ui/sonner"; // Bildirimler için (Varsa)
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
    // 1. En dışta Clerk (Kimlik Doğrulama)
    <ClerkProvider>
      {/* suppressHydrationWarning: next-themes için gereklidir */}
      <html lang="tr" suppressHydrationWarning>
        <body className={inter.className}>
          {/* 2. İçeride Tema Sağlayıcı (Dark Mode) */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Varsayılan: Koyu Tema
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster /> {/* Bildirim kutusu */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}