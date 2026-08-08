"use client";

import Link from "next/link";
import {
    HiBars3,
    HiOutlineSquares2X2,
    HiOutlineCodeBracket,
    HiOutlineSparkles,
} from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";

const CLIENT_GITHUB_REPO =
    "https://github.com/taifurrahman27/ph-b13-a011";

const Navbar = () => {
    // Temporary authentication state
    const isLoggedIn = false;

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2.5"
                    aria-label="CrowdFund home"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500 dark:shadow-indigo-950/40">
                        <HiOutlineSparkles className="h-5 w-5" />
                    </span>

                    <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Crowd<span className="text-indigo-600 dark:text-indigo-400">Fund</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-3 md:flex">

                    {!isLoggedIn && (
                        <nav className="flex items-center gap-1">

                            <Link
                                href="/campaigns"
                                className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                            >
                                <HiOutlineSquares2X2 className="h-5 w-5 transition-transform group-hover:scale-105" />
                                Explore Campaigns
                            </Link>

                            <Link
                                href="/login"
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-indigo-200/50 transition hover:bg-indigo-500 dark:shadow-indigo-950/40"
                            >
                                Register
                            </Link>
                        </nav>
                    )}

                    <ThemeToggle />

                    <a
                        href={CLIENT_GITHUB_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                    >
                        <HiOutlineCodeBracket className="h-5 w-5" />
                        Join as Developer
                    </a>
                </div>

                <div className="flex items-center gap-2 md:hidden">

                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => {
                            const menu =
                                document.getElementById("mobile-menu");

                            if (menu) {
                                menu.classList.toggle("hidden");
                            }
                        }}
                        className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                        aria-label="Toggle navigation menu"
                    >
                        <HiBars3 className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div
                id="mobile-menu"
                className="hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
            >
                <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">

                    {!isLoggedIn && (
                        <>
                            <Link
                                href="/campaigns"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                            >
                                <HiOutlineSquares2X2 className="h-5 w-5" />
                                Explore Campaigns
                            </Link>

                            <Link
                                href="/login"
                                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="mt-1 flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    <a
                        href={CLIENT_GITHUB_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                    >
                        <HiOutlineCodeBracket className="h-5 w-5" />
                        Join as Developer
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
