"use client";

import { motion } from "framer-motion";

const posts = [
    { id: "getting-started", title: "Getting Started with Next.js", date: "Jan 20, 2026" },
    { id: "animation-tips", title: "5 Tips for Smooth Animations", date: "Jan 22, 2026" },
    { id: "state-management", title: "Modern State Management", date: "Jan 23, 2026" }
];

export default function BlogPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl w-full"
            >
                <h1 className="text-5xl font-bold mb-12">Blog</h1>

                <div className="space-y-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <a href={`/blog/${post.id}`} className="group">
                                <span className="text-zinc-500 text-sm">{post.date}</span>
                                <h2 className="text-2xl font-semibold group-hover:text-zinc-300 transition-colors">{post.title}</h2>
                                <div className="h-px bg-zinc-800 mt-4 group-hover:bg-zinc-700 transition-colors" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12">
                    <a href="/" className="text-zinc-500 hover:text-white underline underline-offset-4 transition-colors">Back Home</a>
                </div>
            </motion.div>
        </main>
    );
}
