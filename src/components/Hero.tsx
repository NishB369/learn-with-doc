"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Play, Star, Clock, UserCheck, ShieldCheck, PhoneCall, Mic, Video, VideoOff } from "lucide-react";
import Image from "next/image";

// Icon mapping
const iconMap: { [key: string]: any } = {
    Star,
    Clock,
    UserCheck,
    ShieldCheck
};

const colorMap: { [key: string]: string } = {
    pink: "text-pink-500",
    sky: "text-primary-blue",
    slate: "text-slate-800",
    blue: "text-white"
};

const bgMap: { [key: string]: string } = {
    pink: "bg-pink-50",
    sky: "bg-sky-50",
    slate: "bg-slate-50",
    blue: "bg-primary-blue"
};

const FloatingCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
            duration: 1,
            delay,
            ease: [0.23, 1, 0.32, 1],
            y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }}
        className={`absolute bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 z-10 scale-75 md:scale-100 ${className}`}
    >
        {children}
    </motion.div>
);

interface HeroProps {
    data: {
        title: string;
        subtitle: string;
        primaryBtn: string;
        secondaryBtn: string;
        socialProof: {
            text: string;
            subtext: string;
            avatars: string[];
        };
        floatingCards: {
            icon: string;
            text?: string;
            title?: string;
            subtitle?: string;
            color: string;
        }[];
        image: string;
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        <section className="relative pt-24 md:pt-40 pb-16 overflow-hidden bg-grid-slate-100">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sky-100/40 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-50/40 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight-custom mb-5">
                                {data.title}
                            </h1>
                            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-snug md:leading-relaxed font-medium">
                                {data.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-2 md:mb-10">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary-blue text-white px-7 py-3.5 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-sky-100 hover:bg-primary-blue-dark transition-colors cursor-pointer border-neon animate-glow-neon text-sm"
                                >
                                    <Search size={18} strokeWidth={2.5} />
                                    <span>{data.primaryBtn}</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(14, 165, 233, 0.05)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-slate-800 border-[1.5px] border-slate-200 px-7 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all cursor-pointer text-sm"
                                >
                                    <span>{data.secondaryBtn}</span>
                                </motion.button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex flex-col gap-3 items-center lg:items-start md:border-t md:border-slate-100 pt-8 mt-2">
                                <div className="flex -space-x-2">
                                    {data.socialProof.avatars.map((avatar, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                            className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                                        >
                                            <Image src={avatar} alt="User" fill className="object-cover" />
                                        </motion.div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-sky-50 flex items-center justify-center shadow-sm">
                                        <span className="text-primary-blue text-[10px] font-bold">+</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold tracking-tight text-sm">{data.socialProof.text}</p>
                                    <p className="text-slate-500 text-xs font-medium">{data.socialProof.subtext}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Doctor Image & Floating Cards */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-md mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-xl"
                        >
                            <Image
                                src={data.image}
                                alt="Professional Educator"
                                fill
                                className="object-cover object-top"
                                priority
                            />

                            {/* Image Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-sky-50/20 via-transparent to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Floating Info Cards */}
                        {data.floatingCards.map((card, index) => {
                            const Icon = iconMap[card.icon];
                            const positions = [
                                "top-[15%] -left-[10%] lg:-left-[12%]",
                                "top-[8%] -right-[8%] lg:-right-[10%]",
                                "bottom-[30%] -right-[12%] lg:-right-[15%]",
                                "bottom-[8%] left-0 lg:-left-[5%] min-w-[200px] p-3"
                            ];
                            const delays = [0.4, 0.6, 0.8, 1];

                            return (
                                <FloatingCard key={index} className={positions[index]} delay={delays[index]}>
                                    <div className={`${bgMap[card.color]} p-1.5 md:p-2.5 rounded-lg ${card.color === 'blue' ? '' : colorMap[card.color]}`}>
                                        <Icon size={index === 3 ? 20 : 18} className={card.color === 'blue' ? 'text-white' : ''} />
                                    </div>
                                    <div>
                                        {card.title ? (
                                            <>
                                                <p className="text-xs font-bold text-slate-900">{card.title}</p>
                                                <p className="text-[9px] text-slate-500 font-medium tracking-wide">{card.subtitle}</p>
                                            </>
                                        ) : (
                                            <p className="text-[10px] font-bold text-slate-800">{card.text}</p>
                                        )}
                                    </div>
                                </FloatingCard>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
