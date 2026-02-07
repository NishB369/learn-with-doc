"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BlogSidebarCTA() {
    return (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue rounded-full blur-[60px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full blur-[50px] opacity-20" />

            <div className="relative z-10 flex flex-col items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                    <Sparkles className="text-primary-blue w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold mb-3 leading-tight">
                    Upgrade Your Medical Knowledge
                </h3>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Join thousands of professionals mastering clinical skills with our expert-led courses.
                </p>

                <Link
                    href="/#featured-courses"
                    className="w-full bg-primary-blue hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    Explore Courses
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
}
