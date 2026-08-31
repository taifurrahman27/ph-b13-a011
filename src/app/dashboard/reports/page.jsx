"use client";

import { useEffect, useState } from "react";
import {
    HiOutlineFlag,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineXCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const ReportPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    throw new Error("Authentication required.");
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/reports`,
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
                        data.message || "Failed to load reports."
                    );
                }

                setReports(
                    Array.isArray(data.reports)
                        ? data.reports
                        : []
                );
            } catch (error) {
                console.error("Failed to load reports:", error);

                toast.error(
                    error.message || "Failed to load reports."
                );
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    const getStatusBadge = (status) => {
        const normalizedStatus = status?.toLowerCase();

        if (
            normalizedStatus === "resolved" ||
            normalizedStatus === "reviewed"
        ) {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <HiOutlineCheckCircle className="text-sm" />
                    {normalizedStatus === "reviewed"
                        ? "Reviewed"
                        : "Resolved"}
                </span>
            );
        }

        if (normalizedStatus === "dismissed") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <HiOutlineXCircle className="text-sm" />
                    Dismissed
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
                                Reports from Supporters
                            </h1>

                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                Review campaigns reported by supporters
                                and monitor reported content.
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <HiOutlineFlag className="text-xl text-indigo-600 dark:text-indigo-400" />

                            <div>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    Total Reports
                                </p>

                                <p className="text-lg font-black text-slate-950 dark:text-white">
                                    {loading ? "..." : reports.length}
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
                    ) : reports.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <HiOutlineFlag className="mx-auto text-5xl text-slate-300 dark:text-slate-700" />

                            <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                                No reports found
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                There are currently no campaign reports
                                from supporters.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-275 text-left">
                                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Campaign
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Reported By
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Reason
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Description
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
                                    {reports.map((report) => (
                                        <tr
                                            key={report._id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="max-w-55">
                                                    <p className="truncate font-bold text-slate-950 dark:text-white">
                                                        {report.campaign_title ||
                                                            report.campaignTitle ||
                                                            report.title ||
                                                            "Unknown Campaign"}
                                                    </p>

                                                    {report.campaign_id && (
                                                        <p className="mt-1 truncate font-mono text-xs text-slate-400">
                                                            ID:{" "}
                                                            {report.campaign_id.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="font-semibold text-slate-950 dark:text-white">
                                                        {report.supporter_name ||
                                                            report.reporter_name ||
                                                            report.user_name ||
                                                            "Unknown Supporter"}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        {report.supporter_email ||
                                                            report.reporter_email ||
                                                            report.user_email ||
                                                            "—"}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="inline-flex rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 dark:bg-red-950 dark:text-red-400">
                                                    {report.reason ||
                                                        report.report_reason ||
                                                        "Not specified"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <p
                                                    className="max-w-65 truncate text-sm text-slate-600 dark:text-slate-400"
                                                    title={
                                                        report.description ||
                                                        report.report_description ||
                                                        ""
                                                    }
                                                >
                                                    {report.description ||
                                                        report.report_description ||
                                                        "No description provided."}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                {formatDate(
                                                    report.createdAt ||
                                                    report.report_date ||
                                                    report.date
                                                )}
                                            </td>

                                            <td className="px-6 py-5">
                                                {getStatusBadge(
                                                    report.status
                                                )}
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex justify-end">
                                                    {report.status ===
                                                        "pending" ||
                                                        !report.status ? (
                                                        <button
                                                            type="button"
                                                            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
                                                        >
                                                            Review
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-slate-400">
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
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

export default ReportPage;