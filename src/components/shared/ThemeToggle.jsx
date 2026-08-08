"use client";

import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        const savedTheme = window.localStorage.getItem("theme");

        if (savedTheme === "dark") {
            return true;
        }

        if (savedTheme === "light") {
            return false;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const toggleTheme = () => {
        const nextTheme = isDark ? "light" : "dark";

        document.documentElement.classList.toggle(
            "dark",
            nextTheme === "dark"
        );

        localStorage.setItem("theme", nextTheme);
        setIsDark(nextTheme === "dark");
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
            {isDark ? (
                <HiOutlineSun className="h-5 w-5" />
            ) : (
                <HiOutlineMoon className="h-5 w-5" />
            )}
        </button>
    );
};

export default ThemeToggle;