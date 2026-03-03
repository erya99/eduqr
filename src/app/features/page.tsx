import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DetailedFeatures from "@/components/landing/DetailedFeatures";

export default function FeaturesPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC]">
            {/* GLOBAL BACKGROUND MESH */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                {/* Top Right Blob (Blue/Navy) */}
                <div className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] bg-[#0F1C36]/30 rounded-full blur-[120px]" />

                {/* Middle Left Blob (Warm Gold/Bronze) */}
                <div className="absolute top-[30%] left-[-10%] w-[700px] h-[700px] bg-[#D4A373]/35 rounded-full blur-[100px] mix-blend-multiply" />

                {/* Bottom Right Blob (Blue) */}
                <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/60 rounded-full blur-[120px]" />

                {/* Additional Navy Accent */}
                <div className="absolute top-[60%] right-[20%] w-[500px] h-[500px] bg-[#0F1C36]/25 rounded-full blur-[100px]" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1C36] mb-6 leading-tight">
                            İşletmenize Güç Katan Özellikler
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            İşletmenizi dijitale taşıyan, rakiplerinizden sıyrılmanızı sağlayan özelliklerin tamamı.
                        </p>
                    </div>
                </section>

                {/* Detailed Features */}
                <DetailedFeatures />

                <Footer />
            </div>
        </main>
    );
}
