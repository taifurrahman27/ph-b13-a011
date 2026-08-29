"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineHeart,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineCreditCard,
} from "react-icons/hi2";

const SupporterDashboard = ({ user }) => {
    const [summary, setSummary] = useState({
        totalContributions: 0,
        pendingContributions: 0,
        totalAmountContributed: 0,
        availableCredits: user?.credits || 0,
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
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/supporter-summary`,
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
                        data.message || "Failed to load supporter summary."
                    );
                }

                setSummary({
                    totalContributions: data.totalContributions || 0,
                    pendingContributions: data.pendingContributions || 0,
                    totalAmountContributed:
                        data.totalAmountContributed || 0,
                    availableCredits:
                        data.availableCredits ?? user?.credits ?? 0,
                });
            } catch (error) {
                console.error(
                    "Failed to load supporter summary:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadSummary();
    }, [user?.credits]);

    const cards = [
        {
            title: "Total Contributions",
            value: summary.totalContributions,
            description: "All contributions you've made",
            icon: HiOutlineHeart,
        },
        {
            title: "Pending Contributions",
            value: summary.pendingContributions,
            description: "Contributions awaiting approval",
            icon: HiOutlineClock,
        },
        {
            title: "Total Contributed",
            value: `$${Number(
                summary.totalAmountContributed
            ).toLocaleString()}`,
            description: "Approved contribution amount",
            icon: HiOutlineCurrencyDollar,
        },
        {
            title: "Available Credits",
            value: Number(
                summary.availableCredits
            ).toLocaleString(),
            description: "Credits available to contribute",
            icon: HiOutlineCreditCard,
        },
    ];

    return (
        <>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    CrowdFunding • Supporter
                </span>

                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Welcome back, {user?.name || "Supporter"}!
                </h1>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                    Here is a summary of your crowdfunding activity.
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
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                    <Icon className="text-2xl" />
                                </div>
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

export default SupporterDashboard;