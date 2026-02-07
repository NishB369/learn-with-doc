"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface HowItWorksProps {
    data: {
        tag: string;
        title: string;
        subtitle: string;
        steps: {
            id: string;
            title: string;
            content: string;
        }[];
    };
}

export default function HowItWorks({ data }: HowItWorksProps) {
    const [openId, setOpenId] = useState<string | null>("01");

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">

                    {/* Left Column: Heading (Sticky on Desktop) */}
                    <div className="lg:sticky h-fit">
                        <div className="flex items-center gap-2 text-primary-blue font-bold text-sm uppercase tracking-widest mb-6 px-1">
                            <span className="w-2 h-2 bg-primary-blue rounded-full" />
                            {data.tag}
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 md:mb-8 mb-4 tracking-tight-custom leading-[1.1]">
                            {data.title}
                        </h2>

                        <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                            {data.subtitle}
                        </p>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="flex flex-col gap-3">
                        {data.steps.map((step) => {
                            const isOpen = openId === step.id;

                            return (
                                <div
                                    key={step.id}
                                    className={`group rounded-2xl border transition-all duration-300 cursor-pointer ${isOpen
                                        ? "bg-sky-50/50 border-sky-100 shadow-sm"
                                        : "bg-white border-slate-200 hover:border-slate-300"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenId(isOpen ? null : step.id)}
                                        className="w-full flex items-center justify-between p-5 text-left outline-none cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4 md:gap-6">
                                            <span className={`text-xl font-bold tracking-tighter ${isOpen ? "text-primary-blue" : "text-slate-300 group-hover:text-slate-400 transition-all duration-300"
                                                }`}>
                                                {step.id}
                                            </span>
                                            <h3 className={`text-lg md:text-xl leading-tight font-black tracking-tight ${isOpen ? "text-slate-900" : "text-slate-800"
                                                }`}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-white text-primary-blue shadow-sm" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                                            }`}>
                                            {isOpen ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                                        </div>
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
                                                <div className="px-6 pb-8 md:px-8 md:pb-10 md:pl-20">
                                                    <p className={`text-sm md:text-base leading-relaxed font-medium text-slate-600 border-l-2 border-primary-blue/20 pl-4 py-1`}>
                                                        {step.content}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
