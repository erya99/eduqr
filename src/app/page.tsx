import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import LegalSection from "@/components/landing/LegalSection";
import FeatureCards from "@/components/landing/FeatureCards";
import BentoFeatures from "@/components/landing/BentoFeatures";
import Footer from "@/components/landing/Footer";
import PainPoints from "@/components/landing/PainPoints";
import SocialProof from "@/components/landing/SocialProof";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatsAppWidget from "@/components/landing/WhatsAppWidget";
export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#F5F0E8]">
      <WhatsAppWidget />
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#F5F0E8]" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeatureCards />
        <BentoFeatures />
        <Features />
        <LegalSection />
        <PainPoints />
        <HowItWorks />
<SocialProof />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
