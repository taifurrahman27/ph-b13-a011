"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiCheckCircle, HiCreditCard } from "react-icons/hi2";
import { toast } from "react-hot-toast";

const PurchaseSuccessPage = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [purchase, setPurchase] = useState(null);

    useEffect(() => {
        const confirmPurchase = async () => {
            try {
                const params = new URLSearchParams(
                    window.location.search
                );

                const sessionId = params.get("session_id");

                if (!sessionId) {
                    setError("Stripe session ID is missing.");
                    setLoading(false);
                    return;
                }

                const token =
                    localStorage.getItem("accessToken");

                if (!token) {
                    setError("Please login again.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/confirm-credit-purchase`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            sessionId,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to confirm payment."
                    );
                }

                setPurchase(data.payment);
                setSuccess(true);

                // Update local user data with latest credits
                const storedUser =
                    localStorage.getItem("user");

                if (storedUser) {
                    try {
                        const user =
                            JSON.parse(storedUser);

                        const updatedUser = {
                            ...user,
                            credits: data.credits,
                        };

                        localStorage.setItem(
                            "user",
                            JSON.stringify(updatedUser)
                        );
                    } catch (error) {
                        console.error(
                            "Failed to update local user:",
                            error
                        );
                    }
                }

                toast.success(
                    "Credits added successfully!"
                );
            } catch (error) {
                console.error(
                    "Purchase confirmation error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to confirm your purchase."
                );
            } finally {
                setLoading(false);
            }
        };

        confirmPurchase();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />

                    <h1 className="mt-6 text-2xl font-black text-slate-900 dark:text-white">
                        Confirming Payment
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Please wait while we verify your
                        Stripe payment and add your credits.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-slate-900">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                        <HiCreditCard className="h-7 w-7 text-red-600 dark:text-red-400" />
                    </div>

                    <h1 className="mt-6 text-2xl font-black text-slate-900 dark:text-white">
                        Payment Confirmation Failed
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {error}
                    </p>

                    <Link
                        href="/dashboard/purchase-credit"
                        className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                        Back to Purchase Credits
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-8 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
                    <HiCheckCircle className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Payment Successful
                </p>

                <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                    Credits Added!
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Your Stripe payment was successfully
                    verified and your credits have been added
                    to your CrowdFunding account.
                </p>

                {purchase && (
                    <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left dark:bg-slate-800/60">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                Credits Purchased
                            </span>

                            <span className="font-black text-slate-900 dark:text-white">
                                {Number(
                                    purchase.credits || 0
                                ).toLocaleString()}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                Amount Paid
                            </span>

                            <span className="font-black text-indigo-600 dark:text-indigo-400">
                                $
                                {Number(
                                    purchase.amount || 0
                                ).toFixed(2)}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                Payment Method
                            </span>

                            <span className="font-bold text-slate-900 dark:text-white">
                                Stripe
                            </span>
                        </div>
                    </div>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link
                        href="/dashboard/purchase-credit"
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Buy More Credits
                    </Link>

                    <Link
                        href="/dashboard"
                        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PurchaseSuccessPage;
