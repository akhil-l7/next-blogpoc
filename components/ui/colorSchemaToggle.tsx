'use client'
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { sleep } from "../util";

export default function ColorSchemaToggle() {
    const [isDark, setIsDark] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";

    async function toggleSchema(): Promise<void> {
        if (!document) return
        setIsAnimating(true);
        setIsDark(prev => {
            if (prev) {
                document.body.classList.remove('dark');
                return !prev
            }
            document.body.classList.add('dark');
            return !prev
        });
        await sleep(1000);
        setIsAnimating(false);
    }

    useEffect(() => {
        if (!window) return
        const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDarkModePreferred !== isDark) toggleSchema();
    }, []);

    return (
        <button title={label} aria-label={label} aria-pressed={isDark} data-isanimating={isAnimating} className="px-2 py-0.5 rounded-sm lg:p-2 lg:rounded-4xl cursor-pointer relative data-[isAnimating=true]:pointer-events-none select-none hover:bg-toggle-focus" onClick={toggleSchema}>
            <span className="block relative rounded-2xl w-6 h-6 overflow-hidden *:absolute *:origin-bottom *:transition-transform *:ease-in-out *:duration-1000 motion-reduce:*:duration-[0s]">
                <Sun color="var(--toggle-sun)" data-isdark={isDark} className="rotate-0 data-[isDark=true]:rotate-180" />
                <Moon color="var(--toggle-moon)" data-isdark={isDark} className="rotate-180 data-[isDark=true]:rotate-360" />
            </span>

        </button>
    )
}