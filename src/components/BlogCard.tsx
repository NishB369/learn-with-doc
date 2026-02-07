"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, User } from "lucide-react";

interface BlogCardProps {
    blog: {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        date: string;
        readTime: string;
        image?: string;
        tags: string[];
    };
    index: number;
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop";

export default function BlogCard({ blog, index }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
        >
            {/* Image Container */}
            <Link href={`/blogs/${blog.id}`} className="relative h-56 w-full overflow-hidden">
                <Image
                    src={blog.image || PLACEHOLDER_IMAGE}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-sky-50 text-primary-blue text-[10px] font-bold uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>

                <Link href={`/blogs/${blog.id}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary-blue transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                </p>

                {/* Footer Info */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <User size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{blog.author}</span>
                            <span className="text-[10px] text-slate-400">{blog.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <Clock size={12} />
                        <span>{blog.readTime}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
