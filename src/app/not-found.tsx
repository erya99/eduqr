import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
                {/* Background Blob */}
                <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] opacity-60" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    {/* 404 Text */}
                    <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent opacity-20 select-none">
                        404
                    </h1>

                    <div className="-mt-12 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Aradığınız sayfayı bulamadık
                        </h2>
                        <p className="text-lg text-gray-600 max-w-md mx-auto">
                            Gitmek istediğiniz sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <MoveLeft className="w-5 h-5" />
                            Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
