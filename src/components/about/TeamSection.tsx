"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamProps {
    data: {
        name: string;
        role: string;
        bio: string;
        image: string;
    }[];
}

export default function TeamSection({ data }: TeamProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        Meet Our Leadership
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A diverse team of medical experts, educators, and innovators dedicated to transforming healthcare education.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {data.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                            <p className="text-primary-blue font-medium text-sm mb-3">{member.role}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
