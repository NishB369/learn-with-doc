
import React from 'react';
import { Clock, HelpCircle, BarChart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export interface TestProps {
    id: string;
    title: string;
    category: string;
    duration: string;
    questionsCount: number;
    difficulty: string;
    price: string;
    // image: string; // Placeholder for now
    description: string;
    rating: number;
    attempts: number;
}

interface TestCardProps {
    test: TestProps;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
    return (
        <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
            <div className="p-6 flex-grow flex flex-col">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600">
                        {test.category}
                    </span>
                    {test.price === "Free" ? (
                        <span className="text-green-600 font-bold text-sm">Free</span>
                    ) : (
                        <span className="text-slate-900 font-bold text-lg">${test.price}</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-blue transition-colors line-clamp-2">
                    {test.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
                    {test.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-blue" />
                        <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-primary-blue" />
                        <span>{test.questionsCount} Qs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BarChart className="w-4 h-4 text-primary-blue" />
                        <span>{test.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-blue" />
                        <span>{test.attempts.toLocaleString()} taken</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link
                        href={`/tests/${test.id}`}
                        className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-700 font-bold border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer"
                    >
                        View Details
                    </Link>
                    <button className="flex items-center justify-center py-3 rounded-xl bg-primary-blue text-white font-bold hover:bg-sky-600 transition-all cursor-pointer shadow-lg shadow-sky-200/50">
                        Start Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestCard;
