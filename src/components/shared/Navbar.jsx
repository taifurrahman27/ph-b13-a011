"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    HiBars3,
    HiOutlineArrowRightOnRectangle,
    HiOutlineCodeBracket,
    HiOutlineSquares2X2,
    HiOutlineSparkles,
    HiOutlineUserCircle,
    HiXMark,
} from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";

const CLIENT_GITHUB_REPO =
    "https://github.com/taifurrahman27/ph-b13-a011";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const loadUser = () => {
            try {
                const storedUser = localStorage.getItem("user");

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to load user:", error);
                setUser(null);
            }
        };

        loadUser();

        const handleAuthChange = () => {
            loadUser();
        };

        window.addEventListener("storage", handleAuthChange);
        window.addEventListener("auth-change", handleAuthChange);

        return () => {
            window.removeEventListener("storage", handleAuthChange);
            window.removeEventListener("auth-change", handleAuthChange);
        };
    }, []);

    const isLoggedIn = Boolean(user);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setUser(null);
        setMobileMenuOpen(false);

        window.dispatchEvent(new Event("auth-change"));
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2.5"
                    aria-label="CrowdFunding home"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500 dark:shadow-indigo-950/40">
                        <HiOutlineSparkles className="h-5 w-5" />
                    </span>

                    <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Crowd
                        <span className="text-indigo-600 dark:text-indigo-400">
                            Funding
                        </span>
                    </span>
                </Link>

                <div className="hidden items-center gap-3 md:flex">
                    <nav className="flex items-center gap-1">
                        <Link
                            href="/campaigns"
                            className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                        >
                            <HiOutlineSquares2X2 className="h-5 w-5 transition-transform group-hover:scale-105" />
                            Explore Campaigns
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                                >
                                    Dashboard
                                </Link>

                                <div className="mx-2 h-7 w-px bg-slate-200 dark:bg-slate-800" />

                                <Link
                                    href="/dashboard"
                                    className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-900"
                                >
                                    {user?.profileImage ? (
                                        <Image
                                            src={user.profileImage}
                                            alt={user.name || "User"}
                                            width={36}
                                            height={36}
                                            className="h-9 w-9 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                                        />
                                    ) : (
                                        <HiOutlineUserCircle className="h-9 w-9 text-slate-400" />
                                    )}

                                    <div className="hidden text-left lg:block">
                                        <p className="max-w-32 truncate text-sm font-bold text-slate-900 dark:text-white">
                                            {user?.name || "User"}
                                        </p>

                                        <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                                            {user?.role || "Member"}
                                        </p>
                                    </div>
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                                >
                                    <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </nav>

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
                    {isLoggedIn && (
                        <Link
                            href="/dashboard"
                            className="flex items-center"
                            aria-label="Dashboard"
                        >
                            {user?.profileImage ? (
                                <Image
                                    src={user.profileImage}
                                    alt={user.name || "User"}
                                    width={36}
                                    height={36}
                                    className="h-9 w-9 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                                />
                            ) : (
                                <HiOutlineUserCircle className="h-9 w-9 text-slate-400" />
                            )}
                        </Link>
                    )}

                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen((previous) => !previous)
                        }
                        className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <HiXMark className="h-6 w-6" />
                        ) : (
                            <HiBars3 className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">
                        <Link
                            href="/campaigns"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                        >
                            <HiOutlineSquares2X2 className="h-5 w-5" />
                            Explore Campaigns
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <div className="my-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <div className="flex items-center gap-3">
                                        {user?.profileImage ? (
                                            <Image
                                                src={user.profileImage}
                                                alt={user.name || "User"}
                                                width={44}
                                                height={44}
                                                className="h-11 w-11 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                                            />
                                        ) : (
                                            <HiOutlineUserCircle className="h-11 w-11 text-slate-400" />
                                        )}

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                                {user?.name || "User"}
                                            </p>

                                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                                {user?.email}
                                            </p>

                                            <span className="mt-1 inline-block text-xs font-semibold capitalize text-indigo-600 dark:text-indigo-400">
                                                {user?.role || "Member"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                >
                                    <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
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
            )}
        </header>
    );
};

export default Navbar;