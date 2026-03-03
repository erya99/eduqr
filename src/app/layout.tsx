import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider"; // next-themes ayarı
import { Toaster } from "@/components/ui/sonner"; // Bildirimler için (Varsa)
import CookieConsent from "@/components/landing/CookieConsent";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduQR",
  description: "En iyi QR Menü deneyimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="tr" suppressHydrationWarning>
        <body className={font.className}>
          {/* 2. İçeride Tema Sağlayıcı (Dark Mode) */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster /> {/* Bildirim kutusu */}
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}