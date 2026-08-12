"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineFunnel,
    HiOutlineHeart,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const categories = [
    "All",
    "Education",
    "Environment",
    "Business",
    "Health",
    "Technology",
];

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const ExploreCampaignPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchCampaigns = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/campaigns`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load campaigns."
                    );
                }

                if (!cancelled) {
                    setCampaigns(data.campaigns || []);
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error.message ||
                        "Failed to load campaigns."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchCampaigns();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredCampaigns = useMemo(() => {
        const searchTerm = search.trim().toLowerCase();

        return campaigns.filter((campaign) => {
            const title =
                campaign.campaign_title?.toLowerCase() || "";

            const story =
                campaign.campaign_story?.toLowerCase() || "";

            const campaignCategory =
                campaign.category || "";

            const matchesSearch =
                !searchTerm ||
                title.includes(searchTerm) ||
                story.includes(searchTerm);

            const matchesCategory =
                category === "All" ||
                campaignCategory === category;

            return matchesSearch && matchesCategory;
        });
    }, [campaigns, search, category]);

    const getPercentage = (campaign) => {
        const goal = Number(campaign.funding_goal) || 0;
        const contributed =
            Number(campaign.total_contributed) || 0;

        if (goal <= 0) {
            return 0;
        }

        return Math.min(
            Math.round((contributed / goal) * 100),
            100
        );
    };

    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [contributionAmount, setContributionAmount] = useState("");
    const [supportError, setSupportError] = useState("");

    const handleContribution = async () => {
        if (!selectedCampaign) {
            return;
        }

        const amount = Number(contributionAmount);
        const minimumContribution = Number(
            selectedCampaign.minimum_Contribution
        );

        if (!contributionAmount) {
            setSupportError("Please enter a contribution amount.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            setSupportError("Please enter a valid contribution amount.");
            return;
        }

        if (amount < minimumContribution) {
            setSupportError(
                `Minimum contribution is $${minimumContribution}.`
            );
            return;
        }

        try {
            setSupportError("");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        campaignId: selectedCampaign._id,
                        amount,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to start payment."
                );
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            setSupportError(
                error.message || "Failed to start payment."
            );
        }
    };

    const handleSupport = async (campaign) => {
        try {
            const token = localStorage.getItem("accessToken");

            console.log("Token:", token);

            if (!token) {
                toast.error("Please login to support a campaign.");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        campaignId: campaign._id,
                        amount: campaign.minimum_Contribution,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create checkout session."
                );
            }

            if (!data.url) {
                throw new Error("Checkout URL was not returned.");
            }

            window.location.assign(data.url);
        } catch (error) {
            console.error("Support error:", error);

            toast.error(
                error.message || "Something went wrong."
            );
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Discover
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Explore Campaigns
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Discover meaningful campaigns and support
                    creators working on projects that matter.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1">
                    <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search campaigns..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                    <HiOutlineFunnel className="h-5 w-5 shrink-0 text-slate-400" />

                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setCategory(item)}
                            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition ${category === item
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="h-52 animate-pulse bg-slate-200 dark:bg-slate-800" />

                            <div className="space-y-4 p-5">
                                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="h-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="h-2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/50 dark:bg-red-950/30">
                    <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                        Failed to load campaigns
                    </h2>

                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </p>
                </div>
            )}

            {/* Campaigns */}
            {!loading && !error && filteredCampaigns.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredCampaigns.map((campaign) => {
                        const percentage =
                            getPercentage(campaign);

                        const goal =
                            Number(campaign.funding_goal) || 0;

                        const raised =
                            Number(
                                campaign.total_contributed
                            ) || 0;

                        return (
                            <article
                                key={campaign._id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    {campaign.campaign_image_url ? (
                                        <Image
                                            src={
                                                campaign.campaign_image_url
                                            }
                                            alt={
                                                campaign.campaign_title ||
                                                "Campaign"
                                            }
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition duration-500 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
                                            No campaign image
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-indigo-600 backdrop-blur dark:bg-slate-950/90 dark:text-indigo-400">
                                        {campaign.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h2 className="line-clamp-1 text-xl font-bold text-slate-950 dark:text-white">
                                        {campaign.campaign_title}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {campaign.campaign_story}
                                    </p>

                                    {/* Progress */}
                                    <div className="mt-5">
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                $
                                                {raised.toLocaleString()}
                                            </span>

                                            <span className="font-semibold text-slate-500 dark:text-slate-400">
                                                {percentage}%
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>

                                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                            <span>
                                                Goal $
                                                {goal.toLocaleString()}
                                            </span>

                                            <span>
                                                Minimum $
                                                {Number(
                                                    campaign.minimum_Contribution
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                                        >
                                            <HiOutlineHeart className="h-5 w-5" />
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleSupport(campaign)}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                                        >
                                            <HiOutlineCurrencyDollar className="h-5 w-5" />
                                            Support
                                        </button>

                                        {selectedCampaign && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
                                                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                                                Support Campaign
                                                            </p>

                                                            <h2 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                                                                {selectedCampaign.campaign_title}
                                                            </h2>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedCampaign(null)}
                                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                                                            aria-label="Close"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>

                                                    <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-slate-500 dark:text-slate-400">
                                                                Campaign goal
                                                            </span>

                                                            <span className="font-bold text-slate-900 dark:text-white">
                                                                ${Number(
                                                                    selectedCampaign.funding_goal
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>

                                                        <div className="mt-2 flex items-center justify-between text-sm">
                                                            <span className="text-slate-500 dark:text-slate-400">
                                                                Minimum contribution
                                                            </span>

                                                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                                                ${Number(
                                                                    selectedCampaign.minimum_Contribution
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6">
                                                        <label
                                                            htmlFor="contributionAmount"
                                                            className="mb-2 block text-sm font-bold text-slate-900 dark:text-white"
                                                        >
                                                            Contribution Amount
                                                        </label>

                                                        <div className="relative">
                                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                                                                $
                                                            </span>

                                                            <input
                                                                id="contributionAmount"
                                                                type="number"
                                                                min={selectedCampaign.minimum_Contribution}
                                                                step="0.01"
                                                                value={contributionAmount}
                                                                onChange={(event) => {
                                                                    setContributionAmount(
                                                                        event.target.value
                                                                    );
                                                                    setSupportError("");
                                                                }}
                                                                placeholder={`Minimum $${selectedCampaign.minimum_Contribution}`}
                                                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                            />
                                                        </div>

                                                        {supportError && (
                                                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                                                {supportError}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleContribution()}
                                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-500"
                                                    >
                                                        <HiOutlineCurrencyDollar className="h-5 w-5" />
                                                        Continue to Payment
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading &&
                !error &&
                filteredCampaigns.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                        <HiOutlineMagnifyingGlass className="mx-auto h-10 w-10 text-slate-400" />

                        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                            No campaigns found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Try changing your search or selecting
                            another category.
                        </p>
                    </div>
                )}
        </div>
    );
};

export default ExploreCampaignPage;