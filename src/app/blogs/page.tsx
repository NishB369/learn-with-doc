import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import BlogsGrid from "@/src/components/BlogsGrid";
import blogData from "@/src/data/blogData.json";

export const metadata = {
    title: "Medical Insights & News | Learn with Doc",
    description: "Stay updated with the latest trends in medicine, healthcare technology, and clinical practice.",
};

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop";

export default function BlogsPage() {
    // Separate Featured vs. Rest
    const featuredBlog = blogData[0];
    const otherBlogs = blogData.slice(1);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header / Hero Section */}
            <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-blue/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary-blue animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Medical Insights</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight-custom leading-[1.1]">
                        Latest News & <span className="text-primary-blue">Articles</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Expert perspectives on clinical practice, medical technology, and healthcare education.
                    </p>
                </div>
            </section>

            {/* Featured Blog Section */}
            {featuredBlog && (
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                        <div className="group relative grid lg:grid-cols-2 gap-6 lg:gap-12 items-center bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-4 md:p-0">
                            {/* Featured Image */}
                            <Link href={`/blogs/${featuredBlog.id}`} className="relative h-48 md:h-96 w-full overflow-hidden block rounded-2xl md:rounded-none md:rounded-l-3xl order-first">
                                <Image
                                    src={featuredBlog.image || PLACEHOLDER_IMAGE}
                                    alt={featuredBlog.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-primary-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Featured
                                </div>
                            </Link>

                            {/* Featured Content */}
                            <div className="flex flex-col justify-center md:p-12 md:pr-12">
                                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                                    {featuredBlog.tags.map((tag, i) => (
                                        <span key={i} className="text-primary-blue text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <Link href={`/blogs/${featuredBlog.id}`}>
                                    <h2 className="text-xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4 leading-tight group-hover:text-primary-blue transition-colors">
                                        {featuredBlog.title}
                                    </h2>
                                </Link>

                                <p className="text-slate-600 text-sm md:text-lg mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {featuredBlog.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <User size={16} className="md:w-[18px] md:h-[18px]" />
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm font-bold text-slate-900">{featuredBlog.author}</p>
                                            <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500">
                                                <span>{featuredBlog.date}</span>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    <span>{featuredBlog.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/blogs/${featuredBlog.id}`}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary-blue group-hover:text-white group-hover:border-primary-blue transition-all"
                                    >
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blogs Grid */}
            <section className="pb-16 md:pb-24 pt-4">
                <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                    <BlogsGrid blogs={otherBlogs} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
