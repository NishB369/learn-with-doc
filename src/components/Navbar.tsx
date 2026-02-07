"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Tests", href: "/tests" },
    { name: "Blogs", href: "/blogs" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
];

interface NavbarProps {
    variant?: "light" | "dark";
    className?: string;
}

export default function Navbar({ variant = "light", className = "" }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine text color based on variant and scroll state
    // Light variant (default): Always dark text (on white bg)
    // Dark variant: White text when transparent (top), Dark text when scrolled (white bg)
    const isDarkText = variant === "light" || scrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2 md:py-4 glass-nav px-6 md:px-40" : "py-4 md:py-6 px-6 md:px-20"} ${className}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-primary-blue p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                        <Activity size={20} className="text-white" />
                    </div>
                    <span className={`text-2xl font-bold tracking-tight-custom transition-colors ${isDarkText ? "text-slate-900" : "text-white"
                        }`}>
                        Medicare
                    </span>
                </Link>

                {/* Center: Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors cursor-pointer relative group ${isDarkText ? "text-slate-600 hover:text-primary-blue" : "text-slate-200 hover:text-white"
                                }`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* Right: CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#0284c7",
                            boxShadow: "0 0 25px rgba(14, 165, 233, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 bg-primary-blue text-white px-8 py-3 rounded-full text-sm font-bold transition-all cursor-pointer shadow-lg border-neon animate-glow-neon"
                    >
                        <span>Enroll Now</span>
                        <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`md:hidden p-2 cursor-pointer transition-colors ${isDarkText ? "text-slate-900" : "text-white"
                            }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-semibold text-slate-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="flex items-center justify-center gap-2 bg-primary-blue text-white w-full py-4 rounded-xl font-bold mt-4 shadow-lg border-neon animate-glow-neon cursor-pointer">
                                <span>Enroll Now</span>
                                <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
