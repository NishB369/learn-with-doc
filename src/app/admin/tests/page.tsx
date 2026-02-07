
"use client";

import { useState } from "react";
import { Edit2, Trash2, Users, Star, DollarSign, Clock, CheckCircle } from "lucide-react";
import DeleteModal from "@/src/components/admin/DeleteModal";

// Mock Data based on src/data/testsData.json structure
const initialTests = [
    {
        id: "1",
        title: "USMLE Step 1 Comprehensive",
        category: "Licensing",
        attempts: 1205,
        rating: 4.9,
        price: 149,
        status: "Active"
    },
    {
        id: "2",
        title: "Internal Medicine Board Review",
        category: "Board Certification",
        attempts: 890,
        rating: 4.7,
        price: 99,
        status: "Active"
    },
    {
        id: "3",
        title: "Clinical Cardiology Quiz",
        category: "Specialty",
        attempts: 2100,
        rating: 4.8,
        price: 29,
        status: "Review"
    },
    {
        id: "4",
        title: "Pediatric Developmental Milestones",
        category: "Specialty",
        attempts: 3400,
        rating: 4.6,
        price: 15,
        status: "Draft"
    },
    {
        id: "5",
        title: "Emergency Triage Simulation",
        category: "Clinical Skills",
        attempts: 1500,
        rating: 4.9,
        price: 49,
        status: "Active"
    }
];

export default function AdminTestsPage() {
    const [tests, setTests] = useState(initialTests);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [testToDelete, setTestToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setTestToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (testToDelete) {
            setTests(tests.filter(test => test.id !== testToDelete));
            setIsDeleteModalOpen(false);
            setTestToDelete(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Test Title</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>

                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Price</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tests.map((test) => (
                            <tr key={test.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 group-hover:text-primary-blue transition-colors">
                                            {test.title}
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Star size={12} className="text-amber-400 fill-amber-400" /> {test.rating} Rating
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-block bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                                        {test.category}
                                    </span>
                                </td>

                                <td className="py-4 px-6">
                                    <div className="font-medium text-slate-700">
                                        ${test.price}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                        ${test.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            test.status === 'Draft' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                                'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                        {test.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary-blue hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(test.id)}
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

            {tests.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                    No tests found.
                </div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Test"
                description="Are you sure you want to delete this test? This will remove all associated user attempts and analytics."
            />
        </div>
    );
}
