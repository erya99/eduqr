import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    // En dış katmana 'light' sınıfı ve beyaz arka plan veriyoruz
    <main className="min-h-screen bg-white light">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
      {/* WhatsApp butonu kaldırıldı */}
    </main>
  );
}