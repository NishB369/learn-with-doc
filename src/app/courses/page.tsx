import { Suspense } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CoursesGrid from "@/src/components/CoursesGrid";
import SearchInput from "@/src/components/SearchInput";
import CategoryTabs from "@/src/components/CategoryTabs";
import MarketingPopup from "@/src/components/MarketingPopup";
import courseData from "@/src/data/courseData.json";

export const metadata = {
    title: "Browse Medical Courses | Learn with Doc",
    description: "Explore our catalog of expert-led medical courses designed for healthcare professionals.",
};

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar variant="dark" />

            {/* Dark Header / Hero */}
            <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight-custom leading-tight">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-primary-blue">Courses</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Upgrade your clinical skills with curriculum designed by top medical professionals. Join thousands of learners worldwide.
                    </p>

                    {/* Search Bar */}
                    <Suspense fallback={<div className="max-w-xl mx-auto h-14 bg-white/10 rounded-full animate-pulse" />}>
                        <SearchInput />
                        <CategoryTabs categories={["Diagnostics", "Emergency", "Surgery"]} />
                    </Suspense>
                </div>
            </section>

            {/* Course Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                    <CoursesGrid courses={courseData} />
                </div>
            </section>



            <MarketingPopup variant="tests" />
            <Footer />
        </main>
    );
}
