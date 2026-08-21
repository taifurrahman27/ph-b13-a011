"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    HiOutlineArrowLeft,
    HiOutlineCreditCard,
    HiOutlineEnvelope,
    HiOutlineShieldCheck,
    HiOutlineUserCircle,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";

const UserProfilePage = () => {
    const params = useParams();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load user profile."
                    );
                }

                setUser(data.user);
            } catch (error) {
                toast.error(
                    error.message || "Failed to load user profile."
                );
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            loadUser();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex min-h-96 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-96 flex-col items-center justify-center text-center">
                <HiOutlineUserCircle className="h-16 w-16 text-slate-300 dark:text-slate-700" />

                <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                    User not found
                </h2>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const getRoleClass = (role) => {
        if (role === "admin") {
            return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
        }

        if (role === "creator") {
            return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400";
        }

        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Administration
                    </p>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                        User Profile
                    </h1>

                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        View user account information and activity.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <HiOutlineArrowLeft className="h-5 w-5" />
                    Back to Users
                </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-10 sm:px-8">
                    <div className="flex flex-col items-center gap-5 sm:flex-row">
                        {user.profileImage ? (
                            <Image
                                src={user.profileImage}
                                alt={user.name || "User"}
                                width={96}
                                height={96}
                                unoptimized
                                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-indigo-600 shadow-lg">
                                <HiOutlineUserCircle className="h-16 w-16" />
                            </div>
                        )}

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-black text-white">
                                {user.name || "Unknown User"}
                            </h2>

                            <p className="mt-1 text-sm text-indigo-100">
                                {user.email}
                            </p>

                            <span
                                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${getRoleClass(
                                    user.role
                                )}`}
                            >
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                <HiOutlineEnvelope className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 break-all text-sm font-bold text-slate-900 dark:text-white">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <HiOutlineCreditCard className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Credits
                                </p>

                                <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                                    {user.credits ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                <HiOutlineShieldCheck className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Role
                                </p>

                                <p className="mt-1 text-sm font-black capitalize text-slate-900 dark:text-white">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
