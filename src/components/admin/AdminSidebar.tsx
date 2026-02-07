"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, GraduationCap, MessageSquareQuote, LogOut, Settings, ChevronLeft, ChevronRight, Activity, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
    const pathname = usePathname();

    const links = [
        { name: "Overview", href: "/admin/home", icon: LayoutDashboard },
        { name: "Blogs", href: "/admin/blogs", icon: BookOpen },
        { name: "Courses", href: "/admin/courses", icon: GraduationCap },
        { name: "Tests", href: "/admin/tests", icon: PenTool },
        { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    ];

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-6 top-6 bottom-6 rounded-3xl border border-white/20 bg-white/70 backdrop-blur-2xl shadow-xl z-30 flex flex-col overflow-visible"
        >
            {/* Toggle Button */}
            {/* Toggle Button - Integrated into Layout */}
            <div className={`absolute top-1/2 -right-4 z-50`}>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-md border border-slate-100 hover:text-primary-blue hover:bg-slate-50 transition-all active:scale-95"
                >
                    <ChevronLeft size={16} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Logo Area */}
            <div className={`flex items-center gap-3 px-6 pt-8 pb-6 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-blue text-white shadow-lg shadow-primary-blue/30 overflow-hidden">
                    <Activity size={20} />
                </div>

                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex flex-col whitespace-nowrap overflow-hidden"
                        >
                            <span className="text-lg font-bold tracking-tight text-slate-900">Medicare</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Admin Panel</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-4 overflow-hidden">
                {links.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all group overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-blue/10 to-transparent border-l-4 border-primary-blue"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <Icon
                                className={`relative z-10 h-5 w-5 shrink-0 transition-colors ${isActive ? "text-primary-blue" : "text-slate-500 group-hover:text-slate-900"
                                    }`}
                            />

                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className={`relative z-10 font-medium whitespace-nowrap overflow-hidden ${isActive ? "text-primary-blue font-bold" : "text-slate-600 group-hover:text-slate-900"
                                            }`}
                                    >
                                        {link.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 pb-6 mt-auto space-y-2 overflow-hidden">
                <button className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 ${isCollapsed ? 'justify-center' : ''}`}>
                    <Settings className="h-5 w-5 shrink-0" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="whitespace-nowrap overflow-hidden"
                            >
                                Settings
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
                <button className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 ${isCollapsed ? 'justify-center' : ''}`}>
                    <LogOut className="h-5 w-5 shrink-0" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="whitespace-nowrap overflow-hidden"
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.aside>
    );
}
