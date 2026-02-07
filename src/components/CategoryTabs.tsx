
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface CategoryTabsProps {
    categories: string[];
}

export default function CategoryTabs({ categories }: CategoryTabsProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const selectedCategory = searchParams.get("category") || "All";

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        params.delete("page"); // Reset pagination
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button
                onClick={() => handleCategoryChange("All")}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${selectedCategory === "All"
                        ? "text-white"
                        : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                    }`}
            >
                {selectedCategory === "All" && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-blue rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10">All</span>
            </button>

            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${selectedCategory === category
                            ? "text-white"
                            : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                        }`}
                >
                    {selectedCategory === category && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary-blue rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
            ))}
        </div>
    );
}
