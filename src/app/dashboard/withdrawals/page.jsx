"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const CREATOR_CREDITS_PER_DOLLAR = 20;
const MINIMUM_WITHDRAWAL_CREDITS = 200;

const CreatorWithdrawalsPage = () => {
    const [user, setUser] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [creditsToWithdraw, setCreditsToWithdraw] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const totalRaisedCredits = useMemo(() => {
        return contributions
            .filter(
                (contribution) =>
                    String(contribution.status || "").toLowerCase() ===
                    "approved"
            )
            .reduce((total, contribution) => {
                const credits = Number(
                    contribution.contribution_credit || 0
                );

                return total + (Number.isFinite(credits) ? credits : 0);
            }, 0);
    }, [contributions]);

    const withdrawalValue = useMemo(() => {
        return totalRaisedCredits / CREATOR_CREDITS_PER_DOLLAR;
    }, [totalRaisedCredits]);

    const enteredCredits = Number(creditsToWithdraw);

    const enteredWithdrawalAmount = useMemo(() => {
        if (
            !Number.isFinite(enteredCredits) ||
            enteredCredits <= 0
        ) {
            return 0;
        }

        return enteredCredits / CREATOR_CREDITS_PER_DOLLAR;
    }, [enteredCredits]);

    const pendingWithdrawals = useMemo(() => {
        return withdrawals
            .filter(
                (withdrawal) =>
                    String(withdrawal.status || "").toLowerCase() ===
                    "pending"
            )
            .reduce((total, withdrawal) => {
                const credits = Number(withdrawal.amount || 0);

                return (
                    total +
                    (Number.isFinite(credits) ? credits : 0)
                );
            }, 0);
    }, [withdrawals]);

    const approvedWithdrawals = useMemo(() => {
        return withdrawals
            .filter(
                (withdrawal) =>
                    String(withdrawal.status || "").toLowerCase() ===
                    "approved"
            )
            .reduce((total, withdrawal) => {
                const credits = Number(withdrawal.amount || 0);

                return (
                    total +
                    (Number.isFinite(credits) ? credits : 0)
                );
            }, 0);
    }, [withdrawals]);

    const pendingWithdrawalValue =
        pendingWithdrawals / CREATOR_CREDITS_PER_DOLLAR;

    const approvedWithdrawalValue =
        approvedWithdrawals / CREATOR_CREDITS_PER_DOLLAR;

    const hasMinimumCredits =
        totalRaisedCredits >= MINIMUM_WITHDRAWAL_CREDITS;

    const canWithdraw =
        hasMinimumCredits &&
        Number.isFinite(enteredCredits) &&
        Number.isInteger(enteredCredits) &&
        enteredCredits >= MINIMUM_WITHDRAWAL_CREDITS &&
        enteredCredits <= totalRaisedCredits &&
        !submitting;

    useEffect(() => {
        let cancelled = false;

        const loadWithdrawalData = async () => {
            try {
                setLoading(true);
                setError("");

                const storedUser = localStorage.getItem("user");
                const accessToken =
                    localStorage.getItem("accessToken");

                if (!storedUser) {
                    throw new Error(
                        "You must be logged in to access withdrawals."
                    );
                }

                let parsedUser;

                try {
                    parsedUser = JSON.parse(storedUser);
                } catch {
                    throw new Error("Invalid user session.");
                }

                const creatorId =
                    parsedUser?.id || parsedUser?._id;

                if (!creatorId) {
                    throw new Error(
                        "Creator information is missing. Please log in again."
                    );
                }

                if (
                    parsedUser?.role &&
                    String(parsedUser.role).toLowerCase() !==
                    "creator"
                ) {
                    throw new Error(
                        "Only creators can access withdrawals."
                    );
                }

                if (!cancelled) {
                    setUser(parsedUser);
                }

                const headers = {
                    "Content-Type": "application/json",
                };

                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }

                const withdrawalResponse = await fetch(
                    `${API_URL}/api/withdrawals/creator/${creatorId}`,
                    {
                        method: "GET",
                        headers,
                        cache: "no-store",
                    }
                );

                const withdrawalData =
                    await withdrawalResponse.json();

                if (!withdrawalResponse.ok) {
                    throw new Error(
                        withdrawalData.message ||
                        "Failed to load withdrawal information."
                    );
                }

                const contributionResponse = await fetch(
                    `${API_URL}/api/contributions/creator/my-contributions`,
                    {
                        method: "GET",
                        headers,
                        cache: "no-store",
                    }
                );

                const contributionData =
                    await contributionResponse.json();

                if (!contributionResponse.ok) {
                    throw new Error(
                        contributionData.message ||
                        "Failed to load contribution information."
                    );
                }

                if (cancelled) {
                    return;
                }

                setWithdrawals(
                    withdrawalData.withdrawals || []
                );

                setContributions(
                    contributionData.contributions || []
                );
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message ||
                        "Failed to load withdrawal information."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadWithdrawalData();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleCreditsChange = (event) => {
        const value = event.target.value;

        if (value === "") {
            setCreditsToWithdraw("");
            return;
        }

        const credits = Number(value);

        if (!Number.isFinite(credits)) {
            return;
        }

        if (credits > totalRaisedCredits) {
            setCreditsToWithdraw(
                String(totalRaisedCredits)
            );
            return;
        }

        setCreditsToWithdraw(value);
    };

    const handleWithdraw = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const credits = Number(creditsToWithdraw);

        if (!user) {
            setError(
                "User information is missing. Please log in again."
            );
            return;
        }

        const creatorId = user.id || user._id;

        if (!creatorId) {
            setError(
                "Creator information is missing. Please log in again."
            );
            return;
        }

        if (totalRaisedCredits < MINIMUM_WITHDRAWAL_CREDITS) {
            setError(
                "Insufficient raised credits. You need at least 200 credits to request a withdrawal."
            );
            return;
        }

        if (
            !Number.isFinite(credits) ||
            !Number.isInteger(credits)
        ) {
            setError(
                "Credits to withdraw must be a whole number."
            );
            return;
        }

        if (credits < MINIMUM_WITHDRAWAL_CREDITS) {
            setError(
                "The minimum withdrawal is 200 credits ($10)."
            );
            return;
        }

        if (credits > totalRaisedCredits) {
            setError(
                "Withdrawal credits cannot be greater than your raised credits."
            );
            return;
        }

        const accessToken =
            localStorage.getItem("accessToken");

        try {
            setSubmitting(true);

            const headers = {
                "Content-Type": "application/json",
            };

            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }

            const response = await fetch(
                `${API_URL}/api/withdrawals`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        creatorId,
                        amount: credits,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to submit withdrawal request."
                );
            }

            if (data.withdrawal) {
                setWithdrawals((previous) => [
                    data.withdrawal,
                    ...previous,
                ]);
            }

            setSuccess(
                "Your withdrawal request has been submitted successfully."
            );

            setCreditsToWithdraw("");
        } catch (err) {
            setError(
                err.message ||
                "Failed to submit withdrawal request."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Creator Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                        Withdrawals
                    </h1>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Loading your withdrawal information...
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Creator Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Withdrawals
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Withdraw your raised creator credits.
                    You can request a withdrawal once you have
                    at least 200 approved contribution credits.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                    {success}
                </div>
            )}

            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Raised Credits
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                        {totalRaisedCredits.toLocaleString()}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        approved contribution credits
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Withdrawal Value
                    </p>

                    <p className="mt-2 text-3xl font-black text-indigo-600 dark:text-indigo-400">
                        ${withdrawalValue.toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        20 credits = $1
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Pending Withdrawals
                    </p>

                    <p className="mt-2 text-3xl font-black text-amber-600 dark:text-amber-400">
                        ${pendingWithdrawalValue.toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {pendingWithdrawals.toLocaleString()} credits pending
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Approved Withdrawals
                    </p>

                    <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        ${approvedWithdrawalValue.toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {approvedWithdrawals.toLocaleString()} credits withdrawn
                    </p>
                </div>
            </div>

            <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                            Request Withdrawal
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            You need at least 200 raised
                            credits, equivalent to $10, to
                            request a withdrawal.
                        </p>
                    </div>

                    <form
                        onSubmit={handleWithdraw}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="creditsToWithdraw"
                                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                            >
                                Credits To Withdraw
                            </label>

                            <input
                                id="creditsToWithdraw"
                                type="number"
                                min={MINIMUM_WITHDRAWAL_CREDITS}
                                max={totalRaisedCredits}
                                step="1"
                                value={creditsToWithdraw}
                                onChange={handleCreditsChange}
                                placeholder="Enter credits"
                                disabled={!hasMinimumCredits}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-800"
                            />

                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                Raised:{" "}
                                {totalRaisedCredits.toLocaleString()}{" "}
                                credits
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="withdrawalAmount"
                                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                            >
                                Withdraw Amount ($)
                            </label>

                            <input
                                id="withdrawalAmount"
                                type="text"
                                value={`$${enteredWithdrawalAmount.toFixed(2)}`}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            />

                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                20 credits = $1
                            </p>
                        </div>

                        {!hasMinimumCredits ? (
                            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
                                Insufficient raised credits.
                                You need at least 200 credits
                                ($10).
                            </div>
                        ) : (
                            <button
                                type="submit"
                                disabled={!canWithdraw}
                                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Withdraw"}
                            </button>
                        )}
                    </form>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                            Withdrawal Information
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Your withdrawal balance is
                            calculated from approved
                            contributions.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Total raised credits
                                </span>

                                <span className="text-sm font-black text-slate-900 dark:text-white">
                                    {totalRaisedCredits.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950/30">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                    Current withdrawal value
                                </span>

                                <span className="text-lg font-black text-indigo-700 dark:text-indigo-300">
                                    ${withdrawalValue.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                    Creator withdrawal rate
                                </span>

                                <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                                    20 credits = $1
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Minimum withdrawal
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Creators must have at least
                                200 approved contribution
                                credits, equivalent to $10.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Pending request value
                                </span>

                                <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                                    ${pendingWithdrawalValue.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Approved withdrawal value
                                </span>

                                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                    ${approvedWithdrawalValue.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                        Withdrawal History
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        View your submitted withdrawal
                        requests and their current status.
                    </p>
                </div>

                {withdrawals.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            No withdrawal requests yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-162.5 text-left">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Credits
                                    </th>

                                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Amount
                                    </th>

                                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {withdrawals.map((withdrawal) => {
                                    const credits = Number(
                                        withdrawal.amount || 0
                                    );

                                    const dollarAmount =
                                        credits /
                                        CREATOR_CREDITS_PER_DOLLAR;

                                    const status = String(
                                        withdrawal.status || ""
                                    ).toLowerCase();

                                    return (
                                        <tr
                                            key={withdrawal._id}
                                            className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                                        >
                                            <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                {credits.toLocaleString()}
                                            </td>

                                            <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                $
                                                {dollarAmount.toFixed(
                                                    2
                                                )}
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${status ===
                                                        "approved"
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                        : status ===
                                                            "rejected"
                                                            ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                                        }`}
                                                >
                                                    {status ||
                                                        "pending"}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                {withdrawal.createdAt
                                                    ? new Date(
                                                        withdrawal.createdAt
                                                    ).toLocaleDateString()
                                                    : "—"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );

};

export default CreatorWithdrawalsPage;
