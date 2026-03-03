"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 md:w-[400px]">
            <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 dark:bg-[#0F1C36]/95 dark:border-white/10">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0 text-blue-600 dark:text-blue-400">
                        <Cookie className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Çerez Tercihleri
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz. Sitemizi kullanarak{" "}
                            <Link href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                                Gizlilik Politikası
                            </Link>
                            'nı kabul etmiş sayılırsınız.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={acceptCookies}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/25"
                            >
                                Kabul Et
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                aria-label="Kapat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
