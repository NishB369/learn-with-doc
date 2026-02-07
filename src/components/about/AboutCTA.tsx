"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Assuming Next.js Link

interface AboutCTAProps {
    data: {
        title: string;
        subtitle: string;
        primaryBtn: string;
        secondaryBtn: string;
    };
}

export default function AboutCTA({ data }: AboutCTAProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-20">
                <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">

                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-blue/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
                        >
                            {data.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium"
                        >
                            {data.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <button className="bg-primary-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/30 flex items-center justify-center gap-2">
                                {data.primaryBtn}
                                <ArrowRight size={20} />
                            </button>
                            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
                                {data.secondaryBtn}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
