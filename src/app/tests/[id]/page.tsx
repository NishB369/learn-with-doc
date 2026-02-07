
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Clock, HelpCircle, PlayCircle, CheckCircle, ShieldCheck, Award, BarChart, ArrowRight, Users } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import testsData from "@/src/data/testsData.json";

interface TestPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: TestPageProps) {
    const { id } = await params;
    const test = testsData.find((t) => t.id === id);
    if (!test) return { title: "Test Not Found" };
    return {
        title: `${test.title} | Learn with Doc`,
        description: test.description,
    };
}

export async function generateStaticParams() {
    return testsData.map((test) => ({
        id: test.id,
    }));
}

export default async function TestPage({ params }: TestPageProps) {
    const { id } = await params;
    const test = testsData.find((t) => t.id === id);

    if (!test) notFound();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Navbar variant="dark" />

            {/* Dark Hero Section */}
            <section className="pt-32 pb-16 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-blue/10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                                <Link href="/tests" className="hover:text-white transition-colors">Tests</Link>
                                <span>/</span>
                                <span className="text-primary-blue">{test.title}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {test.category}
                                </span>
                                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {test.difficulty}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{test.title}</h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">{test.description}</p>

                            <div className="flex flex-wrap gap-6 text-sm font-bold">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star size={18} fill="currentColor" />
                                    <span>{test.rating} ({test.reviewsCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={18} />
                                    <span>{test.attempts.toLocaleString()} Attempts</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock size={18} />
                                    <span>{test.duration}</span>
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
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Test</h2>
                            <p className="text-slate-600 leading-loose text-lg mb-8">
                                {test.longDescription || test.description}
                            </p>

                            <h3 className="text-lg font-bold text-slate-900 mb-4">What's Included</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {test.features?.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                                    <span className="text-slate-700">Detailed Performance Report</span>
                                </div>
                            </div>
                        </div>

                        {/* Curriculum / Syllabus */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Test Syllabus</h2>
                            <div className="space-y-4">
                                {test.curriculum?.map((module, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                            <h3 className="font-bold text-slate-800">{module.title}</h3>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{module.lessons.length} Topics</span>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {module.lessons.map((lesson, j) => (
                                                <div key={j} className="px-6 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                                                    <HelpCircle size={16} className="text-slate-400" />
                                                    <span className="text-slate-600 text-sm">{lesson}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructor / Author */}
                        {test.instructor && (
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Test Author</h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-24 h-24 rounded-full bg-slate-100 relative overflow-hidden shrink-0">
                                        <Image src={test.instructor.image} alt={test.instructor.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{test.instructor.name}</h3>
                                        <p className="text-primary-blue font-medium mb-4">{test.instructor.role}</p>
                                        <p className="text-slate-600 leading-relaxed max-w-lg mb-4">
                                            {test.instructor.bio}
                                        </p>
                                        <div className="flex gap-6 text-sm font-bold text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Award size={16} />
                                                <span>{test.instructor.courses} Resources</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users size={16} />
                                                <span>{test.instructor.students} Students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Sidebar (4 cols) - Sticky */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">

                            {/* Purchase Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Price</span>
                                </div>
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-4xl font-black text-slate-900">
                                        {test.price === "Free" ? "Free" : `$${test.price}`}
                                    </span>
                                </div>

                                <button className="w-full bg-primary-blue hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all mb-3 flex items-center justify-center gap-2 cursor-pointer">
                                    <span>Start Test Now</span>
                                    <ArrowRight size={18} strokeWidth={3} />
                                </button>

                                <p className="text-center text-xs text-slate-400 mb-6">Instant Access • Secure Payment</p>

                                <div className="space-y-4 pt-6 border-t border-slate-100 text-sm">
                                    <h4 className="font-bold text-slate-900">This test includes:</h4>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <HelpCircle size={16} className="text-primary-blue" />
                                        <span>{test.questionsCount} Clinical Questions</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <Clock size={16} className="text-primary-blue" />
                                        <span>{test.duration} Time Limit</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <BarChart size={16} className="text-primary-blue" />
                                        <span>Difficulty: {test.difficulty}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <ShieldCheck size={16} className="text-primary-blue" />
                                        <span>Full detailed explanations</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-2xl p-6 text-center">
                                <p className="text-slate-300 text-sm mb-3">Need help choosing?</p>
                                <button className="text-white font-bold hover:text-primary-blue transition-colors cursor-pointer">
                                    Contact Support
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
