"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface JourneySectionProps {
    data: {
        year: string;
        title: string;
        description: string;
    }[];
}

export default function JourneySection({ data }: JourneySectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-20 max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm mb-3 block">
                        Our History
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">
                        The Journey So Far
                    </h2>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full overflow-hidden">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-primary-blue origin-top"
                        />
                    </div>

                    <div className="flex flex-col gap-12 md:gap-24">
                        {data.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex items-center gap-8 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>

            {/* Timeline Node */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 -translate-x-1/2 z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-4 h-4 bg-white border-4 border-primary-blue rounded-full shadow-lg"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.5, scale: 1.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-primary-blue/30 rounded-full"
                />
            </div>

            {/* Spacer for desktop layout alignment */}
            <div className="hidden md:block w-1/2" />

            {/* Content Card */}
            <div className="flex-1 pl-12 md:pl-0">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow ${isEven ? "md:text-left" : "md:text-right"}`}
                >
                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-sky-50 text-primary-blue text-xs font-bold rounded-full mb-3">
                            {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
