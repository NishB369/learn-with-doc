"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, Clock, ChevronRight } from "lucide-react";

// Icon mapping
const iconMap: { [key: string]: any } = {
    BookOpen,
    Video,
    Clock
};

interface StatItemProps {
    icon: React.ElementType;
    number: string;
    label: string;
    description: string;
    ctaText: string;
    delay: number;
}

const StatCard = ({ icon: Icon, number, label, description, ctaText, delay }: StatItemProps) => (
    <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay }}
        className="relative group p-6 md:p-8 rounded-2xl bg-white border border-slate-300/80 shadow-xl shadow-slate-100/50 hover:shadow-[0_40px_80px_-15px_rgba(14,165,233,0.15)] transition-all duration-300 overflow-hidden flex flex-col"
    >
        {/* Card Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-sky-100/30" />

        {/* Square Grid Overlay - Positioned after gradient for visibility */}
        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity"
            style={{
                backgroundImage: `linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}
        />

        <div className="relative z-10 flex flex-col h-full">
            {/* Header Area: Layout shifts on mobile */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-6">
                <div className="bg-sky-50 w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-blue group-hover:text-white transition-all duration-500 shadow-sm border border-sky-100 group-hover:border-primary-blue md:mb-6">
                    <Icon className="text-primary-blue group-hover:text-white w-7 h-7 md:w-8 md:h-8 transition-colors" />
                </div>

                <div className="flex flex-col">
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1 md:mb-2">
                        {number}
                    </h3>
                    <p className="text-base md:text-xl font-bold text-slate-800 tracking-tight leading-none">
                        {label}
                    </p>
                </div>
            </div>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8 grow">
                {description}
            </p>

            <motion.button
                whileHover={{ gap: "12px", x: 4 }}
                className="flex items-center gap-2 text-primary-blue font-bold text-sm md:text-base group/btn cursor-pointer w-fit"
            >
                <span className="relative">
                    {ctaText}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover/btn:w-full" />
                </span>
                <ChevronRight size={18} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
        </div>
    </motion.div>
);

interface StatsProps {
    data: {
        tag: string;
        title: string;
        subtitle: string;
        cards: {
            icon: string;
            number: string;
            label: string;
            description: string;
            ctaText: string;
        }[];
    };
}

export default function Stats({ data }: StatsProps) {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-50/30 border-y border-slate-100">
            {/* Enhanced Background Texture */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.25]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-100/60 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px] mix-blend-multiply -animate-pulse" />
            </div>

            <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-8 shadow-sm border border-slate-100/50"
                    >
                        <span className="w-2 h-2 bg-primary-blue rounded-full animate-ping" />
                        <span className="text-primary-blue font-bold text-[11px] tracking-[0.2em] uppercase">{data.tag}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-5 md:mb-4 tracking-tight-custom leading-tight"
                    >
                        {data.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-xl text-slate-500 font-semibold leading-snug"
                    >
                        {data.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {data.cards.map((card, index) => {
                        const Icon = iconMap[card.icon];
                        return (
                            <StatCard
                                key={index}
                                icon={Icon}
                                number={card.number}
                                label={card.label}
                                ctaText={card.ctaText}
                                description={card.description}
                                delay={0.3 + index * 0.1}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
