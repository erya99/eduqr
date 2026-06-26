"use client";

import { useRef } from "react";
import { FeatureCarousel } from "@/components/ui/animated-feature-carousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HowItWorks() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
    const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "0px"]);

    return (
        <section ref={sectionRef} className="bg-[#F5F0E8] pb-10 px-3 md:px-5">
            <motion.div
                style={{ y: cardY }}
                className="rounded-[1.5rem] md:rounded-[2rem] bg-[#0F1C36] overflow-hidden py-24"
            >
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16 space-y-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <p className="text-sm font-semibold text-blue-300 uppercase tracking-widest">Nasıl Çalışır?</p>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
                            10 Dakikada Kurulum.{" "}
                            <em className="not-italic text-blue-300">Ömür Boyu Kolaylık.</em>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            4 adımda restoranınızı dijitalleştirin. Dakikalar içinde kullanıma başlayın.
                        </p>
                    </motion.div>

                    {/* Animated Carousel Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                        <FeatureCarousel />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
