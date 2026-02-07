"use client";

import { useState } from "react";
import { Edit2, Trash2, Eye, Calendar, User } from "lucide-react";
import DeleteModal from "@/src/components/admin/DeleteModal";

// Mock Data
const initialBlogs = [
    {
        id: "1",
        title: "Understanding Modern Web Development",
        author: "Sarah Johnson",
        date: "Jan 15, 2024",
        status: "Published",
        views: 1240
    },
    {
        id: "2",
        title: "The Future of AI in Education",
        author: "Michael Chen",
        date: "Jan 12, 2024",
        status: "Draft",
        views: 0
    },
    {
        id: "3",
        title: "Top 10 Learning Strategies for 2024",
        author: "Sarah Johnson",
        date: "Jan 10, 2024",
        status: "Published",
        views: 856
    },
    {
        id: "4",
        title: "Mastering React Server Components",
        author: "Alex Turner",
        date: "Jan 05, 2024",
        status: "Review",
        views: 120
    }
];

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setBlogToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (blogToDelete) {
            setBlogs(blogs.filter(blog => blog.id !== blogToDelete));
            setIsDeleteModalOpen(false);
            setBlogToDelete(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Post Title</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Author</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 group-hover:text-primary-blue transition-colors">
                                            {blog.title}
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Eye size={12} /> {blog.views.toLocaleString()} views
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {blog.author.charAt(0)}
                                        </div>
                                        <span className="text-sm text-slate-600">{blog.author}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Calendar size={14} className="text-slate-400" />
                                        {blog.date}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                        ${blog.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            blog.status === 'Draft' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                                'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary-blue hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(blog.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {blogs.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                    No blog posts found.
                </div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Blog Post"
                description="Are you sure you want to delete this blog post? This action cannot be undone."
            />
        </div>
    );
}
