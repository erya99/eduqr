import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

import PainPoints from "@/components/landing/PainPoints";
import SocialProof from "@/components/landing/SocialProof";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FeaturedFeatures from "@/components/landing/FeaturedFeatures";

import WhatsAppWidget from "@/components/landing/WhatsAppWidget";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC]">
      <WhatsAppWidget />
      {/* GLOBAL BACKGROUND MESH (Fixed) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {/* Top Right Blob (Blue/Navy) */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#0F1C36]/20 rounded-full blur-[120px] opacity-80" />

        {/* Middle Left Blob (Warm Gold/Bronze - The "Brownness") */}
        <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[#D4A373]/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />

        {/* Bottom Right Blob (Blue) */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-50/50 rounded-full blur-[120px] opacity-70" />
      </div>

      {/* CONTENT (Relative to sit above background) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturedFeatures />
        <PainPoints />
        <Features />
        <HowItWorks />
        <Testimonials />
        <SocialProof />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}