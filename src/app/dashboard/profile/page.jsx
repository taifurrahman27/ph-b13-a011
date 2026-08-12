"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineArrowLeft,
    HiOutlineAtSymbol,
    HiOutlineCreditCard,
    HiOutlineIdentification,
    HiOutlineUser,
} from "react-icons/hi2";

const DashboardProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                setUser(null);
                return;
            }

            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        };

        loadUser();

        window.addEventListener("auth-change", loadUser);

        return () => {
            window.removeEventListener("auth-change", loadUser);
        };
    }, []);

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                        User information not found
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Please log in again to view your profile.
                    </p>

                    <Link
                        href="/login"
                        className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-6">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                    <HiOutlineArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="h-32 bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600" />

                <div className="px-6 pb-8 sm:px-8">
                    <div className="-mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-4 border-white bg-indigo-100 shadow-lg dark:border-slate-900 dark:bg-indigo-950">
                            {user.profileImage ? (
                                <Image
                                    src={user.profileImage}
                                    alt={user.name || "User"}
                                    fill
                                    className="object-cover"

                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-4xl font-black text-indigo-600 dark:text-indigo-400">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold capitalize text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                                {user.role}
                            </span>

                            <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                                Active
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            {user.name}
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                                    <HiOutlineUser className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        Full Name
                                    </p>

                                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                                        {user.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                                    <HiOutlineAtSymbol className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        Email Address
                                    </p>

                                    <p className="mt-1 truncate font-bold text-slate-900 dark:text-white">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                                    <HiOutlineCreditCard className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        Available Credits
                                    </p>

                                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                                        {user.credits ?? 0} Credits
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                            <h2 className="font-bold text-slate-900 dark:text-white">
                                Account Information
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Your CrowdFunding account details.
                            </p>
                        </div>

                        <div className="divide-y divide-slate-200 dark:divide-slate-800">
                            <div className="flex items-center justify-between gap-4 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <HiOutlineIdentification className="h-5 w-5 text-slate-400" />

                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Account Role
                                    </span>
                                </div>

                                <span className="text-sm font-bold capitalize text-slate-900 dark:text-white">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <HiOutlineCreditCard className="h-5 w-5 text-slate-400" />

                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Available Credits
                                    </span>
                                </div>

                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                    {user.credits ?? 0}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <HiOutlineUser className="h-5 w-5 text-slate-400" />

                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Account Status
                                    </span>
                                </div>

                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DashboardProfilePage;
