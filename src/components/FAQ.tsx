"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQProps {
    data: {
        title: string;
        items: {
            question: string;
            answer: string;
        }[];
    };
}

export default function FAQ({ data }: FAQProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-12 md:py-20 lg:py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-10 right-[-5%] w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-10 left-[-5%] w-64 h-64 bg-sky-50 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-6 md:px-20 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest mb-4">
                        <HelpCircle size={14} />
                        FAQ
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900">{data.title}</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {data.items.map((item, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className={`rounded-xl border transition-all duration-300 ${isOpen
                                    ? "bg-white border-primary-blue/30 shadow-lg shadow-primary-blue/5"
                                    : "bg-white border-slate-200 hover:border-slate-300"
                                    }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left outline-none cursor-pointer"
                                >
                                    <span className={`text-lg font-bold transition-colors ${isOpen ? "text-primary-blue" : "text-slate-800"
                                        }`}>
                                        {item.question}
                                    </span>
                                    <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-primary-blue text-white" : "bg-slate-100 text-slate-500"
                                        }`}>
                                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
