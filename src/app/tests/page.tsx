
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import TestCard from "@/src/components/TestCard";
import TestsFilter from "@/src/components/TestsFilter";
import testsData from "@/src/data/testsData.json";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import MarketingPopup from "@/src/components/MarketingPopup";

export default function TestsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Extract unique categories
    const categories = Array.from(new Set(testsData.map(test => test.category)));

    // Filter Logic
    const filteredTests = testsData.filter(test => {
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || test.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === "All" || test.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Handle Responsive Page Size
    useEffect(() => {
        const handleResize = () => {
            // 9 items per page for desktop (3 rows of 3)
            // 4 items for mobile (4 rows of 1)
            if (window.innerWidth < 768) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(6);
            }
        };
        handleResize(); // Initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Reset pagination on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedDifficulty, itemsPerPage]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTests = filteredTests.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            document.getElementById("tests-grid-top")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Navbar variant="dark" />

            {/* Header */}
            <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight-custom leading-tight">
                        Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-primary-blue">Tests</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Assess your knowledge with our comprehensive question banks and simulations.
                    </p>

                    {/* Filters embedded in Hero */}
                    <TestsFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedDifficulty={selectedDifficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </section>

            {/* Main Content */}
            <section id="tests-grid-top" className="py-12 md:py-20 scroll-mt-32">
                <div className="container mx-auto px-6 md:px-20 max-w-7xl">

                    {/* Results Count */}
                    <div className="mb-8 text-slate-500 font-medium">
                        {filteredTests.length > 0 ? (
                            <span>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTests.length)} of {filteredTests.length} tests</span>
                        ) : (
                            <span>No tests found</span>
                        )}
                    </div>

                    {/* Grid */}
                    {currentTests.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentTests.map((test) => (
                                    <TestCard key={test.id} test={test} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-16 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${currentPage === 1
                                            ? "border-slate-100 text-slate-300 cursor-not-allowed"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-blue hover:border-primary-blue"
                                            }`}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => goToPage(pageNum)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${pageNum === currentPage
                                                ? "bg-primary-blue text-white shadow-lg shadow-sky-200"
                                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${currentPage === totalPages
                                            ? "border-slate-100 text-slate-300 cursor-not-allowed"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-blue hover:border-primary-blue"
                                            }`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <SearchX size={24} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No tests found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    setSelectedDifficulty("All");
                                }}
                                className="mt-4 px-6 py-2 text-primary-blue font-semibold hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <MarketingPopup variant="courses" />
            <Footer />
        </main>
    );
}
