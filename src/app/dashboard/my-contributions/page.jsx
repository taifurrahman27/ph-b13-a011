"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    HiCheckCircle,
    HiArrowLeft,
    HiHeart,
} from "react-icons/hi2";

export default function MyContributionsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const payment = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    const isPaymentSuccess =
        payment === "success" && Boolean(sessionId);

    if (isPaymentSuccess) {
        return (
            <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 transition-colors dark:bg-slate-950">
                <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
                    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-12">

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

                        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 text-left transition-colors dark:border-indigo-900/50 dark:bg-indigo-950/30">
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

                        <div className="mx-auto mt-8 max-w-md rounded-xl bg-slate-50 px-4 py-3 transition-colors dark:bg-slate-800/70">
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

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
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
            </div>
        </div>
    );
}
