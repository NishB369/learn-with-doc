"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminHeader from "@/src/components/admin/AdminHeader";
import { motion } from "framer-motion";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    // We need to know the state of the sidebar to adjust the margin.
    // HOWEVER, AdminSidebar has its own state. 
    // Let's refactor: Lift state up to here.

    const [isCollapsed, setIsCollapsed] = useState(false);

    const pathname = usePathname();
    const isNewPage = pathname && (pathname.includes("/new") || pathname.includes("/preview"));
    const isPreview = pathname && pathname.includes("/preview");

    if (isPreview) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden relative">
            {/* Background Effects matching Stats.tsx */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.4]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-100/60 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
            </div>

            <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Main Content Area - Animated Margin */}
            <motion.main
                layout
                animate={{ marginLeft: isCollapsed ? 120 : 360 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                className="min-h-screen p-6"
            >
                <div className="mx-auto max-w-7xl">
                    {!isNewPage && <AdminHeader />}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </motion.main>
        </div>
    );
}
