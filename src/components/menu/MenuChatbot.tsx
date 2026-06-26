"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { filterMenu, FilterableProduct } from "@/lib/menu-filter";

interface Message {
  role: "user" | "bot";
  text: string;
  products?: FilterableProduct[];
}

const SUGGESTIONS = [
  "Glutensiz ürünler",
  "50 TL altı",
  "Vegan seçenekler",
  "En ucuz",
  "Acısız",
  "Düşük kalori",
];

const fmt = (p: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(p);

export default function MenuChatbot({ products }: { products: FilterableProduct[] }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Merhaba! Menüde arama yapmanıza yardımcı olabilirim. Ne arıyorsunuz?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (query: string) => {
    if (!query.trim()) return;

    const result = filterMenu(query, products);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: query },
      { role: "bot", text: result.message, products: result.products },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-40 right-4 z-40 w-12 h-12 rounded-full bg-[var(--brand-primary)] text-white shadow-lg flex items-center justify-center text-xl hover:scale-110 transition-transform"
        aria-label="Menü asistanı"
      >
        🔍
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-sm h-[80vh] sm:h-[600px] bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">Menü Asistanı</p>
                  <p className="text-[10px] text-gray-400">Filtreleme & Arama</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${msg.role === "user" ? "" : "w-full"}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-[var(--brand-primary)] text-white rounded-br-sm"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Ürün kartları */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.products.slice(0, 5).map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
                          >
                            {p.imageUrl ? (
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl flex-shrink-0">
                                🍽️
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                              {p.categoryName && (
                                <p className="text-[10px] text-gray-400 truncate">{p.categoryName}</p>
                              )}
                              {p.calories && (
                                <p className="text-[10px] text-gray-400">🔥 {p.calories} kcal</p>
                              )}
                            </div>
                            <span className="text-sm font-bold text-[var(--brand-primary)] flex-shrink-0">
                              {fmt(p.price)}
                            </span>
                          </div>
                        ))}
                        {msg.products.length > 5 && (
                          <p className="text-xs text-gray-400 text-center">
                            +{msg.products.length - 5} ürün daha
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Öneriler */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Örn: glutensiz, 50 TL altı..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-[var(--brand-primary)] text-gray-900 dark:text-white"
              />
              <button
                onClick={() => handleSend(input)}
                className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
