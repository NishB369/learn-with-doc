
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if user has scrolled 33% of the page
            const scrollPercentage =
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercentage > 33) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                                Ready to learn?
                            </p>
                            <p className="font-bold text-slate-900 leading-tight text-xs md:text-sm">
                                Upgrade your clinical skills today.
                            </p>
                        </div>
                        <Link
                            href="/courses"
                            className="shrink-0 bg-primary-blue text-white px-3 py-2 rounded-lg font-bold text-xs hover:bg-sky-600 transition-colors flex items-center gap-1.5 shadow-lg shadow-sky-200"
                        >
                            Enroll Now
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
