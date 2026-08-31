"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    HiOutlineHome,
    HiOutlineArrowLeft,
} from "react-icons/hi2";

const NotFound = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        const handleThemeChange = () => {
            setDarkMode(mediaQuery.matches);
        };

        handleThemeChange();

        mediaQuery.addEventListener("change", handleThemeChange);

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleThemeChange
            );
        };
    }, []);

    return (
        <main
            className={`flex min-h-screen items-center justify-center px-4 py-12 transition-colors duration-300 sm:px-6 ${darkMode
                    ? "bg-slate-950"
                    : "bg-slate-50"
                }`}
        >
            <div className="w-full max-w-2xl text-center">
                <div
                    className={`rounded-3xl border p-8 shadow-sm transition-colors duration-300 sm:p-12 ${darkMode
                            ? "border-slate-800 bg-slate-900"
                            : "border-slate-200 bg-white"
                        }`}
                >
                    <div
                        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-3xl ${darkMode
                                ? "bg-indigo-950"
                                : "bg-indigo-50"
                            }`}
                    >
                        <span
                            className={`text-4xl font-black ${darkMode
                                    ? "text-indigo-400"
                                    : "text-indigo-600"
                                }`}
                        >
                            404
                        </span>
                    </div>

                    <span
                        className={`mt-8 block text-sm font-bold uppercase tracking-wider ${darkMode
                                ? "text-indigo-400"
                                : "text-indigo-600"
                            }`}
                    >
                        CrowdFunding
                    </span>

                    <h1
                        className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${darkMode
                                ? "text-white"
                                : "text-slate-950"
                            }`}
                    >
                        Page Not Found
                    </h1>

                    <p
                        className={`mx-auto mt-4 max-w-lg ${darkMode
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                    >
                        Sorry, we couldn&apos;t find the page
                        you&apos;re looking for. It may have been
                        moved, deleted, or the URL may be incorrect.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                        >
                            <HiOutlineHome className="text-lg" />
                            Back to Home
                        </Link>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition ${darkMode
                                    ? "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            <HiOutlineArrowLeft className="text-lg" />
                            Go Back
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-sm text-slate-500">
                    © {new Date().getFullYear()} CrowdFunding.
                    All rights reserved.
                </p>
            </div>
        </main>
    );

};

export default NotFound;
