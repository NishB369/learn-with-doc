
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, BookOpen, PenTool } from "lucide-react";
import Link from "next/link";

interface MarketingPopupProps {
    variant: "split" | "tests" | "courses";
}

export default function MarketingPopup({ variant }: MarketingPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (hasOpened) return;

            const scrollPercentage =
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercentage > 25) {
                setIsOpen(true);
                setHasOpened(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasOpened]);

    const closePopup = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden"
                    >
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-all z-20 backdrop-blur-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* Variant 1: Layout Split (About Page) */}
                        {variant === "split" && (
                            <div className="flex flex-col md:flex-row h-full md:min-h-[400px]">
                                {/* Left Side - Educational Context */}
                                <div className="w-full md:w-1/3 bg-slate-900 p-8 flex flex-col justify-center relative overflow-hidden text-white">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5))]" />
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                                            <BookOpen size={24} className="text-sky-400" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 leading-tight">
                                            Choose Your <span className="text-sky-400">Path</span>
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Whether you want to learn new concepts or test your existing knowledge, we have the right tools for you.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side - Selection */}
                                <div className="w-full md:w-2/3 p-8 md:p-10 flex flex-col justify-center bg-white">
                                    <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        What would you like to do?
                                    </h4>

                                    <div className="grid gap-4">
                                        <Link
                                            href="/courses"
                                            className="group relative flex items-center gap-5 p-5 rounded-2xl border-2 border-slate-100 hover:border-primary-blue/30 hover:shadow-xl hover:shadow-sky-100/50 transition-all bg-white"
                                            onClick={closePopup}
                                        >
                                            <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-primary-blue group-hover:scale-110 transition-transform duration-300">
                                                <BookOpen size={26} />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-primary-blue transition-colors">Start Learning</h5>
                                                <p className="text-slate-500 text-xs font-medium">Browse our expert-led course catalog</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-blue group-hover:text-white transition-all">
                                                <ArrowRight size={16} />
                                            </div>
                                        </Link>

                                        <Link
                                            href="/tests"
                                            className="group relative flex items-center gap-5 p-5 rounded-2xl border-2 border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all bg-white"
                                            onClick={closePopup}
                                        >
                                            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                                <PenTool size={26} />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">Take a Test</h5>
                                                <p className="text-slate-500 text-xs font-medium">Evaluate your clinical knowledge</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                                <ArrowRight size={16} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Variant 2: Market Tests (Courses Page) */}
                        {variant === "tests" && (
                            <div className="flex flex-col md:flex-row md:min-h-[350px]">
                                <div className="bg-slate-900 p-10 text-white md:w-2/5 flex flex-col justify-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-blue/30 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-6">
                                            <PenTool size={32} className="text-sky-400" />
                                        </div>
                                        <h3 className="text-2xl font-black leading-tight mb-2">Test Your Skills</h3>
                                        <p className="text-slate-400 text-sm">Don't just learn. Verify your knowledge.</p>
                                    </div>
                                </div>
                                <div className="p-10 md:w-3/5 flex flex-col justify-center">
                                    <h4 className="font-bold text-slate-900 text-2xl mb-3">
                                        Ready to benchmark yourself?
                                    </h4>
                                    <p className="text-slate-600 mb-8 leading-relaxed">
                                        Take our comprehensive clinical tests designed to simulate real-world scenarios and identify your knowledge gaps.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
                                        <Link
                                            href="/tests"
                                            className="flex items-center justify-center gap-2 bg-primary-blue text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200 w-full md:w-auto"
                                            onClick={closePopup}
                                        >
                                            Go to Tests
                                            <ArrowRight size={18} />
                                        </Link>
                                        <button
                                            onClick={closePopup}
                                            className="px-6 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors w-full md:w-auto"
                                        >
                                            Maybe Later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Variant 3: Market Courses (Tests Page) */}
                        {variant === "courses" && (
                            <div className="flex flex-col md:flex-row md:min-h-[350px]">
                                <div className="bg-gradient-to-br from-primary-blue to-sky-600 p-10 text-white md:w-2/5 flex flex-col justify-center relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-[50px] translate-y-1/4 -translate-x-1/4" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 shadow-inner">
                                            <BookOpen size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black leading-tight mb-2">Learn Deeper</h3>
                                        <p className="text-sky-100 text-sm">Fill the gaps in your knowledge.</p>
                                    </div>
                                </div>
                                <div className="p-10 md:w-3/5 flex flex-col justify-center">
                                    <h4 className="font-bold text-slate-900 text-2xl mb-3">
                                        Want to master this topic?
                                    </h4>
                                    <p className="text-slate-600 mb-8 leading-relaxed">
                                        Join our expert-led courses. We have deep-dive curriculums on every topic you are testing yourself on.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
                                        <Link
                                            href="/courses"
                                            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200 w-full md:w-auto"
                                            onClick={closePopup}
                                        >
                                            Explore Courses
                                            <ArrowRight size={18} />
                                        </Link>
                                        <button
                                            onClick={closePopup}
                                            className="px-6 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors w-full md:w-auto"
                                        >
                                            No, thanks
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
