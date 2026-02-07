"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface InstructorProps {
    data: {
        tag: string;
        title: string;
        description: string;
        credentials: string[];
        buttonText: string;
        image: string;
    };
}

export default function Instructor({ data }: InstructorProps) {
    return (
        <section className="py-8 md:py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                <div className="relative rounded-[1rem] md:rounded-[3rem] bg-gradient-to-br from-sky-50 via-sky-100/40 to-white border border-sky-100/50 shadow-xl shadow-sky-50/50">

                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 md:px-16 py-8 lg:py-20">

                        {/* Content Side */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2 text-primary-blue font-bold text-xs uppercase tracking-widest mb-6"
                            >
                                <span className="w-1.5 h-1.5 bg-primary-blue rounded-full" />
                                {data.tag}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight-custom leading-[1.1]"
                            >
                                {data.title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed mb-8 max-w-xl leading-snug"
                            >
                                {data.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col gap-4 mb-12"
                            >
                                {data.credentials.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-primary-blue w-5 h-5 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 font-semibold text-sm md:text-base">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary-blue text-white px-8 py-3 rounded-full font-bold text-sm md:text-base flex items-center gap-3 shadow-lg shadow-sky-200 hover:bg-sky-600 transition-colors"
                            >
                                {data.buttonText}
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>

                        {/* Image Side - Standard Layout */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 w-full max-w-[400px]"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                                <Image
                                    src={data.image}
                                    alt="Dr. Academy"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
