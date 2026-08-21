"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    HiOutlineBars3,
    HiOutlineBell,
    HiOutlineChevronDown,
    HiOutlineUserCircle,
    HiOutlineXMark,
} from "react-icons/hi2";
import ThemeToggle from "../shared/ThemeToggle";
import UserCredits from "./supporter/UserCredits";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const DashboardHeader = ({ onMenuClick, sidebarOpen }) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setUser(null);
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                setUser(data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            } catch (error) {
                console.error(
                    "Failed to load current user:",
                    error
                );

                setUser(null);
            }
        };

        loadUser();

        window.addEventListener("auth-change", loadUser);

        return () => {
            window.removeEventListener("auth-change", loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("auth-change"));

        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-60 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex h-20 items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label={
                            sidebarOpen
                                ? "Close sidebar"
                                : "Open sidebar"
                        }
                        aria-expanded={sidebarOpen}
                        className="relative z-70 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 lg:hidden"
                    >
                        <span className="relative flex h-6 w-6 items-center justify-center">
                            <HiOutlineBars3
                                className={`absolute h-6 w-6 transition-all duration-200 ${sidebarOpen
                                    ? "rotate-90 scale-0 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                                    }`}
                            />

                            <HiOutlineXMark
                                className={`absolute h-6 w-6 transition-all duration-200 ${sidebarOpen
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "-rotate-90 scale-0 opacity-0"
                                    }`}
                            />
                        </span>
                    </button>

                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                            Dashboard
                        </p>

                        <h1 className="mt-1 truncate text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                            Welcome back
                            {user?.name ? `, ${user.name}` : ""}
                        </h1>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 sm:flex dark:border-slate-700 dark:bg-slate-900">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Credits
                        </span>

                        <UserCredits />
                    </div>

                    <ThemeToggle />

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                    >
                        <HiOutlineBell className="h-5 w-5" />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() =>
                                setShowMenu((current) => !current)
                            }
                            aria-label="Open user menu"
                            aria-expanded={showMenu}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 transition-all duration-200 hover:border-indigo-200 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500/40"
                        >
                            <div className="h-9 w-9 overflow-hidden rounded-lg bg-indigo-100 dark:bg-indigo-950">
                                {user?.profileImage ? (
                                    <Image
                                        src={user.profileImage}
                                        alt={user.name || "User"}
                                        width={36}
                                        height={36}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <HiOutlineUserCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                )}
                            </div>

                            <div className="hidden text-left md:block">
                                <p className="max-w-28 truncate text-sm font-bold text-slate-900 dark:text-white">
                                    {user?.name || "User"}
                                </p>

                                <p className="text-xs font-semibold capitalize text-indigo-600 dark:text-indigo-400">
                                    {user?.role || "User"}
                                </p>
                            </div>

                            <HiOutlineChevronDown className="mr-1 hidden h-4 w-4 text-slate-400 md:block" />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-full z-80 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20">
                                <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
                                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                        {user?.name || "User"}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                                        {user?.email || ""}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard/profile"
                                    onClick={() => setShowMenu(false)}
                                    className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                >
                                    Profile
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full cursor-pointer rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
