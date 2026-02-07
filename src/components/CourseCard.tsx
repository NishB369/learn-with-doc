import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowUpRight } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    duration: string;
    students: string;
    price: string;
    image: string;
    badge?: string;
}

export default function CourseCard({ id, title, description, duration, students, price, image, badge }: CourseCardProps) {
    return (
        <Link
            href={`/courses/${id}`}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 flex flex-col h-full cursor-pointer block"
        >
            {/* Image & Price Area */}
            <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                    src={image}
                    alt={`${title} thumbnail`}
                    fill
                    className="object-cover transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-5 right-5 flex flex-col gap-2 items-end">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg text-primary-blue font-black text-sm">
                        ${price}
                    </span>
                    {badge && (
                        <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                            {badge}
                        </span>
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary-blue transition-colors leading-tight h-[3.5rem] line-clamp-2 flex items-center">
                        {title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed h-[4.5rem] line-clamp-3 overflow-hidden">
                        {description}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100 mt-auto">
                    <StatItem icon={Clock} label={duration} />
                    <StatItem icon={Users} label={students} />
                </div>

                {/* Interaction Footer */}
                <div className="grid grid-cols-2 gap-3">
                    <ActionButton variant="primary" label="Details" />
                    <ActionButton variant="secondary" label="Enroll" icon={ArrowUpRight} />
                </div>
            </div>
        </Link>
    );
}

function StatItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="flex items-center gap-2.5 text-slate-500">
            <Icon size={18} className="text-primary-blue/80" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
        </div>
    );
}

function ActionButton({ variant, label, icon: Icon }: { variant: 'primary' | 'secondary', label: string, icon?: any }) {
    const styles = variant === 'primary'
        ? "bg-slate-900 text-white hover:bg-primary-blue shadow-slate-200"
        : "bg-sky-50 text-primary-blue hover:bg-primary-blue hover:text-white shadow-sky-100";

    return (
        <button className={`${styles} cursor-pointer duration-300 ease-in-out transition-all w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group/btn hover:-translate-y-0.5`}>
            {label}
            {Icon && <Icon size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
        </button>
    );
}
