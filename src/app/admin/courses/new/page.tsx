"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Check,
    X,
    Plus,
    Image as ImageIcon,
    DollarSign,
    Clock,
    Award,
    Users,
    BookOpen,
    Trash2,
    GripVertical,
    ChevronDown,
    ChevronUp,
    Eye
} from "lucide-react";

// Types for our complex state
interface Module {
    id: string;
    title: string;
    lessons: string[];
}

interface Instructor {
    name: string;
    role: string;
    bio: string;
    image: string | null;
}

export default function NewCoursePage() {
    // --- State: Basic Info ---
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [badge, setBadge] = useState("");

    // --- State: Dynamic Lists ---
    const [features, setFeatures] = useState<string[]>([""]); // "What you'll learn"
    const [curriculum, setCurriculum] = useState<Module[]>([
        { id: "mod-1", title: "Introduction", lessons: [""] }
    ]);

    // --- State: Instructor ---
    const [instructor, setInstructor] = useState<Instructor>({
        name: "",
        role: "",
        bio: "",
        image: null
    });

    // --- State: Display/UI ---
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [status, setStatus] = useState<"Draft" | "Published">("Draft");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);

    // --- Refs ---
    const heroImageInputRef = useRef<HTMLInputElement>(null);
    const instructorImageInputRef = useRef<HTMLInputElement>(null);

    // --- Effect: Sync to LocalStorage for Preview ---
    useEffect(() => {
        const previewData = {
            title,
            description,
            longDescription,
            price,
            duration,
            badge,
            features,
            curriculum,
            instructor,
            heroImage,
            status
        };
        localStorage.setItem("course_preview_data", JSON.stringify(previewData));
    }, [title, description, longDescription, price, duration, badge, features, curriculum, instructor, heroImage, status]);

    // --- Handlers: Images ---
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setter(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    // --- Handlers: Features ---
    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };
    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

    // --- Handlers: Curriculum (Nested Builder) ---
    const addModule = () => {
        setCurriculum([
            ...curriculum,
            { id: `mod-${Date.now()}`, title: "", lessons: [""] }
        ]);
    };
    const removeModule = (index: number) => {
        setCurriculum(curriculum.filter((_, i) => i !== index));
    };
    const updateModuleTitle = (index: number, val: string) => {
        const newCurriculum = [...curriculum];
        newCurriculum[index].title = val;
        setCurriculum(newCurriculum);
    };

    // Lessons inside Modules
    const addLesson = (moduleIndex: number) => {
        const newCurriculum = [...curriculum];
        newCurriculum[moduleIndex].lessons.push("");
        setCurriculum(newCurriculum);
    };
    const removeLesson = (moduleIndex: number, lessonIndex: number) => {
        const newCurriculum = [...curriculum];
        newCurriculum[moduleIndex].lessons = newCurriculum[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
        setCurriculum(newCurriculum);
    };
    const updateLesson = (moduleIndex: number, lessonIndex: number, val: string) => {
        const newCurriculum = [...curriculum];
        newCurriculum[moduleIndex].lessons[lessonIndex] = val;
        setCurriculum(newCurriculum);
    };

    // --- Handlers: Instructor ---
    const updateInstructor = (field: keyof Instructor, value: string) => {
        setInstructor({ ...instructor, [field]: value });
    };

    // --- Handlers: Save/Submit ---
    const handleSave = (type: "Draft" | "Published") => {
        if (type === "Draft") {
            setIsSavingDraft(true);
            setStatus("Draft");
            setTimeout(() => {
                setIsSavingDraft(false);
                alert("Course draft saved successfully!");
            }, 1000);
        } else {
            setIsSubmitting(true);
            setStatus("Published");
            setTimeout(() => {
                setIsSubmitting(false);
                alert("Course published successfully!");
            }, 2000);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSave("Published");
    };

    return (
        <form onSubmit={handleSubmit} className="pb-20 relative">
            {/* Decorative Grid - Matching Blog New Page */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-100" />

            {/* Header / Actions */}
            <div className="flex items-center justify-between mb-8 z-50">
                <div>
                    <Link href="/admin/courses" className="text-sm text-slate-500 hover:text-primary-blue mb-1 inline-flex items-center gap-1">
                        &larr; Back to Courses
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Create New Course</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/courses/new/preview"
                        target="_blank"
                        className="px-4 py-2 rounded-lg font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <Eye size={18} />
                        Preview
                    </Link>
                    <button
                        type="button"
                        onClick={() => handleSave("Draft")}
                        disabled={isSavingDraft || isSubmitting}
                        className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none ${status === 'Draft'
                            ? 'bg-slate-200 text-slate-800'
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {isSavingDraft ? (
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                                Saving...
                            </span>
                        ) : "Save as Draft"}
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => { e.preventDefault(); handleSave("Published"); }}
                        disabled={isSavingDraft || isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-primary-blue text-white rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-sky-600 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Publishing...
                            </span>
                        ) : (
                            <>
                                <Check size={18} />
                                Publish Course
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* --- Left Column: Builder Content (2/3) --- */}
                <div className="xl:col-span-2 space-y-8">

                    {/* 1. Basic Course Info */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen size={20} className="text-primary-blue" />
                            Course Details
                        </h2>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Advanced Emergency Medicine"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all font-medium text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A brief summary for the course cards..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">About This Course (Long Description)</label>
                            <textarea
                                value={longDescription}
                                onChange={(e) => setLongDescription(e.target.value)}
                                placeholder="Detailed overview, objectives, and prerequisites..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* 2. What You'll Learn (Features Builder) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Award size={20} className="text-primary-blue" />
                                What you'll learn
                            </h2>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-sm font-bold text-primary-blue hover:underline flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        <div className="space-y-3">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-6 flex justify-center text-slate-400">
                                        <Check size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => updateFeature(idx, e.target.value)}
                                        placeholder={`Learning outcome #${idx + 1}`}
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all text-sm"
                                    />
                                    {features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(idx)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Curriculum Builder */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Users size={20} className="text-primary-blue" />
                                Curriculum Builder
                            </h2>
                            <button
                                type="button"
                                onClick={addModule}
                                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                <Plus size={16} /> Add Module
                            </button>
                        </div>

                        <div className="space-y-6">
                            {curriculum.map((module, mIdx) => (
                                <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                                    {/* Module Header */}
                                    <div className="bg-slate-100 p-4 flex items-center gap-4 border-b border-slate-200">
                                        <span className="bg-white w-8 h-8 rounded flex items-center justify-center text-slate-400 font-bold border border-slate-200 shadow-sm text-sm">
                                            {mIdx + 1}
                                        </span>
                                        <input
                                            type="text"
                                            value={module.title}
                                            onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                                            placeholder="Module Title (e.g. Introduction to Anatomy)"
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 font-bold placeholder:text-slate-400 text-lg p-0"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeModule(mIdx)}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                            title="Remove Module"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Lessons List */}
                                    <div className="p-4 space-y-3">
                                        {module.lessons.map((lesson, lIdx) => (
                                            <div key={lIdx} className="flex items-center gap-3 pl-4 border-l-2 border-slate-200">
                                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                                <input
                                                    type="text"
                                                    value={lesson}
                                                    onChange={(e) => updateLesson(mIdx, lIdx, e.target.value)}
                                                    placeholder="Lesson Title"
                                                    className="flex-1 px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 outline-none text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeLesson(mIdx, lIdx)}
                                                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addLesson(mIdx)}
                                            className="ml-5 text-xs font-bold text-primary-blue hover:text-sky-600 flex items-center gap-1 mt-2 mb-1"
                                        >
                                            <Plus size={14} /> Add Lesson
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Sidebar (1/3) --- */}
                <div className="space-y-6">

                    {/* Hero Image */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-4">Hero Image</label>
                        <div
                            onClick={() => heroImageInputRef.current?.click()}
                            className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 cursor-pointer border-2 border-transparent hover:border-primary-blue transition-all group"
                        >
                            {heroImage ? (
                                <Image src={heroImage} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                    <ImageIcon size={32} className="mb-2 opacity-50" />
                                    <span className="text-xs font-medium">Upload Cover</span>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={heroImageInputRef}
                                onChange={(e) => handleImageUpload(e, setHeroImage)}
                                accept="image/*"
                                className="hidden"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Change Image</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Metadata */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Metadata</h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Price ($)</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Duration</label>
                            <div className="relative">
                                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="e.g. 12h 30m"
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Badge (Optional)</label>
                            <div className="relative">
                                <Award size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={badge}
                                    onChange={(e) => setBadge(e.target.value)}
                                    placeholder="e.g. Bestseller"
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Instructor Info */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Instructor</h3>

                        <div className="flex items-center gap-4 mb-2">
                            <div
                                onClick={() => instructorImageInputRef.current?.click()}
                                className="w-16 h-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-primary-blue overflow-hidden relative"
                            >
                                {instructor.image ? (
                                    <Image src={instructor.image} alt="Instructor" fill className="object-cover" />
                                ) : (
                                    <Users size={20} className="text-slate-300" />
                                )}
                                <input
                                    type="file"
                                    ref={instructorImageInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, (val) => updateInstructor("image", val))}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-1">Photo helps build trust.</p>
                                <button
                                    type="button"
                                    onClick={() => instructorImageInputRef.current?.click()}
                                    className="text-xs font-bold text-primary-blue hover:underline"
                                >
                                    Upload Photo
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={instructor.name}
                                onChange={(e) => updateInstructor("name", e.target.value)}
                                placeholder="Instructor Name"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                            />
                            <input
                                type="text"
                                value={instructor.role}
                                onChange={(e) => updateInstructor("role", e.target.value)}
                                placeholder="Role (e.g. Senior Surgeon)"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                            />
                            <textarea
                                value={instructor.bio}
                                onChange={(e) => updateInstructor("bio", e.target.value)}
                                placeholder="Instructor Bio..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
