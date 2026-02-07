"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./BlogCard";

interface BlogsGridProps {
    blogs: {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        date: string;
        readTime: string;
        image?: string;
        tags: string[];
        content: string; // Included in source data
    }[];
}

export default function BlogsGrid({ blogs }: BlogsGridProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Default Desktop

    // Handle Responsive Page Size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(3);
            } else {
                setItemsPerPage(6);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Reset to page 1 if itemsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);

    // Calculate Slice
    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

    // Handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Optional: Scroll to top of grid
            document.getElementById("blog-grid-top")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="blog-grid-top" className="scroll-mt-32">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">
                    {currentPage === 1 ? "Recent Articles" : `Page ${currentPage} of ${totalPages}`}
                </h3>
                <div className="h-px flex-grow bg-slate-100 ml-6"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentBlogs.map((blog, index) => (
                    <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    {/* Prev Button */}
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === 1
                            ? "border-slate-100 text-slate-300 cursor-not-allowed"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-blue hover:border-primary-blue"
                            }`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${pageNum === currentPage
                                ? "bg-primary-blue text-white shadow-lg shadow-sky-200"
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === totalPages
                            ? "border-slate-100 text-slate-300 cursor-not-allowed"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-blue hover:border-primary-blue"
                            }`}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
