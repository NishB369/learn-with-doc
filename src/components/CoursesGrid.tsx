"use client";

import { useState, useEffect, Suspense } from "react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CourseCard from "./CourseCard";

interface CoursesGridProps {
    courses: {
        id: string;
        title: string;
        description: string;
        duration: string;
        students: string;
        price: string;
        image: string;
        badge?: string;
        tags?: string[];
    }[];
}

function CoursesGridContent({ courses }: CoursesGridProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category") || "All";

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

    // Filter Logic
    const filteredCourses = courses.filter((course) => {
        const matchesCategory = category === "All" || course.tags?.includes(category);

        if (!query) return matchesCategory;

        const searchContent = (
            course.title +
            course.description +
            (course.tags?.join(" ") || "")
        ).toLowerCase();

        return matchesCategory && searchContent.includes(query);
    });

    // Reset to page 1 if query, category, or itemsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, query, category]);

    // Calculate Slice
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

    // Handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Optional: Scroll to top of grid
            document.getElementById("course-grid-top")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (filteredCourses.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchX size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
                <p className="text-slate-500">
                    We couldn't find any courses matching "{query}". Try different keywords.
                </p>
            </div>
        );
    }

    return (
        <div id="course-grid-top" className="scroll-mt-32">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">
                    {query ? `Search Results (${filteredCourses.length})` :
                        (currentPage === 1 ? "All Courses" : `Page ${currentPage} of ${totalPages}`)
                    }
                </h3>
                <div className="h-px flex-grow bg-slate-200 ml-6"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        description={course.description}
                        duration={course.duration}
                        students={course.students}
                        price={course.price}
                        image={course.image}
                        badge={course.badge}
                    />
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

export default function CoursesGrid(props: CoursesGridProps) {
    return (
        <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading courses...</div>}>
            <CoursesGridContent {...props} />
        </Suspense>
    );
}
