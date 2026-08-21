"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
    HiCheckCircle,
    HiArrowLeft,
    HiHeart,
    HiOutlineCalendarDays,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";

import { toast } from "react-hot-toast";

function MyContributionsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const payment = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    const isPaymentSuccess =
        payment === "success" && Boolean(sessionId);

    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(!isPaymentSuccess);

    useEffect(() => {
        if (isPaymentSuccess) {
            return;
        }

        const fetchContributions = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    toast.error("Please login to view your contributions.");
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contributions/my-contributions`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch contributions."
                    );
                }

                setContributions(data.contributions || []);
            } catch (error) {
                console.error(
                    "Fetch contributions error:",
                    error
                );

                toast.error(
                    error.message ||
                    "Failed to load contributions."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [isPaymentSuccess]);

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isPaymentSuccess) {
        return (
            <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 transition-colors dark:bg-slate-950">
                <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
                    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-12">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60">
                            <HiCheckCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            Payment Successful!
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">
                            Thank you for supporting this campaign.
                            Your contribution has been successfully
                            processed.
                        </p>

                        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 text-left dark:border-indigo-900/50 dark:bg-indigo-950/30">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/60">
                                    <HiHeart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        Contribution Confirmed
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Your payment was completed securely
                                        through Stripe.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/dashboard/explore-campaigns"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                <HiArrowLeft className="h-5 w-5" />
                                Explore More Campaigns
                            </Link>

                            <button
                                type="button"
                                onClick={() =>
                                    router.replace(
                                        "/dashboard/my-contributions"
                                    )
                                }
                                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                            >
                                View My Contributions
                            </button>
                        </div>

                        <div className="mx-auto mt-8 max-w-md rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Stripe payment session
                            </p>

                            <p className="mt-1 break-all text-xs font-medium text-slate-500 dark:text-slate-400">
                                {sessionId}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 dark:bg-slate-950">
                <div className="mx-auto max-w-6xl">
                    <div className="h-10 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-3 h-5 w-80 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-8 space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-36 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 transition-colors dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        My Contributions
                    </h1>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        View and manage your campaign contributions.
                    </p>
                </div>

                {contributions.length === 0 ? (
                    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50">
                            <HiHeart className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                            No contributions to display
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Your successful campaign contributions will appear
                            here.
                        </p>

                        <Link
                            href="/dashboard/explore-campaigns"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            Explore Campaigns
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 space-y-5">
                        {contributions.map((contribution) => (
                            <div
                                key={contribution._id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50">
                                            <HiHeart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-black text-slate-900 dark:text-white">
                                                {contribution.campaignTitle ||
                                                    "Campaign"}
                                            </h2>

                                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                                                <span className="flex items-center gap-1.5">
                                                    <HiOutlineCalendarDays className="h-4 w-4" />
                                                    {formatDate(
                                                        contribution.contribution_date
                                                    )}
                                                </span>

                                                <span className="flex items-center gap-1.5">
                                                    <HiOutlineCurrencyDollar className="h-4 w-4" />
                                                    $
                                                    {formatAmount(
                                                        contribution.contribution_amount
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <div className="rounded-xl bg-indigo-50 px-5 py-3 text-center dark:bg-indigo-950/40">
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                Contribution
                                            </p>

                                            <p className="mt-1 text-lg font-black text-indigo-600 dark:text-indigo-400">
                                                {Number(
                                                    contribution.contribution_credit ||
                                                    0
                                                ).toLocaleString(
                                                    "en-US"
                                                )}{" "}
                                                Credits
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-xl px-5 py-3 text-center ${contribution.status ===
                                                    "completed"
                                                    ? "bg-emerald-50 dark:bg-emerald-950/30"
                                                    : "bg-amber-50 dark:bg-amber-950/30"
                                                }`}
                                        >
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                Status
                                            </p>

                                            <p
                                                className={`mt-1 text-sm font-black capitalize ${contribution.status ===
                                                        "completed"
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : "text-amber-600 dark:text-amber-400"
                                                    }`}
                                            >
                                                {contribution.status ||
                                                    "completed"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MyContributionsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 dark:bg-slate-950">
                    <div className="mx-auto max-w-6xl">
                        <div className="h-10 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-3 h-5 w-80 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-8 h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            }
        >
            <MyContributionsContent />
        </Suspense>
    );
}