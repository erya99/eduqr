import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Basit Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 QR Menü SaaS. Tüm hakları saklıdır.
      </footer>
    </main>
  );
}