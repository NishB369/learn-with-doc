"use client";

import { useState } from "react";
import { Edit2, Trash2, Users, Star, DollarSign } from "lucide-react";
import DeleteModal from "@/src/components/admin/DeleteModal";

// Mock Data
const initialCourses = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Angela Yu",
        students: 15420,
        rating: 4.8,
        price: 89.99,
        status: "Active"
    },
    {
        id: "2",
        title: "Advanced Data Science & Machine Learning",
        instructor: "Andrew Ng",
        students: 8540,
        rating: 4.9,
        price: 129.99,
        status: "Active"
    },
    {
        id: "3",
        title: "UI/UX Design Masterclass",
        instructor: "Gary Simon",
        students: 4200,
        rating: 4.7,
        price: 49.99,
        status: "Draft"
    },
    {
        id: "4",
        title: "Next.js 14: The Complete Guide",
        instructor: "Maximilian Schwarzmüller",
        students: 2100,
        rating: 4.9,
        price: 99.99,
        status: "Active"
    }
];

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState(initialCourses);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setCourseToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (courseToDelete) {
            setCourses(courses.filter(course => course.id !== courseToDelete));
            setIsDeleteModalOpen(false);
            setCourseToDelete(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Course Name</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Instructor</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Enrolled</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Price</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {courses.map((course) => (
                            <tr key={course.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 group-hover:text-primary-blue transition-colors">
                                            {course.title}
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Star size={12} className="text-amber-400 fill-amber-400" /> {course.rating} Rating
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-slate-600">{course.instructor}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                        <Users size={14} className="text-slate-400" />
                                        {course.students.toLocaleString()}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="font-medium text-slate-700">
                                        ${course.price}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                        ${course.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary-blue hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(course.id)}
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

            {courses.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                    No courses found.
                </div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Course"
                description="Are you sure you want to delete this course? This action implies removing all student progress associated with it."
            />
        </div>
    );
}
