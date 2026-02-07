"use client";

import { motion } from "framer-motion";
import { Building2, Activity, HeartPulse, Stethoscope, Landmark, ShieldCheck } from "lucide-react";

// Icon mapping
const iconMap: { [key: string]: any } = {
    Landmark,
    Activity,
    HeartPulse,
    Stethoscope,
    Building2,
    ShieldCheck
};

interface MarqueeProps {
    data: {
        text: string;
        institutions: {
            name: string;
            icon: string;
        }[];
    };
}

export default function Marquee({ data }: MarqueeProps) {
    const items = [...data.institutions, ...data.institutions, ...data.institutions];

    return (
        <div className="w-full bg-sky-50/50 py-8 md:py-12 overflow-hidden border-y border-sky-100">
            <div className="container mx-auto px-5 mb-8 md:mb-10 text-center">
                <p className="text-slate-400 font-medium text-xs md:text-sm tracking-wider uppercase">
                    {data.text}
                </p>
            </div>

            <div className="relative flex">
                <motion.div
                    animate={{
                        x: [0, -1035], // Adjust based on content width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                    className="flex flex-none items-center gap-16 md:gap-24 pr-24"
                >
                    {items.map((item, i) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-3 cursor-pointer shrink-0 group"
                            >
                                <Icon className="w-8 h-8 text-primary-blue group-hover:scale-110 transition-all duration-300" />
                                <span className="text-2xl font-bold text-slate-900 tracking-tight whitespace-nowrap">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
