"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        // Reset page to 1 when searching
        params.delete("page");

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="max-w-xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-primary-blue rounded-full opacity-25 group-hover:opacity-50 blur transition duration-200" />
            <div className="relative">
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("search")?.toString()}
                    type="text"
                    placeholder="Search for a specialty or topic..."
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-slate-900 border-none shadow-xl focus:outline-none focus:ring-0 placeholder:text-slate-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
        </div>
    );
}
