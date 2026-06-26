import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "EduQR — Restoran ve Kafeler için Dijital QR Menü",
  description: "Kafe ve restoranlar için dijital QR menü platformu. Kalori ve 14 alerjen bildirimi otomatik, fiyat güncelleme saniyeler içinde. Tarım Bakanlığı yönetmeliğine tam uyumlu. İlk ay ücretsiz.",
  keywords: ["QR menü", "dijital menü", "restoran menü", "alerjen bildirimi", "kalori bildirimi", "kafe menü", "QR kod menü", "menü yönetimi"],
  openGraph: {
    title: "EduQR — Restoran ve Kafeler için Dijital QR Menü",
    description: "Kalori ve 14 alerjen bildirimi otomatik, fiyat güncelleme saniyeler içinde. İlk ay ücretsiz.",
    url: "https://eduqr.tr",
    siteName: "EduQR",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="tr" suppressHydrationWarning>
        <body className={`${sans.variable} ${serif.variable} ${sans.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
