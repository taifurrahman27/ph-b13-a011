"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineUsers,
    HiOutlineMegaphone,
    HiOutlineHeart,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const AdminDashboard = ({ user }) => {
    const [summary, setSummary] = useState({
        totalUsers: 0,
        totalCampaigns: 0,
        totalContributions: 0,
        totalRevenue: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSummary = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/dashboard-summary`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    if (res.status === 401) {
                        localStorage.removeItem("accessToken");
                    }

                    throw new Error(
                        data.message ||
                        "Failed to load admin summary."
                    );
                }

                setSummary({
                    totalUsers: data.totalUsers || 0,
                    totalCampaigns: data.totalCampaigns || 0,
                    totalContributions:
                        data.totalContributions || 0,
                    totalRevenue: data.totalRevenue || 0,
                });
            } catch (error) {
                console.error(
                    "Failed to load admin summary:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadSummary();
    }, []);

    const cards = [
        {
            title: "Total Users",
            value: summary.totalUsers,
            description: "Registered CrowdFunding users",
            icon: HiOutlineUsers,
        },
        {
            title: "Total Campaigns",
            value: summary.totalCampaigns,
            description: "Campaigns created on the platform",
            icon: HiOutlineMegaphone,
        },
        {
            title: "Total Contributions",
            value: summary.totalContributions,
            description: "Contributions made by supporters",
            icon: HiOutlineHeart,
        },
        {
            title: "Platform Revenue",
            value: `$${Number(
                summary.totalRevenue
            ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            description: "Total revenue from paid purchases",
            icon: HiOutlineCurrencyDollar,
        },
    ];

    return (
        <>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    CrowdFunding • Admin
                </span>

                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Welcome back, {user?.name || "Admin"}!
                </h1>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                    Monitor the overall activity and performance
                    of the CrowdFunding platform.
                </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                <Icon className="text-2xl" />
                            </div>

                            <p className="mt-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
                                {card.title}
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                                {loading ? "..." : card.value}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {card.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AdminDashboard;