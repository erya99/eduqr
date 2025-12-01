import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import { MessageCircle } from "lucide-react"; // WhatsApp ikonu niyetine

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <Hero />
      
      <Features />
      
      <Footer />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/905555555555" // Kendi numaranı buraya yaz
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="WhatsApp ile iletişime geç"
      >
        <MessageCircle size={32} />
      </a>
    </main>
  );
}