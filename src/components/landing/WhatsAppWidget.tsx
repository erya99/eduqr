"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, Send, Phone } from "lucide-react";
import Image from "next/image";

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Auto open after 30 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 30000);
        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;

    const PHONE_NUMBER = "905550210503";
    const DEFAULT_MESSAGE = "Merhaba, EduQR hakkında bilgi almak istiyorum.";

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
            {/* Widget Card */}
            {isOpen && (
                <div className="mb-4 w-[330px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border border-gray-100 origin-bottom-right">
                    {/* Header */}
                    <div className="bg-[#008069] p-4 flex items-center justify-between text-white relative shadow-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-11 h-11 bg-white rounded-full p-0.5 shadow-sm">
                                    <Image
                                        src="/eduqrlogo3.png"
                                        alt="EduQR"
                                        width={44}
                                        height={44}
                                        className="rounded-full w-full h-full object-contain p-1"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#008069] rounded-full"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight">EduQR Destek</h3>
                                <p className="text-[11px] text-green-100 opacity-90 mt-0.5">Çevrimiçi</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleOpen}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Body (Chat Area) */}
                    <div className="bg-[#EFEAE2] h-[280px] flex flex-col relative overflow-hidden">
                        {/* CSS Pattern Background to simulate WhatsApp Doodle */}
                        <div className="absolute inset-0 opacity-[0.06]"
                            style={{
                                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C9292' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
                            }}
                        />

                        <div className="p-6 flex flex-col gap-4 h-full overflow-y-auto z-10">
                            {/* Message Bubble */}
                            <div className="bg-white p-3.5 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm self-start max-w-[85%] animate-in zoom-in duration-300 origin-top-left border border-gray-100 relative group">
                                {/* Tail */}
                                <div className="absolute top-0 -left-2 w-3 h-3 bg-white border-l border-b border-gray-100 transform rotate-45 skew-y-12"></div>

                                <h4 className="font-bold text-gray-500 text-[11px] mb-1">EduQR Destek</h4>
                                <p className="text-[#111B21] text-sm leading-snug">
                                    Merhabalar 👋 <br /> <br />
                                    Size nasıl yardımcı olabiliriz?
                                </p>
                                <span className="text-[10px] text-gray-400 block text-right mt-1 font-medium">
                                    {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <div className="p-4 bg-[#F0F2F5] border-t border-gray-200">
                        <a
                            href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-full transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg active:scale-95 ease-out duration-200"
                        >
                            <MessageCircle size={20} className="fill-white" />
                            WhatsApp ile Bilgi Al
                        </a>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={toggleOpen}
                className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,211,102,0.4)] transition-all transform hover:scale-110 active:scale-90 group relative z-[100] active:shadow-sm"
                aria-label="WhatsApp Destek"
            >
                {/* WhatsApp Icon SVG */}
                <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-9 md:h-9 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.11 17.205c-.372-.186-2.2-.977-2.537-1.087-.336-.109-.58-.163-.825.163-.25.326-.96 1.087-1.176 1.306-.217.219-.434.245-.806.082-.372-.163-1.571-.508-2.992-1.62-.849-.663-1.422-1.482-1.588-1.733-.166-.251-.018-.387.168-.553.167-.149.372-.387.558-.58.186-.194.248-.332.372-.553.124-.221.062-.415-.031-.58-.093-.163-.825-1.99-1.13-2.724-.303-.73-.61-.63-.837-.641-.217-.008-.465-.008-.713-.008-.248 0-.651.083-.992.418-.341.335-1.302 1.144-1.302 2.788 0 1.644 1.333 3.232 1.519 3.456.186.223 2.624 3.593 6.357 5.04.887.343 1.579.549 2.12.697.891.245 1.702.211 2.342.125.714-.096 2.2-.797 2.51-1.567.31-.77.31-1.43.217-1.567-.093-.137-.34-.219-.713-.385m-6.837 8.01c-2.212 0-4.425-.503-6.637-1.509l6.637 1.509zm15.725-7.725c0 4.142-3.358 7.5-7.5 7.5-2.062 0-4.025-.838-5.487-2.301l-5.488 1.45 1.45-5.488c-1.463-1.462-2.3-3.425-2.3-5.487 0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5zm-2.25 0c0-2.899-2.351-5.25-5.25-5.25s-5.25 2.351-5.25 5.25c0 1.45.587 2.763 1.537 3.712l-.937 3.55 3.55-.937c.949.95 2.262 1.537 3.712 1.537 2.899 0 5.25-2.351 5.25-5.25z" />
                    <path d="M16 4C9.373 4 4 9.373 4 16c0 2.126.55 4.12 1.514 5.866l-1.586 5.792 5.938-1.558C11.666 27.272 13.754 28 16 28c6.627 0 12-5.373 12-12S22.627 4 16 4zm0 21.888v-.024c-1.982 0-3.928-.528-5.62-1.538l-.408-.24-4.178 1.096 1.116-4.068-.252-.408C5.808 18.97 5.2 17.514 5.2 16c.084-5.388 4.478-9.782 9.876-9.888 5.344-.108 9.782 4.214 9.888 9.612.11 5.38-4.214 9.782-9.612 9.782z" />
                </svg>

                {/* Notification Dot */}
                <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                </span>
            </button>
        </div>
    );
}
