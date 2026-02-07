"use client";

import { useState } from "react";
import { Edit2, Trash2, Quote, Star } from "lucide-react";
import DeleteModal from "@/src/components/admin/DeleteModal";

// Mock Data
// Mock Data matching real site style
const initialTestimonials = [
    {
        id: "1",
        name: "Dr. Priya Sharma",
        role: "Cardiology Resident",
        company: "AIIMS Delhi",
        quote: "This course completely transformed my understanding of complex cardiac cases. The clinical scenarios were incredibly practical.",
        rating: 5,
        image: "/avatar_doctor_female.png",
        course: "Advanced Cardiovascular Medicine"
    },
    {
        id: "2",
        name: "Dr. Rajesh Kumar",
        role: "General Physician",
        company: "Private Practice",
        quote: "As an GP running my own clinic, I needed to refresh my emergency management skills. This course was exactly what I needed.",
        rating: 5,
        image: "/avatar_doctor_male_1.png",
        course: "Emergency Medicine Essentials"
    },
    {
        id: "3",
        name: "Ananya Desai",
        role: "MBBS Student",
        company: "Medical College",
        quote: "The instructor's bedside teaching approach helped me excel in my final exams. Highly recommended for students.",
        rating: 5,
        image: "/avatar_student_female.png",
        course: "Clinical Medicine Fundamentals"
    },
    {
        id: "4",
        name: "Dr. Vikram Mehta",
        role: "Surgery Resident",
        company: "City Hospital",
        quote: "The surgical decision-making course was a game-changer for me. Improved my confidence in the OR significantly.",
        rating: 5,
        image: "/avatar_doctor_male_2.png",
        course: "Surgical Techniques"
    },
];

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setTestimonialToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (testimonialToDelete) {
            setTestimonials(testimonials.filter(t => t.id !== testimonialToDelete));
            setIsDeleteModalOpen(false);
            setTestimonialToDelete(null);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {/* Quote Icon Watermark */}
                        <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors duration-300 transform group-hover:scale-110" size={64} fill="currentColor" stroke="none" />

                        {/* Rating */}
                        <div className="flex gap-1 mb-6 relative z-10">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={`${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"}`}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <p className="text-slate-600 mb-8 relative z-10 leading-relaxed flex-grow italic">
                            "{testimonial.quote}"
                        </p>

                        {/* User Profile */}
                        <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0 bg-slate-50">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                                <p className="text-primary-blue text-xs font-medium mb-0.5">{testimonial.role} @ {testimonial.company}</p>
                                <p className="text-slate-400 text-[10px] uppercase tracking-wide">Alumnus: {testimonial.course}</p>
                            </div>
                        </div>

                        {/* Admin Actions Overlay */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 backdrop-blur-[2px] z-20">
                            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-600 hover:text-primary-blue hover:scale-110 transition-all shadow-lg">
                                <Edit2 size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(testimonial.id)}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-600 hover:text-red-500 hover:scale-110 transition-all shadow-lg"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
                    No testimonials found.
                </div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Testimonial"
                description="Are you sure you want to delete this testimonial? This action cannot be undone."
            />
        </div>
    );
}
