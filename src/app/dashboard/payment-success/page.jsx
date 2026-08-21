"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    HiOutlineCheckCircle,
    HiOutlineArrowRight,
    HiOutlineReceiptPercent,
} from "react-icons/hi2";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-12">
            <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
                <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                        <HiOutlineCheckCircle className="h-12 w-12 text-emerald-500" />
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                        Payment Successful
                    </p>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        Thank You for Your Support!
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-500">
                        Your contribution has been successfully completed.
                        Thank you for supporting this campaign and helping
                        creators bring their ideas to life.
                    </p>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                <HiOutlineReceiptPercent className="h-6 w-6 text-slate-700" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-900">
                                    Payment Confirmation
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your payment has been processed successfully.
                                </p>

                                {sessionId && (
                                    <p className="mt-3 break-all text-xs text-slate-400">
                                        Session ID: {sessionId}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/dashboard/my-contributions"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            View My Contributions
                            <HiOutlineArrowRight className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/dashboard/explore-campaigns"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Explore More Campaigns
                        </Link>
                    </div>

                    <p className="mt-8 text-xs text-slate-400">
                        Thank you for being part of the CrowdFunding community.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-12">
                <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
                    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                        <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-emerald-50" />
                        <div className="mt-6 h-6 w-40 animate-pulse rounded bg-slate-200" />
                        <div className="mt-3 h-10 w-72 animate-pulse rounded bg-slate-200" />
                        <div className="mt-8 h-32 animate-pulse rounded-2xl bg-slate-200" />
                    </div>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
