"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface FounderSectionProps {
    data: {
        title: string;
        subtitle: string;
        description: string;
        quote: string;
    };
}

export default function FounderSection({ data }: FounderSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
                    >
                        <div className="relative w-full max-w-[320px] lg:max-w-none aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/instructor.png"
                                alt="Dr. Anderson"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                        </div>

                        {/* Decorative Elements - Hidden on mobile for cleaner look */}
                        <div className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl -z-10" />
                        <div className="hidden md:block absolute top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block"
                        >
                            {data.title}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-tight"
                        >
                            {data.subtitle}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 mb-6 md:mb-8 text-left"
                        >
                            <Quote className="text-primary-blue/20 absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12" />
                            <p className="relative z-10 text-slate-700 text-base md:text-lg italic leading-relaxed pt-2 pl-2">
                                "{data.quote}"
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-base md:text-lg text-slate-600 leading-relaxed font-medium"
                        >
                            {data.description}
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
}
