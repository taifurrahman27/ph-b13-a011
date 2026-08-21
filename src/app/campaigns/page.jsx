"use client";

import { useEffect, useState } from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import CampaignCard from "@/components/campaigns/CampaignCard";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const AllCampaignsPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/campaigns`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch campaigns");
                }

                const data = await response.json();

                if (data.success) {
                    setCampaigns(data.campaigns || []);
                } else {
                    throw new Error("Failed to load campaigns");
                }
            } catch (error) {
                console.error("Campaign fetch error:", error);
                setError("Unable to load campaigns. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10">
                        <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />

                                <div className="space-y-4 p-5">
                                    <div className="h-6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                    <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                    <div className="h-2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <div className="mb-3 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                        Support Great Ideas
                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Explore All Campaigns
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                        Discover meaningful campaigns, support creators, and
                        help turn innovative ideas into reality.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!error && campaigns.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <HiOutlineCurrencyDollar className="text-3xl" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                            No campaigns available
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                            There are no approved campaigns available right
                            now. Please check back later.
                        </p>
                    </div>
                )}

                {/* Campaigns */}
                {campaigns.length > 0 && (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Showing{" "}
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {campaigns.length}
                                </span>{" "}
                                {campaigns.length === 1
                                    ? "campaign"
                                    : "campaigns"}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {campaigns.map((campaign) => (
                                <CampaignCard
                                    key={campaign._id}
                                    campaign={campaign}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default AllCampaignsPage;