"use client";

import { useState } from "react";
import { HiCreditCard, HiCheckCircle, HiSparkles } from "react-icons/hi2";
import { toast } from "react-hot-toast";

const creditPackages = [
    {
        id: "starter",
        credits: 50,
        price: 5,
        popular: false,
        description: "Perfect for supporting a few campaigns.",
    },
    {
        id: "supporter",
        credits: 100,
        price: 10,
        popular: true,
        description: "A great choice for regular supporters.",
    },
    {
        id: "champion",
        credits: 250,
        price: 25,
        popular: false,
        description: "Support more ideas and make a bigger impact.",
    },
];

export default function PurchaseCreditPage() {
    const [selectedPackage, setSelectedPackage] = useState(
        creditPackages[1]
    );
    const [loading, setLoading] = useState(false);

    const handlePurchase = async () => {
        if (!selectedPackage) {
            toast.error("Please select a credit package.");
            return;
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
            toast.error("Please login to purchase credits.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/create-credit-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        credits: selectedPackage.credits,
                        amount: selectedPackage.price,
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
                throw new Error(
                    "Checkout URL was not returned."
                );
            }

            window.location.assign(data.url);
        } catch (error) {
            console.error("Credit purchase error:", error);

            toast.error(
                error.message ||
                "Something went wrong while purchasing credits."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-8 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Supporter Wallet
                    </p>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Purchase Credits
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
                        Add credits to your CrowdFunding wallet and use them
                        to support campaigns you believe in.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-8">

                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50">
                                <HiCreditCard className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    Available Credits
                                </p>

                                <h2 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                                    0
                                </h2>
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                            <div className="flex items-start gap-3">
                                <HiSparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-indigo-400" />

                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        Support meaningful ideas
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Purchase credits and use them to
                                        contribute to campaigns on
                                        CrowdFunding.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">
                                    Selected package
                                </span>

                                <span className="font-bold text-slate-900 dark:text-white">
                                    {selectedPackage.credits} Credits
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">
                                    Amount
                                </span>

                                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                    ${selectedPackage.price}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">
                                Choose a Credit Package
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Select the package that works best for you.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {creditPackages.map((creditPackage) => {
                                const isSelected =
                                    selectedPackage.id ===
                                    creditPackage.id;

                                return (
                                    <button
                                        key={creditPackage.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedPackage(
                                                creditPackage
                                            )
                                        }
                                        className={`relative rounded-2xl border p-5 text-left transition ${isSelected
                                                ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100 dark:border-indigo-500 dark:bg-indigo-950/40 dark:shadow-black/20"
                                                : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
                                            }`}
                                    >
                                        {creditPackage.popular && (
                                            <span className="absolute -top-3 left-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white dark:bg-indigo-500">
                                                Popular
                                            </span>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">
                                                {creditPackage.credits}
                                            </span>

                                            {isSelected && (
                                                <HiCheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            )}
                                        </div>

                                        <p className="mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                            Credits
                                        </p>

                                        <div className="mt-5">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">
                                                ${creditPackage.price}
                                            </span>
                                        </div>

                                        <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                            {creditPackage.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        You are purchasing
                                    </p>

                                    <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                                        {selectedPackage.credits} Credits
                                    </h3>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Total
                                    </p>

                                    <p className="mt-1 text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                        ${selectedPackage.price}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handlePurchase}
                                disabled={loading}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                <HiCreditCard className="h-5 w-5" />

                                {loading
                                    ? "Redirecting to Stripe..."
                                    : `Purchase ${selectedPackage.credits} Credits`}
                            </button>

                            <p className="mt-4 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
                                You will be securely redirected to Stripe
                                to complete your payment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                    <div className="flex items-start gap-3">
                        <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />

                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Secure payments
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Your payment is processed securely through
                                Stripe. Credits will be added to your
                                supporter account after successful payment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
