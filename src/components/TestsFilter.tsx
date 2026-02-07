
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface TestsFilterProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedDifficulty: string;
    setSelectedDifficulty: (difficulty: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const TestsFilter: React.FC<TestsFilterProps> = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Search Input */}
            <div className="relative flex-grow w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary-blue/50 outline-none transition-all text-sm md:text-base"
                />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-3 md:flex md:w-auto w-full">
                {/* Category Dropdown */}
                <div className="relative w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full appearance-none pl-4 pr-10 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium cursor-pointer focus:ring-2 focus:ring-primary-blue/50 outline-none min-w-0 md:min-w-[160px] text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        <option value="All" className="text-slate-900">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat} className="text-slate-900">{cat}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                </div>

                {/* Difficulty Dropdown */}
                <div className="relative w-full md:w-auto">
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full appearance-none pl-4 pr-10 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium cursor-pointer focus:ring-2 focus:ring-primary-blue/50 outline-none min-w-0 md:min-w-[160px] text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        <option value="All" className="text-slate-900">All Difficulties</option>
                        <option value="Beginner" className="text-slate-900">Beginner</option>
                        <option value="Intermediate" className="text-slate-900">Intermediate</option>
                        <option value="Advanced" className="text-slate-900">Advanced</option>
                        <option value="Hard" className="text-slate-900">Hard</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default TestsFilter;
