"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface BlogTOCProps {
    content: string;
}

interface TOCItem {
    text: string;
    level: "h2" | "h3";
}

export default function BlogTOC({ content }: BlogTOCProps) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeText, setActiveText] = useState<string>("");

    useEffect(() => {
        // Parse the content string just to look for headers to build the list
        const regex = /<(h[23])>(.*?)<\/\1>/g;
        let match;
        const items: TOCItem[] = [];

        while ((match = regex.exec(content)) !== null) {
            const level = match[1] as "h2" | "h3";
            const text = match[2]; // This is the raw text from HTML
            items.push({ text, level });
        }
        setHeadings(items);
    }, [content]);

    // Helper to find the DOM element by text content
    const getElementByText = (text: string) => {
        // We look inside .prose (or generic main container) to avoid picking up the TOC's own text
        // If .prose doesn't exist yet, we might fail, so optional chaining
        const elements = Array.from(document.querySelectorAll("article h2, article h3"));
        return elements.find(el => el.textContent === text);
    };

    const handleScrollTo = (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        const element = getElementByText(text);
        if (element) {
            // Scroll with offset for sticky header/spacing
            const y = element.getBoundingClientRect().top + window.scrollY - 120; // 120px offset
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Active Spy Scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset check

            let currentText = "";

            // We need to re-query elements to check their positions relative to viewport
            const elements = Array.from(document.querySelectorAll("article h2, article h3"));

            for (const el of elements) {
                if (el instanceof HTMLElement && el.offsetTop < scrollPosition) {
                    currentText = el.textContent || "";
                }
            }
            if (currentText) setActiveText(currentText);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        setTimeout(handleScroll, 500);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [headings, content]);

    if (headings.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8 transition-shadow hover:shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold border-b border-slate-50 pb-4">
                <List size={18} className="text-primary-blue" />
                <span>Table of Contents</span>
            </div>
            <nav className="flex flex-col gap-2">
                {headings.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        onClick={(e) => handleScrollTo(e, item.text)}
                        className={`text-sm font-medium transition-all duration-200 block cursor-pointer
                            ${item.level === "h3" ? "pl-6 text-xs" : "pl-3 border-l-2"}
                            ${activeText === item.text
                                ? "text-primary-blue border-primary-blue translate-x-1"
                                : "text-slate-500 border-transparent hover:border-slate-300 hover:text-slate-700 hover:translate-x-1"
                            }
                        `}
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
