"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const CreatorWithdrawalsPage = () => {
    const [user, setUser] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [totalRaisedCredits, setTotalRaisedCredits] = useState(0);

    const [creditsToWithdraw, setCreditsToWithdraw] = useState("");
    const [paymentSystem, setPaymentSystem] = useState("Stripe");
    const [accountNumber, setAccountNumber] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const MINIMUM_WITHDRAWAL_CREDITS = 200;
    const CREDITS_PER_DOLLAR = 20;

    const withdrawalAmount = useMemo(() => {
        const credits = Number(creditsToWithdraw);

        if (!credits || credits <= 0) {
            return 0;
        }

        return credits / CREDITS_PER_DOLLAR;
    }, [creditsToWithdraw]);

    const totalEarnings = useMemo(() => {
        return totalRaisedCredits / CREDITS_PER_DOLLAR;
    }, [totalRaisedCredits]);

    const pendingWithdrawals = useMemo(() => {
        return withdrawals
            .filter(
                (withdrawal) =>
                    String(withdrawal.status || "").toLowerCase() === "pending"
            )
            .reduce(
                (total, withdrawal) =>
                    total + Number(withdrawal.withdrawal_amount || 0),
                0
            );
    }, [withdrawals]);

    const canWithdraw =
        totalRaisedCredits >= MINIMUM_WITHDRAWAL_CREDITS &&
        Number(creditsToWithdraw) >= MINIMUM_WITHDRAWAL_CREDITS &&
        Number(creditsToWithdraw) <= totalRaisedCredits &&
        Number(withdrawalAmount) > 0 &&
        accountNumber.trim().length > 0 &&
        !submitting;

    useEffect(() => {
        let cancelled = false;

        const fetchWithdrawals = async () => {
            try {
                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    if (!cancelled) {
                        setError("You must be logged in.");
                        setLoading(false);
                    }
                    return;
                }

                let parsedUser;

                try {
                    parsedUser = JSON.parse(storedUser);
                } catch {
                    if (!cancelled) {
                        setError("Invalid user session.");
                        setLoading(false);
                    }
                    return;
                }

                if (!parsedUser?.id) {
                    if (!cancelled) {
                        setError("You must be logged in.");
                        setLoading(false);
                    }
                    return;
                }

                if (!cancelled) {
                    setUser(parsedUser);
                }

                const response = await fetch(
                    `${API_URL}/api/withdrawals/creator/${parsedUser.id}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load withdrawal information."
                    );
                }

                if (!cancelled) {
                    setWithdrawals(data.withdrawals || []);


                    setTotalRaisedCredits(
                        Number(data.totalRaisedCredits || 0)
                    );

                    setError("");
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error.message ||
                        "Failed to load withdrawal information."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchWithdrawals();

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

        if (Number.isNaN(credits)) {
            return;
        }

        if (credits > totalRaisedCredits) {
            setCreditsToWithdraw(String(totalRaisedCredits));
            return;
        }

        setCreditsToWithdraw(value);
    };

    const handleWithdraw = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const credits = Number(creditsToWithdraw);

        if (totalRaisedCredits < MINIMUM_WITHDRAWAL_CREDITS) {
            setError(
                "Insufficient credit. You need at least 200 raised credits to withdraw."
            );
            return;
        }

        if (credits < MINIMUM_WITHDRAWAL_CREDITS) {
            setError("The minimum withdrawal is 200 credits.");
            return;
        }

        if (credits > totalRaisedCredits) {
            setError("Credits to withdraw cannot exceed your raised credits.");
            return;
        }

        if (!accountNumber.trim()) {
            setError("Please enter your account number.");
            return;
        }

        if (!user?.email || !user?.name) {
            setError("User information is missing. Please log in again.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(
                `${API_URL}/api/withdrawals`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        creator_email: user.email,
                        creator_name: user.name,
                        withdrawal_credit: credits,
                        withdrawal_amount: withdrawalAmount,
                        payment_system: paymentSystem,
                        account_number: accountNumber.trim(),
                        withdraw_date: new Date().toISOString(),
                        status: "pending",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to submit withdrawal request."
                );
            }

            const newWithdrawal = data.withdrawal;

            if (newWithdrawal) {
                setWithdrawals((previous) => [
                    newWithdrawal,
                    ...previous,
                ]);
            }

            setSuccess(
                "Your withdrawal request has been submitted successfully."
            );

            setCreditsToWithdraw("");
            setAccountNumber("");
            setPaymentSystem("Stripe");
        } catch (error) {
            setError(
                error.message || "Failed to submit withdrawal request."
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

                <div className="grid gap-4 sm:grid-cols-3">
                    {[1, 2, 3].map((item) => (
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
                    Withdraw your raised credits and manage your withdrawal
                    requests.
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

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Raised Credits
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                        {totalRaisedCredits.toLocaleString()}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        credits raised
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Withdrawal Value
                    </p>

                    <p className="mt-2 text-3xl font-black text-indigo-600 dark:text-indigo-400">
                        ${totalEarnings.toFixed(2)}
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
                        ${pendingWithdrawals.toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        awaiting processing
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
                            You need at least 200 raised credits to request a
                            withdrawal.
                        </p>
                    </div>

                    <form onSubmit={handleWithdraw} className="space-y-5">
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
                                disabled={
                                    totalRaisedCredits <
                                    MINIMUM_WITHDRAWAL_CREDITS
                                }
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-800"
                            />

                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                Available:{" "}
                                {totalRaisedCredits.toLocaleString()} credits
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
                                type="number"
                                value={withdrawalAmount.toFixed(2)}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            />

                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                20 credits = $1
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="paymentSystem"
                                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                            >
                                Select Payment System
                            </label>

                            <select
                                id="paymentSystem"
                                value={paymentSystem}
                                onChange={(event) =>
                                    setPaymentSystem(event.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            >
                                <option value="Stripe">Stripe</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Bank Transfer">
                                    Bank Transfer
                                </option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="accountNumber"
                                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                            >
                                Account Number
                            </label>

                            <input
                                id="accountNumber"
                                type="text"
                                value={accountNumber}
                                onChange={(event) =>
                                    setAccountNumber(event.target.value)
                                }
                                placeholder="Enter account number"
                                disabled={
                                    totalRaisedCredits <
                                    MINIMUM_WITHDRAWAL_CREDITS
                                }
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-800"
                            />
                        </div>

                        {totalRaisedCredits < MINIMUM_WITHDRAWAL_CREDITS ? (
                            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
                                Insufficient credit
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
                            Your withdrawal amount is calculated using the
                            platform&apos;s creator withdrawal rate.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Your raised credits
                                </span>

                                <span className="text-sm font-black text-slate-900 dark:text-white">
                                    {totalRaisedCredits.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950/30">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                    Creator withdrawal rate
                                </span>

                                <span className="text-sm font-black text-indigo-700 dark:text-indigo-300">
                                    20 Credits = $1
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                    Current withdrawal value
                                </span>

                                <span className="text-lg font-black text-emerald-700 dark:text-emerald-300">
                                    ${totalEarnings.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Minimum withdrawal
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Creators must have at least 200 raised credits,
                                equivalent to $10, before requesting a
                                withdrawal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreatorWithdrawalsPage;
