"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import BlogTOC from "@/src/components/BlogTOC";
import BlogSidebarCTA from "@/src/components/BlogSidebarCTA";
import BlogStickyCTA from "@/src/components/BlogStickyCTA";
import ScrollProgress from "@/src/components/ScrollProgress";

interface BlogPreviewData {
    title: string;
    description?: string; // Not in form explicitly, maybe reuse content excerpt?
    tags: string[];
    content: string;
    readTime: string;
    heroImage: string | null;
    author: string;
    date: string;
    status: "Draft" | "Published";
}

export default function BlogPreviewPage() {
    const [data, setData] = useState<BlogPreviewData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("blog_preview_data");
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

    // Default values
    const {
        title = "Untitled Post",
        tags = [],
        content = "",
        readTime = "0 min read",
        heroImage,
        author = "Admin User",
        date = "Today"
    } = data;

    const PLACEHOLDER_IMAGE = "/placeholder.png";

    return (
        <main className="min-h-screen bg-white">
            {/* Preview Banner - Fixed Top */}
            <div className="fixed top-0 left-0 right-0 h-10 bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold border-b border-amber-200 z-[100]">
                PREVIEW MODE - This content is not published yet.
            </div>

            {/* Navbar pushed down by 40px (h-10) */}
            <Navbar className="top-10" />
            <ScrollProgress />

            {/* Split Hero Section */}
            <section className="pt-40 pb-12 md:pt-48 md:pb-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left: Content */}
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-8">
                                <span className="cursor-not-allowed">
                                    <ArrowLeft size={16} className="inline mr-2" />
                                    Back to Articles
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-primary-blue text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                                {tags.length === 0 && (
                                    <span className="text-slate-400 text-xs italic">No tags added</span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight-custom">
                                {title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm font-medium border-t border-slate-200/60 pt-6 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
                                        <User size={16} />
                                    </div>
                                    <span className="text-slate-900 font-bold">{author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>{date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    <span>{readTime || "0 min read"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="relative aspect-[4/3] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 order-first lg:order-last bg-slate-200">
                            {heroImage ? (
                                <Image
                                    src={heroImage}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                                    No Cover Image
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* Main Content Layout (1/4 - 3/4 Split) */}
            <div className="container mx-auto px-6 md:px-20 max-w-7xl py-12 md:py-20 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left Sidebar (TOC & CTA) - 1/4 width (3 cols) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            {content ? <BlogTOC content={content} /> : <div className="text-slate-400 text-sm italic">Add headings to see Table of Contents</div>}
                            <BlogSidebarCTA />
                        </div>
                    </aside>

                    {/* Main Content - 3/4 width (9 cols) */}
                    <article className="lg:col-span-9">
                        {content ? (
                            <div
                                className="
                                    max-w-none focus:outline-none
                                    [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:text-primary-blue [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:leading-tight
                                    [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:pl-4 [&_h3]:border-l-4 [&_h3]:border-primary-blue/30
                                    [&_p]:text-lg [&_p]:text-slate-600 [&_p]:leading-loose [&_p]:mb-6
                                    [&_a]:text-primary-blue [&_a]:font-bold [&_a]:no-underline hover:[&_a]:underline
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_ul]:space-y-3
                                    [&_li]:text-lg [&_li]:text-slate-600 [&_li]:pl-2 [&_li::marker]:text-primary-blue [&_li::marker]:font-bold
                                    [&_strong]:text-slate-900 [&_strong]:font-black
                                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary-blue [&_blockquote]:bg-slate-50 [&_blockquote]:p-6 [&_blockquote]:rounded-r-xl [&_blockquote]:text-slate-700 [&_blockquote]:italic [&_blockquote]:mb-8
                                    [&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:my-10 [&_img]:w-full
                                "
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        ) : (
                            <div className="text-slate-400 italic text-lg text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                Content preview will appear here.
                            </div>
                        )}

                        {/* Mobile Sidebar Items (Show below content on mobile) */}
                        <div className="mt-12 lg:hidden space-y-8">
                            <BlogSidebarCTA />
                        </div>

                        {/* Share Footer */}
                        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <span className="font-bold text-slate-900 text-lg">Share this article:</span>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all">
                                    <Twitter size={20} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all">
                                    <Linkedin size={20} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all">
                                    <Facebook size={20} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            {/* Related/Next */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 md:px-20 max-w-4xl text-center">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Read Next</p>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">Continue Exploring</h3>
                    <div
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-8 py-3 rounded-full font-bold shadow-sm opacity-50 cursor-not-allowed"
                    >
                        View All Articles
                        <ArrowLeft className="rotate-180" size={18} />
                    </div>
                </div>
            </section>

            <BlogStickyCTA />
            <Footer />
        </main>
    );
}
