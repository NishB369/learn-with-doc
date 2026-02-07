"use client";

import { motion } from "framer-motion";

interface AboutStatsProps {
    data: {
        value: string;
        label: string;
    }[];
}

export default function AboutStats({ data }: AboutStatsProps) {
    return (
        <section className="py-20 bg-primary-blue text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light" />

            {/* Decorative Background Circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 md:px-20 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center divide-x-0 md:divide-x divide-white/20">
                    {data.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4"
                        >
                            <h3 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">
                                {stat.value}
                            </h3>
                            <p className="text-blue-100 font-bold uppercase tracking-wider text-sm md:text-base">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
