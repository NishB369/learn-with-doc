"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface AboutHeroProps {
    title: string;
    subtitle: string;
}

export default function AboutHero({ title, subtitle }: AboutHeroProps) {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-sky-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 md:px-20 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6"
                >
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
                        <Activity className="text-primary-blue w-4 h-4" />
                        <span className="text-primary-blue font-bold text-[10px] uppercase tracking-widest">
                            Our Purpose
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight-custom leading-[1.1]"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
}
