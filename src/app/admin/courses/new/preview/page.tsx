"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, PlayCircle, CheckCircle, ShieldCheck, Award } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

// Redefine interfaces locally since they aren't exported shared types yet
interface Lesson {
    title: string;
}

interface Module {
    title: string;
    lessons: string[];
}

interface Instructor {
    name: string;
    role: string;
    bio: string;
    image: string | null;
}

interface CoursePreviewData {
    title: string;
    description: string;
    longDescription: string;
    price: string;
    duration: string;
    badge: string;
    features: string[];
    curriculum: Module[];
    instructor: Instructor;
    heroImage: string | null;
}

export default function CoursePreviewPage() {
    const [data, setData] = useState<CoursePreviewData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Read from localStorage
        const stored = localStorage.getItem("course_preview_data");
        if (stored) {
            setData(JSON.parse(stored));
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-blue rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Loading Preview...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-500">No preview data found. Please go back and add some content.</p>
            </div>
        );
    }

    // Default values if fields are empty
    const {
        title = "Untitled Course",
        description = "No short description provided.",
        longDescription = "No detailed description provided.",
        price = "0",
        duration = "0h 0m",
        badge,
        instructor,
        features = [],
        curriculum = [],
        heroImage
    } = data;

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Preview Banner - Fixed Top */}
            <div className="fixed top-0 left-0 right-0 h-10 bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold border-b border-amber-200 z-[100]">
                PREVIEW MODE - This content is not published yet.
            </div>

            {/* Navbar pushed down by 40px (h-10) */}
            <Navbar variant="dark" className="top-10" />

            {/* Dark Hero Section - Added padding top to account for banner + navbar (32 + 10 ~ 40) */}
            <section className="pt-40 pb-16 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-blue/10" />
                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                                <span className="hover:text-white transition-colors cursor-pointer">Courses</span>
                                <span>/</span>
                                <span className="text-primary-blue">{title}</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{title}</h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">{description}</p>

                            <div className="flex flex-wrap gap-6 text-sm font-bold">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star size={18} fill="currentColor" />
                                    <span>0.0 (0 reviews)</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Users size={18} />
                                    <span>0 Students</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock size={18} />
                                    <span>{duration || "Duration N/A"}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <span className="text-slate-400 text-sm">Created by</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden relative">
                                        {instructor.image ? (
                                            <Image src={instructor.image} alt={instructor.name || "Instructor"} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">?</div>
                                        )}
                                    </div>
                                    <span className="font-bold text-sky-400 underline decoration-sky-400/30 underline-offset-4">{instructor.name || "Instructor Name"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content & Sidebar Layout */}
            <div className="container mx-auto px-6 md:px-20 max-w-7xl py-12">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Overview */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Course</h2>
                            <p className="text-slate-600 leading-loose text-lg mb-8 whitespace-pre-wrap">
                                {longDescription}
                            </p>

                            <h3 className="text-lg font-bold text-slate-900 mb-4">What you'll learn</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((feature, i) => (
                                    feature && (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                                            <span className="text-slate-700">{feature}</span>
                                        </div>
                                    )
                                ))}
                                {features.length === 0 && <span className="text-slate-400 italic">No features listed.</span>}
                            </div>
                        </div>

                        {/* Curriculum */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Curriculum</h2>
                            <div className="space-y-4">
                                {curriculum.map((module, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                            <h3 className="font-bold text-slate-800">{module.title || `Module ${i + 1}`}</h3>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{module.lessons.length} Lessons</span>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {module.lessons.map((lesson, j) => (
                                                lesson && (
                                                    <div key={j} className="px-6 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                                                        <PlayCircle size={16} className="text-slate-400" />
                                                        <span className="text-slate-600 text-sm">{lesson}</span>
                                                    </div>
                                                )
                                            ))}
                                            {module.lessons.length === 0 && (
                                                <div className="px-6 py-4 text-slate-400 italic text-sm">No lessons available yet.</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {curriculum.length === 0 && <span className="text-slate-400 italic">No curriculum modules added.</span>}
                            </div>
                        </div>

                        {/* Instructor */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Instructor</h2>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-24 h-24 rounded-full bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                                    {instructor.image ? (
                                        <Image src={instructor.image} alt={instructor.name || "Instructor"} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <Users size={32} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{instructor.name || "Instructor Name"}</h3>
                                    <p className="text-primary-blue font-medium mb-4">{instructor.role || "Role"}</p>
                                    <p className="text-slate-600 leading-relaxed max-w-lg mb-4 whitespace-pre-wrap">
                                        {instructor.bio || "No biography provided."}
                                    </p>
                                    <div className="flex gap-6 text-sm font-bold text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Award size={16} />
                                            <span>12 Courses</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>1.2k Students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar (4 cols) - Sticky */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">

                            {/* Purchase Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 shadow-sm border border-slate-100 bg-slate-100">
                                        {heroImage ? (
                                            <Image src={heroImage} alt={title} fill className="object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium">No Image</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                                                <PlayCircle size={24} className="text-primary-blueml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-3xl font-black text-slate-900">${price || "0"}</span>
                                        {badge && (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wider">
                                                {badge}
                                            </span>
                                        )}
                                    </div>

                                    <button className="w-full bg-primary-blue hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all mb-4">
                                        Enroll Now
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mb-6">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 pt-6 border-t border-slate-100 text-sm">
                                        <h4 className="font-bold text-slate-900">This course includes:</h4>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <PlayCircle size={16} className="text-slate-400" />
                                            <span>{duration || "0h 0m"} on-demand video</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <ShieldCheck size={16} className="text-slate-400" />
                                            <span>Full lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Award size={16} className="text-slate-400" />
                                            <span>Certificate of completion</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
