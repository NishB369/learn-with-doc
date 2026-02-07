"use client";

import {
    BookOpen, GraduationCap, MessageSquareQuote,
    ArrowUpRight, ArrowDownRight, MoreHorizontal, PenTool
} from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

// --- Mock Data ---

const blogData = [
    { name: 'Published', value: 12, color: '#10b981' }, // emerald-500
    { name: 'Draft', value: 5, color: '#cbd5e1' },      // slate-300
];

const courseData = [
    { name: 'Active', value: 8, color: '#3b82f6' },    // blue-500
    { name: 'Draft', value: 3, color: '#cbd5e1' },     // slate-300
];

const testData = [
    { name: 'Active', value: 15, color: '#a855f7' },   // purple-500
    { name: 'Draft', value: 2, color: '#cbd5e1' },     // slate-300
];

const testimonialSourceData = [
    { name: 'Google', count: 45 },
    { name: 'Facebook', count: 32 },
    { name: 'LinkedIn', count: 28 },
    { name: 'Twitter', count: 15 },
    { name: 'Email', count: 10 },
];

// --- Components ---

const DashboardStatsCard = ({
    title,
    count,
    icon: Icon,
    trend,
    trendUp
}: {
    title: string,
    count: string | number,
    icon: any,
    trend: string,
    trendUp: boolean
}) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[160px]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
            style={{
                backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}
        />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10">
            <div className="p-3 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trend}
                </div>
            )}
        </div>

        {/* Content */}
        <div className="relative z-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{count}</h3>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
        </div>
    </div>
);

const ChartContainer = ({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[420px] relative overflow-visible group">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
            }}
        />
        <div className="mb-6 flex items-start justify-between relative z-10">
            <div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
            <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={20} />
            </button>
        </div>
        <div className="flex-grow w-full h-full min-h-0 relative z-10">
            {children}
        </div>
    </div>
);

export default function AdminHomePage() {
    return (
        <div className="space-y-8">
            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatsCard
                    title="Number of Blogs"
                    count="17"
                    icon={BookOpen}
                    trend="+12%"
                    trendUp={true}
                />
                <DashboardStatsCard
                    title="Number of Courses"
                    count="11"
                    icon={GraduationCap}
                    trend="+4 new"
                    trendUp={true}
                />
                <DashboardStatsCard
                    title="Number of Tests"
                    count="17"
                    icon={PenTool}
                    trend="+15 new"
                    trendUp={true}
                />
                <DashboardStatsCard
                    title="Number of Testimonials"
                    count="130"
                    icon={MessageSquareQuote}
                    trend="+8 recent"
                    trendUp={true}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-8">
                {/* Content Distribution - Pie Charts */}
                <div className="w-full">
                    <ChartContainer title="Content Status" subtitle="Published vs Draft items">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full items-center">
                            {/* Blogs Pie */}
                            <div className="flex items-center h-full">
                                <div className="flex-1 h-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={blogData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {blogData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Centered Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <BookOpen size={20} className="text-slate-300" />
                                    </div>
                                </div>
                                {/* Custom Legend */}
                                <div className="w-24 flex flex-col justify-center gap-2 pr-2">
                                    <h4 className="text-xs font-bold text-slate-700 mb-1">Blogs</h4>
                                    {blogData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-xs text-slate-500">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Courses Pie */}
                            <div className="flex items-center h-full border-l border-slate-100 pl-4">
                                <div className="flex-1 h-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={courseData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {courseData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Centered Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <GraduationCap size={20} className="text-slate-300" />
                                    </div>
                                </div>
                                {/* Custom Legend */}
                                <div className="w-24 flex flex-col justify-center gap-2 pr-2">
                                    <h4 className="text-xs font-bold text-slate-700 mb-1">Courses</h4>
                                    {courseData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-xs text-slate-500">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tests Pie */}
                            <div className="flex items-center h-full border-l border-slate-100 pl-4">
                                <div className="flex-1 h-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={testData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {testData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Centered Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <PenTool size={20} className="text-slate-300" />
                                    </div>
                                </div>
                                {/* Custom Legend */}
                                <div className="w-24 flex flex-col justify-center gap-2 pr-2">
                                    <h4 className="text-xs font-bold text-slate-700 mb-1">Tests</h4>
                                    {testData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-xs text-slate-500">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
