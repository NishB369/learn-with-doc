import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Clock, Users, PlayCircle, CheckCircle, ShieldCheck, Award } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import courseData from "@/src/data/courseData.json";

interface CoursePageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: CoursePageProps) {
    const { id } = await params;
    const course = courseData.find((c) => c.id === id);
    if (!course) return { title: "Course Not Found" };
    return {
        title: `${course.title} | Learn with Doc`,
        description: course.description,
    };
}

export async function generateStaticParams() {
    return courseData.map((course) => ({
        id: course.id,
    }));
}

export default async function CoursePage({ params }: CoursePageProps) {
    const { id } = await params;
    const course = courseData.find((c) => c.id === id);

    if (!course) notFound();

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar variant="dark" />

            {/* Dark Hero Section */}
            <section className="pt-32 pb-16 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-blue/10" />
                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                                <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
                                <span>/</span>
                                <span className="text-primary-blue">{course.title}</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{course.title}</h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">{course.description}</p>

                            <div className="flex flex-wrap gap-6 text-sm font-bold">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star size={18} fill="currentColor" />
                                    <span>{course.rating} ({course.reviewsCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Users size={18} />
                                    <span>{course.students} Students</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock size={18} />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <span className="text-slate-400 text-sm">Created by</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden relative">
                                        <Image src={course.instructor.image} alt={course.instructor.name} fill className="object-cover" />
                                    </div>
                                    <span className="font-bold text-sky-400 underline decoration-sky-400/30 underline-offset-4">{course.instructor.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content & Sidebar Layout */}
            <div className="container mx-auto px-6 md:px-20 max-w-7xl py-12">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Overview */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Course</h2>
                            <p className="text-slate-600 leading-loose text-lg mb-8">
                                {course.longDescription}
                            </p>

                            <h3 className="text-lg font-bold text-slate-900 mb-4">What you'll learn</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {course.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Curriculum */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Curriculum</h2>
                            <div className="space-y-4">
                                {course.curriculum.map((module, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                            <h3 className="font-bold text-slate-800">{module.title}</h3>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{module.lessons.length} Lessons</span>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {module.lessons.map((lesson, j) => (
                                                <div key={j} className="px-6 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                                                    <PlayCircle size={16} className="text-slate-400" />
                                                    <span className="text-slate-600 text-sm">{lesson}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructor */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Instructor</h2>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-24 h-24 rounded-full bg-slate-100 relative overflow-hidden shrink-0">
                                    <Image src={course.instructor.image} alt={course.instructor.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{course.instructor.name}</h3>
                                    <p className="text-primary-blue font-medium mb-4">{course.instructor.role}</p>
                                    <p className="text-slate-600 leading-relaxed max-w-lg mb-4">
                                        {course.instructor.bio}
                                    </p>
                                    <div className="flex gap-6 text-sm font-bold text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Award size={16} />
                                            <span>{course.instructor.courses} Courses</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>{course.instructor.students} Students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar (4 cols) - Sticky */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">

                            {/* Purchase Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 shadow-sm border border-slate-100">
                                        <Image src={course.image} alt={course.title} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                                                <PlayCircle size={24} className="text-primary-blueml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-3xl font-black text-slate-900">${course.price}</span>
                                        {course.badge && (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wider">
                                                {course.badge}
                                            </span>
                                        )}
                                    </div>

                                    <button className="w-full bg-primary-blue hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all mb-4">
                                        Enroll Now
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mb-6">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 pt-6 border-t border-slate-100 text-sm">
                                        <h4 className="font-bold text-slate-900">This course includes:</h4>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <PlayCircle size={16} className="text-slate-400" />
                                            <span>{course.duration} on-demand video</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <ShieldCheck size={16} className="text-slate-400" />
                                            <span>Full lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Award size={16} className="text-slate-400" />
                                            <span>Certificate of completion</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
