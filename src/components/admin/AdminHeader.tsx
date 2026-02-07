"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminHeader() {
    const pathname = usePathname();

    const getHeaderInfo = () => {
        if (pathname.includes("/admin/blogs")) {
            return {
                title: "Blogs",
                subtitle: "Manage your blog posts and content",
                action: "New Blog",
                actionHref: "/admin/blogs/new"
            };
        }
        if (pathname.includes("/admin/courses")) {
            return {
                title: "Courses",
                subtitle: "Manage your courses and curriculum",
                action: "New Course",
                actionHref: "/admin/courses/new"
            };
        }
        if (pathname.includes("/admin/tests")) {
            return {
                title: "Tests",
                subtitle: "Manage your tests and quizzes",
                action: "New Test",
                actionHref: "/admin/tests/new"
            };
        }
        if (pathname.includes("/admin/testimonials")) {
            return {
                title: "Testimonials",
                subtitle: "Manage user testimonials and feedback",
                action: "New Testimonial",
                actionHref: "/admin/testimonials/new"
            };
        }
        if (pathname.includes("/admin/home")) {
            return { title: "Home", subtitle: "Welcome back, Admin", action: undefined, actionHref: undefined };
        }
        if (pathname.includes("/preview")) {
            // Return empty/falsy to handle in the component return if needed, 
            // OR relying on AdminShell to check pathname like we did for "/new" pages.
            // But wait, the previous logic for "/new" pages was done in AdminShell.tsx, not here.
            // AdminHeader is just getting info.
            // If I want to completely HIDE it, I should modify AdminShell.tsx.
            // But let's check AdminShell.tsx again.
            return { title: "Preview", subtitle: "Preview Mode", action: undefined, actionHref: undefined };
        }
        return { title: "Dashboard", subtitle: "Welcome back, Admin", action: undefined, actionHref: undefined };
    };

    const { title, subtitle, action, actionHref } = getHeaderInfo();

    return (
        <header className="flex items-center justify-between mb-8 mt-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                <p className="text-lg text-slate-500">{subtitle}</p>
            </div>

            {action && (
                <Link
                    href={actionHref || "#"}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-lg font-medium shadow-sm shadow-blue-200 hover:bg-primary-blue-dark transition-all active:scale-95 cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>{action}</span>
                </Link>
            )}
        </header>
    );
}
