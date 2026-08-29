"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineBanknotes,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineXCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

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

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/withdrawals/admin`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to load withdrawal requests."
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
                    error.message || "Failed to load withdrawal requests."
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

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/withdrawals/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to update withdrawal status."
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
                error.message || "Failed to update withdrawal status."
            );
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (status) => {
        const normalizedStatus = status?.toLowerCase();

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

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        CrowdFunding • Admin
                    </span>

                    <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Withdrawal Requests
                            </h1>

                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                Review and manage withdrawal requests submitted
                                by creators.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <HiOutlineBanknotes className="text-xl text-indigo-600 dark:text-indigo-400" />

                            <div>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    Total Requests
                                </p>

                                <p className="text-lg font-black text-slate-950 dark:text-white">
                                    {loading ? "..." : withdrawals.length}
                                </p>
                            </div>
                        </div>
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
                                There are currently no withdrawal requests
                                from creators.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] text-left">
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
                                    {withdrawals.map((withdrawal) => (
                                        <tr
                                            key={withdrawal._id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="font-bold text-slate-950 dark:text-white">
                                                        {withdrawal.user_name ||
                                                            withdrawal.creator_name ||
                                                            "Unknown Creator"}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        {withdrawal.user_email ||
                                                            withdrawal.creator_email ||
                                                            "—"}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="font-bold text-slate-950 dark:text-white">
                                                    {Number(
                                                        withdrawal.credits || 0
                                                    ).toLocaleString()}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="font-black text-slate-950 dark:text-white">
                                                    $
                                                    {Number(
                                                        withdrawal.amount ??
                                                        withdrawal.withdrawal_amount ??
                                                        withdrawal.withdraw_amount ??
                                                        0
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    {withdrawal.payment_method ||
                                                        "—"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
                                                    {withdrawal.account_number ||
                                                        "—"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                {formatDate(
                                                    withdrawal.createdAt ||
                                                    withdrawal.withdrawal_date ||
                                                    withdrawal.date
                                                )}
                                            </td>

                                            <td className="px-6 py-5">
                                                {getStatusBadge(
                                                    withdrawal.status
                                                )}
                                            </td>

                                            <td className="px-6 py-5">
                                                {withdrawal.status ===
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
                                                            Approve
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
                                                    <span className="text-xs font-semibold text-slate-400">
                                                        No action
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
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