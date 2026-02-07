"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Shield, Users } from "lucide-react";

// Icon mapping
const iconMap: { [key: string]: any } = {
    Heart,
    Zap,
    Shield,
    Users
};

interface CoreValuesProps {
    data: {
        icon: string;
        title: string;
        description: string;
    }[];
}

export default function CoreValues({ data }: CoreValuesProps) {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 md:px-20 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Our Core Values</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        The principles that guide every course we create and every student we support.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.map((value, index) => {
                        const Icon = iconMap[value.icon] || Heart;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 group"
                            >
                                <div className="bg-primary-blue/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-primary-blue group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
