"use client";

import { useState } from "react";
import {
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";

const CampaignContributionCard = ({
    campaign,
    progress,
    formatAmount,
    formatDate,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [credits, setCredits] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContribute = async () => {
        const contributionCredits = Number(credits);

        if (!contributionCredits || contributionCredits <= 0) {
            toast.error("Please enter a valid credit amount.");
            return;
        }

        if (
            campaign.minimum_Contribution &&
            contributionCredits < Number(campaign.minimum_Contribution)
        ) {
            toast.error(
                `Minimum contribution is ${Number(
                    campaign.minimum_Contribution
                ).toLocaleString()} credits.`
            );
            return;
        }

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            toast.error("Please login to contribute.");
            return;
        }

        let user;

        try {
            user = JSON.parse(storedUser);
        } catch {
            toast.error("Invalid user session.");
            return;
        }

        if (!user?.id) {
            toast.error("Please login to contribute.");
            return;
        }

        if (user.role !== "supporter") {
            toast.error("Only supporters can contribute to campaigns.");
            return;
        }

        const availableCredits = Number(user.credits || 0);

        if (contributionCredits > availableCredits) {
            toast.error(
                `You only have ${availableCredits.toLocaleString()} credits available.`
            );
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("accessToken");

            if (!token) {
                toast.error("Please login again.");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contributions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        campaignId: campaign._id,
                        credits: contributionCredits,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to make contribution."
                );
            }

            const updatedCredits =
                data.remainingCredits !== undefined
                    ? Number(data.remainingCredits)
                    : availableCredits - contributionCredits;

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...user,
                    credits: updatedCredits,
                })
            );

            toast.success("Contribution submitted successfully.");

            setCredits("");
            setShowForm(false);

            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Contribution error:", error);

            toast.error(
                error.message ||
                "Something went wrong while making your contribution."
            );
        } finally {
            setLoading(false);
        }
    };

    const contributionDollarAmount =
        Number(credits || 0) / 10;

    return (
        <aside className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Total Raised
                        </p>

                        <h2 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                            ${formatAmount(campaign.total_contributed)}
                        </h2>
                    </div>

                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-700 dark:bg-indigo-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                        Raised
                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">
                        ${formatAmount(campaign.total_contributed)}
                    </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                        Funding Goal
                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">
                        ${formatAmount(campaign.funding_goal)}
                    </span>
                </div>
            </div>

            <div className="my-6 h-px bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <HiOutlineCurrencyDollar />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Minimum Contribution
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                            {Number(
                                campaign.minimum_Contribution || 0
                            ).toLocaleString()}{" "}
                            Credits
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            $
                            {(
                                Number(
                                    campaign.minimum_Contribution || 0
                                ) / 10
                            ).toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <HiOutlineCalendarDays />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Campaign Deadline
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                            {formatDate(campaign.deadline)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <HiOutlineCheckCircle />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Campaign Status
                        </p>

                        <p className="mt-1 text-sm font-bold capitalize text-emerald-600 dark:text-emerald-400">
                            {campaign.status}
                        </p>
                    </div>
                </div>
            </div>

            {!showForm ? (
                <>
                    <button
                        type="button"
                        onClick={() => {
                            const storedUser =
                                localStorage.getItem("user");

                            if (!storedUser) {
                                toast.error(
                                    "Please login to contribute."
                                );
                                return;
                            }

                            setShowForm(true);
                        }}
                        className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        Contribute to This Campaign
                    </button>

                    <p className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Your credits help this creator reach their funding
                        goal.
                    </p>
                </>
            ) : (
                <div className="mt-7 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Make a Contribution
                            </p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                10 credits = $1
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setCredits("");
                            }}
                            className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="contributionCredits"
                            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Credits to Contribute
                        </label>

                        <input
                            id="contributionCredits"
                            type="number"
                            min={campaign.minimum_Contribution || 1}
                            step="1"
                            value={credits}
                            onChange={(event) =>
                                setCredits(event.target.value)
                            }
                            placeholder="Enter credits"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                    </div>

                    <div className="mt-4 rounded-xl bg-white p-4 dark:bg-slate-900">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">
                                Credits
                            </span>

                            <span className="font-bold text-slate-900 dark:text-white">
                                {Number(credits || 0).toLocaleString()}
                            </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">
                                Contribution Value
                            </span>

                            <span className="font-black text-indigo-600 dark:text-indigo-400">
                                ${contributionDollarAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleContribute}
                        disabled={loading}
                        className="mt-4 w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        {loading
                            ? "Processing..."
                            : "Confirm Contribution"}
                    </button>
                </div>
            )}

            <p className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                Contributions are made using your available CrowdFunding
                credits.
            </p>
        </aside>
    );
};

export default CampaignContributionCard;