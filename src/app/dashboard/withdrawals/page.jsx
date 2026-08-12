"use client";

import { useEffect, useState } from "react";

const CreatorWithdrawalsPage = () => {
    const [user, setUser] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchWithdrawals = async () => {
            try {
                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    if (!cancelled) {
                        await Promise.resolve();
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
                        await Promise.resolve();
                        setError("Invalid user session.");
                        setLoading(false);
                    }
                    return;
                }

                if (!parsedUser?.id) {
                    if (!cancelled) {
                        await Promise.resolve();
                        setError("You must be logged in.");
                        setLoading(false);
                    }
                    return;
                }

                if (!cancelled) {
                    setUser(parsedUser);
                }

                const response = await fetch(
                    `http://localhost:5000/api/withdrawals/creator/${parsedUser.id}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load withdrawals."
                    );
                }

                if (!cancelled) {
                    setWithdrawals(data.withdrawals || []);
                    setError("");
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error.message || "Failed to load withdrawals."
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
                    View your withdrawal balance, submitted requests, and
                    withdrawal history.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {!error && (
                <>
                    <div className="mb-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Available Balance
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                ৳0
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Pending Withdrawals
                            </p>

                            <p className="mt-2 text-3xl font-black text-amber-600">
                                ৳0
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Withdrawals
                            </p>

                            <p className="mt-2 text-3xl font-black text-emerald-600">
                                {withdrawals.length}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">
                                Withdrawal History
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Your previous withdrawal requests.
                            </p>
                        </div>

                        {withdrawals.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                    No withdrawal requests found.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                        {withdrawals.map((withdrawal) => (
                                            <tr key={withdrawal._id}>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                    ৳
                                                    {Number(
                                                        withdrawal.amount || 0
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold capitalize text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                                                        {withdrawal.status ||
                                                            "pending"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                    {withdrawal.createdAt
                                                        ? new Date(
                                                            withdrawal.createdAt
                                                        ).toLocaleDateString()
                                                        : "—"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CreatorWithdrawalsPage;