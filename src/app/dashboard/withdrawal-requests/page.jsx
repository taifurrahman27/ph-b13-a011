"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineBanknotes,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineXCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const WithdrawalRequestsPage = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        const loadWithdrawals = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    throw new Error("Authentication required.");
                }

                const res = await fetch(`${API_URL}/api/withdrawals`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load withdrawal requests."
                    );
                }

                setWithdrawals(
                    Array.isArray(data.withdrawals)
                        ? data.withdrawals
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to load withdrawal requests:",
                    error
                );

                toast.error(
                    error.message ||
                    "Failed to load withdrawal requests."
                );
            } finally {
                setLoading(false);
            }
        };

        loadWithdrawals();
    }, []);

    const updateWithdrawalStatus = async (id, status) => {
        try {
            setProcessingId(id);

            const token = localStorage.getItem("accessToken");

            if (!token) {
                throw new Error("Authentication required.");
            }

            const endpoint =
                status === "approved"
                    ? `${API_URL}/api/withdrawals/${id}/approve`
                    : `${API_URL}/api/withdrawals/${id}/reject`;

            const res = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update withdrawal status."
                );
            }

            setWithdrawals((current) =>
                current.map((withdrawal) =>
                    withdrawal._id === id
                        ? {
                            ...withdrawal,
                            status,
                        }
                        : withdrawal
                )
            );

            toast.success(
                status === "approved"
                    ? "Withdrawal request approved."
                    : "Withdrawal request rejected."
            );
        } catch (error) {
            console.error(
                "Failed to update withdrawal status:",
                error
            );

            toast.error(
                error.message ||
                "Failed to update withdrawal status."
            );
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (status) => {
        const normalizedStatus = String(
            status || "pending"
        ).toLowerCase();

        if (normalizedStatus === "approved") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <HiOutlineCheckCircle className="text-sm" />
                    Approved
                </span>
            );
        }

        if (normalizedStatus === "rejected") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-950 dark:text-red-400">
                    <HiOutlineXCircle className="text-sm" />
                    Rejected
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <HiOutlineClock className="text-sm" />
                Pending
            </span>
        );
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const pendingCount = withdrawals.filter(
        (withdrawal) =>
            String(withdrawal.status || "").toLowerCase() ===
            "pending"
    ).length;

    const approvedCount = withdrawals.filter(
        (withdrawal) =>
            String(withdrawal.status || "").toLowerCase() ===
            "approved"
    ).length;

    const rejectedCount = withdrawals.filter(
        (withdrawal) =>
            String(withdrawal.status || "").toLowerCase() ===
            "rejected"
    ).length;

    const totalWithdrawalAmount = withdrawals.reduce(
        (total, withdrawal) => {
            const credits = Number(withdrawal.amount || 0);
            const amount = Number.isFinite(credits)
                ? credits / 20
                : 0;

            return total + amount;
        },
        0
    );

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        CrowdFunding • Admin Dashboard
                    </span>

                    <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Withdrawal Requests
                            </h1>

                            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
                                Review, approve, or reject withdrawal
                                requests submitted by creators.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <HiOutlineBanknotes className="text-xl text-indigo-600 dark:text-indigo-400" />

                            <div>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    Total Requests
                                </p>

                                <p className="text-lg font-black text-slate-950 dark:text-white">
                                    {loading
                                        ? "..."
                                        : withdrawals.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Total Requests
                        </p>

                        <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                            {loading ? "..." : withdrawals.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/20">
                        <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                            Pending
                        </p>

                        <p className="mt-2 text-3xl font-black text-amber-700 dark:text-amber-400">
                            {loading ? "..." : pendingCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20">
                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                            Approved
                        </p>

                        <p className="mt-2 text-3xl font-black text-emerald-700 dark:text-emerald-400">
                            {loading ? "..." : approvedCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/20">
                        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                            Total Withdrawal Value
                        </p>

                        <p className="mt-2 text-3xl font-black text-indigo-700 dark:text-indigo-400">
                            {loading
                                ? "..."
                                : `$${totalWithdrawalAmount.toFixed(
                                    2
                                )}`}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    {loading ? (
                        <div className="p-8">
                            <div className="animate-pulse space-y-4">
                                <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                                <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                                <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                                <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                            </div>
                        </div>
                    ) : withdrawals.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <HiOutlineBanknotes className="mx-auto text-5xl text-slate-300 dark:text-slate-700" />

                            <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                                No withdrawal requests
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                There are currently no withdrawal
                                requests from creators.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-275 text-left">
                                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Creator
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Credits
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Payment
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Account
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {withdrawals.map(
                                        (withdrawal) => {
                                            const credits = Number(
                                                withdrawal.amount || 0
                                            );

                                            const dollarAmount =
                                                credits / 20;

                                            const status = String(
                                                withdrawal.status ||
                                                "pending"
                                            ).toLowerCase();

                                            const creator =
                                                withdrawal.creator ||
                                                {};

                                            return (
                                                <tr
                                                    key={
                                                        withdrawal._id
                                                    }
                                                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div>
                                                            <p className="font-bold text-slate-950 dark:text-white">
                                                                {creator.name ||
                                                                    creator.user_name ||
                                                                    withdrawal.creator_name ||
                                                                    withdrawal.user_name ||
                                                                    "Unknown Creator"}
                                                            </p>

                                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                                {creator.email ||
                                                                    creator.user_email ||
                                                                    withdrawal.creator_email ||
                                                                    withdrawal.user_email ||
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="font-bold text-slate-950 dark:text-white">
                                                            {credits.toLocaleString()}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="font-black text-slate-950 dark:text-white">
                                                            $
                                                            {dollarAmount.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                            {withdrawal.payment_method ||
                                                                withdrawal.paymentSystem ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
                                                            {withdrawal.account_number ||
                                                                withdrawal.accountNumber ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                        {formatDate(
                                                            withdrawal.createdAt
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        {getStatusBadge(
                                                            status
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        {status ===
                                                            "pending" ? (
                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    disabled={
                                                                        processingId ===
                                                                        withdrawal._id
                                                                    }
                                                                    onClick={() =>
                                                                        updateWithdrawalStatus(
                                                                            withdrawal._id,
                                                                            "approved"
                                                                        )
                                                                    }
                                                                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    {processingId ===
                                                                        withdrawal._id
                                                                        ? "Processing..."
                                                                        : "Approve"}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    disabled={
                                                                        processingId ===
                                                                        withdrawal._id
                                                                    }
                                                                    onClick={() =>
                                                                        updateWithdrawalStatus(
                                                                            withdrawal._id,
                                                                            "rejected"
                                                                        )
                                                                    }
                                                                    className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="flex justify-end text-xs font-semibold text-slate-400">
                                                                No action
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );

};

export default WithdrawalRequestsPage;
