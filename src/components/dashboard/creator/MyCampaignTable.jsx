"use client";

import Link from "next/link";
import {
    HiOutlineEye,
    HiOutlinePencilSquare,
} from "react-icons/hi2";

const MyCampaignTable = ({ campaigns, loading }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case "approved":
                return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";

            case "rejected":
                return "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400";

            case "pending":
            default:
                return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
        }
    };

    if (loading) {
        return (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="p-6">
                    <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-6 space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!campaigns.length) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    No campaigns yet
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    You have not created any campaigns yet.
                </p>

                <Link
                    href="/dashboard/add-new-campaign"
                    className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                >
                    Create Campaign
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Your Active Campaigns
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    View and manage your submitted campaigns.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-225 text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Campaign
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Category
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Goal
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Raised
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Deadline
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Status
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {campaigns.map((campaign) => (
                            <tr
                                key={campaign._id}
                                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                            >
                                <td className="px-6 py-5">
                                    <div className="max-w-xs">
                                        <p className="truncate font-bold text-slate-900 dark:text-white">
                                            {campaign.campaign_title}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                                            {campaign.campaign_story}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {campaign.category}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {campaign.funding_goal} credits
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                        {campaign.total_contributed || 0} credits
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        {campaign.deadline}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusClass(
                                            campaign.status
                                        )}`}
                                    >
                                        {campaign.status}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/campaigns/${campaign._id}`}
                                            title="View campaign"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                                        >
                                            <HiOutlineEye className="h-5 w-5" />
                                        </Link>

                                        <Link
                                            href={`/dashboard/my-campaigns/${campaign._id}/edit`}
                                            title="Edit campaign"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                                        >
                                            <HiOutlinePencilSquare className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCampaignTable;
