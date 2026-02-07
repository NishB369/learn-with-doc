"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
    const params = useParams();
    const { blogid } = params;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl w-full"
            >
                <div className="mb-8">
                    <a href="/" className="text-zinc-500 hover:text-white transition-colors">← Back Home</a>
                </div>

                <article>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-6xl font-bold mb-6 capitalize">{blogid?.toString().replace(/-/g, ' ')}</h1>
                        <div className="flex gap-4 text-zinc-500 mb-12">
                            <span>January 23, 2026</span>
                            <span>•</span>
                            <span>5 min read</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="prose prose-invert prose-zinc"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-zinc-300 text-xl leading-relaxed mb-6">
                            This is a dynamic blog post for <span className="text-white font-medium">{blogid}</span>.
                            In this article, we explore the intricacies of modern web development and how Framer Motion
                            elevates the user experience.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </motion.div>
                </article>
            </motion.div>
        </main>
    );
}
