"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineCreditCard,
    HiOutlineCurrencyDollar,
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineXCircle,
} from "react-icons/hi2";

const PaymentHistoryPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    setError("You are not logged in.");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/payments/payment-history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load payment history."
                    );
                }

                setPayments(data.payments || []);
            } catch (error) {
                console.error(
                    "Payment history error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to load payment history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, []);

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    const getStatusIcon = (status) => {
        if (status === "completed") {
            return (
                <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500" />
            );
        }

        if (
            status === "pending"
        ) {
            return (
                <HiOutlineClock className="h-5 w-5 text-amber-500" />
            );
        }

        return (
            <HiOutlineXCircle className="h-5 w-5 text-red-500" />
        );
    };

    const getStatusClass = (status) => {
        if (status === "completed") {
            return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
        }

        if (status === "pending") {
            return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
        }

        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
    };

    return (
        <div className="min-h-full">
            <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Payments
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Payment History
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    View all your campaign contributions and payment
                    details.
                </p>
            </div>

            {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                    <p className="font-semibold text-slate-500 dark:text-slate-400">
                        Loading payment history...
                    </p>
                </div>
            )}

            {!loading && error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
                    <p className="font-semibold text-red-600 dark:text-red-400">
                        {error}
                    </p>
                </div>
            )}

            {!loading &&
                !error &&
                payments.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
                            <HiOutlineCreditCard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-white">
                            No payments yet
                        </h2>

                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Your campaign contributions will appear
                            here after you make a payment.
                        </p>
                    </div>
                )}

            {!loading &&
                !error &&
                payments.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-175">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Payment
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Campaign
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {payments.map(
                                        (payment) => {
                                            const status =
                                                payment.paymentStatus ||
                                                payment.status ||
                                                "pending";

                                            return (
                                                <tr
                                                    key={
                                                        payment._id
                                                    }
                                                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40">
                                                                <HiOutlineCreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                                    Contribution
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-400">
                                                                    {payment.stripeSessionId
                                                                        ? payment.stripeSessionId.slice(
                                                                            0,
                                                                            18
                                                                        ) +
                                                                        "..."
                                                                        : "Stripe payment"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                            Campaign
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            ID:{" "}
                                                            {
                                                                payment.campaignId
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-1.5">
                                                            <HiOutlineCurrencyDollar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                                                            <span className="font-black text-slate-900 dark:text-white">
                                                                {Number(
                                                                    payment.amount ||
                                                                    0
                                                                ).toFixed(
                                                                    2
                                                                )}
                                                            </span>

                                                            <span className="text-xs font-semibold uppercase text-slate-400">
                                                                {payment.currency ||
                                                                    "usd"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                            <HiOutlineCalendarDays className="h-5 w-5 text-slate-400" />

                                                            {formatDate(
                                                                payment.createdAt
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusClass(
                                                                status
                                                            )}`}
                                                        >
                                                            {getStatusIcon(
                                                                status
                                                            )}

                                                            {status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default PaymentHistoryPage;
