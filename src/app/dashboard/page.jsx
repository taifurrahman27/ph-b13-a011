"use client";

import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import CreatorDashboard from "@/components/dashboard/creator/CreatorDashboard";
import SupporterDashboard from "@/components/dashboard/supporter/SupporterDashboard";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    setUser(null);
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    localStorage.removeItem("token");
                    setUser(null);
                    return;
                }

                setUser(data.user);
            } catch (error) {
                console.error("Failed to load user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="animate-pulse">
                            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />

                            <div className="mt-4 h-10 w-72 rounded bg-slate-200 dark:bg-slate-700" />

                            <div className="mt-4 h-5 w-96 max-w-full rounded bg-slate-200 dark:bg-slate-700" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm dark:border-red-900 dark:bg-slate-900">
                        <h1 className="text-2xl font-black text-red-600 dark:text-red-400">
                            Unable to load dashboard
                        </h1>

                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Please log in again to access your dashboard.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    const role = user.role?.toLowerCase();

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {role === "supporter" && (
                    <SupporterDashboard user={user} />
                )}

                {role === "creator" && (
                    <CreatorDashboard user={user} />
                )}

                {role === "admin" && (
                    <AdminDashboard user={user} />
                )}

                {!["supporter", "creator", "admin"].includes(role) && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            CrowdFunding
                        </span>

                        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                            Welcome to your Dashboard
                        </h1>

                        <p className="mt-3 text-slate-600 dark:text-slate-400">
                            Your dashboard summary is not available for your
                            current role.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );

};

export default DashboardPage;
