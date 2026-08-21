"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    HiOutlineArrowLeft,
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
    HiOutlineTag,
    HiOutlineUserCircle,
} from "react-icons/hi2";
import CampaignDetailsInfo from "./CampaignDetailsInfo";
import CampaignContributionCard from "./CampaignContributionCard";

const CampaignDetails = ({ campaignId }) => {
    const router = useRouter();

    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("accessToken");

                if (!token) {
                    router.push(
                        `/login?redirect=/campaigns/${campaignId}`
                    );
                    return;
                }

                const response = await fetch(
                    `http://localhost:5000/api/campaigns/${campaignId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    localStorage.removeItem("accessToken");

                    router.push(
                        `/login?redirect=/campaigns/${campaignId}`
                    );

                    return;
                }

                if (response.status === 404) {
                    throw new Error("Campaign not found.");
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch campaign");
                }

                const data = await response.json();

                if (data.success) {
                    setCampaign(data.campaign);
                } else {
                    throw new Error(
                        data.message || "Campaign not found."
                    );
                }
            } catch (error) {
                console.error("Campaign details error:", error);

                setError(
                    error.message ||
                    "Unable to load this campaign. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        if (campaignId) {
            fetchCampaign();
        }
    }, [campaignId, router]);

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString();
    };

    const formatDate = (date) => {
        if (!date) return "No deadline";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateProgress = (raised, goal) => {
        if (!goal || goal <= 0) return 0;

        return Math.min(
            (Number(raised || 0) / Number(goal)) * 100,
            100
        );
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="h-105 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

                            <div className="mt-6 space-y-4">
                                <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="h-5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="h-5 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                            </div>
                        </div>

                        <div className="h-105 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !campaign) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10">
                        <HiOutlineCheckCircle className="text-3xl" />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                        Campaign Not Found
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {error ||
                            "The campaign you are looking for does not exist."}
                    </p>

                    <Link
                        href="/campaigns"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        <HiOutlineArrowLeft />
                        Back to Campaigns
                    </Link>
                </div>
            </main>
        );
    }

    const progress = calculateProgress(
        campaign.total_contributed,
        campaign.funding_goal
    );

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Back Button */}
                <Link
                    href="/campaigns"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                    <HiOutlineArrowLeft className="text-lg" />
                    Back to Campaigns
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Campaign Image */}
                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="relative h-75 sm:h-105">
                                {campaign.campaign_image_url ? (
                                    <Image
                                        src={campaign.campaign_image_url}
                                        alt={campaign.campaign_title}
                                        fill
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-slate-100 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-slate-800">
                                        <HiOutlineCurrencyDollar className="text-8xl text-indigo-400" />
                                    </div>
                                )}

                                <div className="absolute left-5 top-5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white dark:bg-indigo-500">
                                    {campaign.category}
                                </div>

                                <div className="absolute right-5 top-5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold capitalize text-white">
                                    {campaign.status}
                                </div>
                            </div>
                        </div>

                        {/* Campaign Heading */}
                        <div className="mt-8">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                {campaign.campaign_title}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <HiOutlineUserCircle className="text-lg" />
                                    <span>Campaign Creator</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <HiOutlineTag className="text-lg" />
                                    <span>{campaign.category}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <HiOutlineCalendarDays className="text-lg" />
                                    <span>
                                        Ends {formatDate(campaign.deadline)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Story */}
                        <CampaignDetailsInfo campaign={campaign} />
                    </div>

                    {/* Contribution Card */}
                    <div>
                        <CampaignContributionCard
                            campaign={campaign}
                            progress={progress}
                            formatAmount={formatAmount}
                            formatDate={formatDate}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CampaignDetails;
