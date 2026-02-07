
"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, FileText, Image as ImageIcon, Clock, Check, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// ... imports

export default function NewBlogPage() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [status, setStatus] = useState<"Draft" | "Published">("Draft");
    const [readTime, setReadTime] = useState("");
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    // --- Effect: Sync to LocalStorage for Preview ---
    useEffect(() => {
        const previewData = {
            title,
            tags,
            content,
            readTime,
            heroImage,
            status,
            author: "Admin User", // Mock author
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) // Current date
        };
        localStorage.setItem("blog_preview_data", JSON.stringify(previewData));
    }, [title, tags, content, readTime, heroImage, status]);

    // Simple Markdown to HTML Parser
    const parseMarkdown = (md: string) => {
        // ... existing parseMarkdown logic
        let html = md
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/__(.*)__/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/_(.*)_/gim, '<em>$1</em>')
            // Lists
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            // Paragraphs (double newline)
            .replace(/\n\n/gim, '<br/><br/>'); // Simple line break handling for now

        // Wrap lists in ul (very basic)
        // A robust parser is complex, this allows list items at least
        html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

        // Fix duplicate ULs
        html = html.replace(/<\/ul><ul>/gim, '');

        // Wrap remaining text in p if needed, or leave as simple text with breaks
        return html;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... existing handleFileUpload logic
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;

            // Calculate Read Time (Avg 200 wpm)
            const wordCount = text.split(/\s+/).length;
            const minutes = Math.ceil(wordCount / 200);
            setReadTime(`${minutes} min read`);

            // Parse Content
            const htmlContent = parseMarkdown(text);
            setContent(htmlContent);
        };
        reader.readAsText(file);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... existing handleImageUpload logic
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setHeroImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        // ... existing tag logic
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const [isSavingDraft, setIsSavingDraft] = useState(false);

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFileName("");
        setContent("");
        setReadTime("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSave = (type: "Draft" | "Published") => {
        if (type === "Draft") {
            setIsSavingDraft(true);
            setStatus("Draft");
            // Simulate Draft Save
            setTimeout(() => {
                setIsSavingDraft(false);
                alert("Draft saved successfully!");
            }, 1000);
        } else {
            setIsSubmitting(true);
            setStatus("Published");
            // Simulate Publish
            setTimeout(() => {
                setIsSubmitting(false);
                alert("Blog post published successfully!");
            }, 2000);
        }
    };

    // Keep empty handleSubmit to satisfy form onSubmit, though buttons override it
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSave("Published");
    };

    return (
        <form onSubmit={handleSubmit} className="pb-20 relative">
            {/* Header / Actions */}
            <div className="flex items-center justify-between mb-8 z-50">
                <div>
                    <Link href="/admin/blogs" className="text-sm text-slate-500 hover:text-primary-blue mb-1 inline-flex items-center gap-1">
                        &larr; Back to Blogs
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blogs/new/preview"
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
                        ) : (
                            "Save as Draft"
                        )}
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSave("Published");
                        }}
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
                                Publish Post
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Post Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., The Future of Digital Health"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all text-lg font-medium placeholder:text-slate-300"
                            required
                        />
                    </div>

                    {/* Content / File Upload */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                            <span>Content Source (Markdown)</span>
                        </label>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".md,.txt"
                            className="hidden"
                        />

                        {!fileName ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary-blue hover:bg-slate-50 transition-all group"
                            >
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary-blue group-hover:bg-blue-50 transition-colors mb-4">
                                    <FileText size={24} />
                                </div>
                                <p className="text-slate-600 font-medium mb-1">Click to upload Markdown file</p>
                                <p className="text-slate-400 text-xs text-center max-w-[200px]">
                                    Upload a .md file. We'll automatically parse it and calculate read time.
                                </p>
                            </div>
                        ) : (
                            <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-slate-50 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-primary-blue shadow-sm">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{fileName}</p>
                                        <p className="text-xs text-slate-500">Markdown content parsed</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-xs font-medium text-slate-500 hover:text-primary-blue px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        Replace
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove file"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {content && (
                            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Preview</h4>
                                <div className="max-w-none text-slate-600 max-h-96 overflow-y-auto pr-4
                                    [&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-slate-900 [&_h1]:mb-6
                                    [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-primary-blue [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:leading-tight
                                    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:pl-4 [&_h3]:border-l-4 [&_h3]:border-primary-blue/30
                                    [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4
                                    [&_a]:text-primary-blue [&_a]:font-bold [&_a]:no-underline hover:[&_a]:underline
                                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ul]:space-y-2
                                    [&_li]:text-sm [&_li]:text-slate-600 [&_li]:pl-1 [&_li::marker]:text-primary-blue [&_li::marker]:font-bold
                                    [&_strong]:text-slate-900 [&_strong]:font-black
                                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary-blue [&_blockquote]:bg-slate-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:text-slate-700 [&_blockquote]:italic [&_blockquote]:mb-6
                                    [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-6 [&_img]:w-full"
                                >
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    {/* Hero Image */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-4">Hero Image</label>
                        <div
                            onClick={() => imageInputRef.current?.click()}
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
                                ref={imageInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Change Image</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tags / Categories</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag) => (
                                    <span key={tag} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 group">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="text-slate-400 group-hover:text-red-500">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Add tag and press Enter"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary-blue outline-none"
                            />
                        </div>

                        {/* Read Time */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Read Time</label>
                            <div className="relative">
                                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={readTime}
                                    readOnly // Calculated automatically
                                    placeholder="Auto-calculated from content"
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-sm cursor-not-allowed"
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Calculated based on word count (200 wpm).</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
