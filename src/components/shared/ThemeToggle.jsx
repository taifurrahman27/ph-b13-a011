"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineMoon,
    HiOutlineSun,
} from "react-icons/hi2";

const getInitialTheme = () => {
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
};

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => getInitialTheme());

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        window.localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((previous) => !previous);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
