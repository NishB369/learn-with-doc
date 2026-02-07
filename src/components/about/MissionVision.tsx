"use client";

import { motion } from "framer-motion";

interface MissionVisionProps {
    data: {
        title: string;
        content: string;
        stats: { label: string; value: string }[];
    };
}

export default function MissionVision({ data }: MissionVisionProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-20">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                            {data.title}
                        </h2>
                        <div className="h-1.5 w-20 bg-primary-blue mt-6 rounded-full" />
                    </motion.div>

                    {/* Content */}
                    <div className="lg:w-2/3">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-12"
                        >
                            {data.content}
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
                                >
                                    <h3 className="text-3xl font-black text-primary-blue mb-2">{stat.value}</h3>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
