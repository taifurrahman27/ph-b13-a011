"use client";

import Image from "next/image";
import { useState } from "react";

import {
    HiOutlineMegaphone,
    HiOutlineCheckCircle,
    HiOutlineTrash,
} from "react-icons/hi2";

const CampaignManageTable = ({
    campaigns,
    loading,
    onDelete,
    onApprove,
}) => {

    const [approveCampaign, setApproveCampaign] = useState(null);
    const [deleteCampaign, setDeleteCampaign] = useState(null);

    if (loading) {

        return (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex min-h-80 items-center justify-center px-5 py-12">
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Loading campaigns...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!campaigns.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex min-h-80 flex-col items-center justify-center px-5 py-12 text-center">
                    <HiOutlineMegaphone className="h-12 w-12 text-slate-300 dark:text-slate-700" />

                    <p className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                        No campaigns found
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                        There are no campaigns matching your current filters.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                        <tr>
                            <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 lg:px-5 dark:text-slate-400">
                                Campaign
                            </th>

                            <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 lg:px-5 dark:text-slate-400">
                                Creator
                            </th>

                            <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 lg:px-5 dark:text-slate-400">
                                Goal
                            </th>

                            <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 lg:px-5 dark:text-slate-400">
                                Raised
                            </th>

                            <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 lg:px-5 dark:text-slate-400">
                                Status
                            </th>

                            <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 lg:px-5 dark:text-slate-400">
                                Approve/Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {campaigns.map((campaign) => {
                            const campaignId =
                                campaign?._id || campaign?.id;

                            const title =
                                campaign?.campaign_title ||
                                campaign?.title ||
                                "Untitled Campaign";

                            const creator =
                                campaign?.creatorName ||
                                campaign?.creator?.name ||
                                "Unknown Creator";

                            const goal =
                                campaign?.funding_goal ??
                                campaign?.goal ??
                                campaign?.targetAmount ??
                                0;

                            const raised =
                                campaign?.total_contributed ??
                                campaign?.raisedAmount ??
                                campaign?.raised ??
                                campaign?.totalRaised ??
                                0;

                            const status =
                                campaign?.status?.toLowerCase() ||
                                "pending";

                            const image =
                                campaign?.campaign_image_url ||
                                campaign?.coverImage;

                            return (
                                <tr
                                    key={campaignId}
                                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                >
                                    <td className="px-4 py-4 lg:px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                                                {image ? (
                                                    <Image
                                                        src={image}
                                                        alt={title}
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <HiOutlineMegaphone className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="max-w-45 truncate text-sm font-bold text-slate-900 lg:max-w-xs dark:text-white">
                                                    {title}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                    {campaign?.category ||
                                                        "General"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 lg:px-5">
                                        <p className="max-w-32 truncate text-sm font-semibold text-slate-700 lg:max-w-40 dark:text-slate-300">
                                            {creator}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4 lg:px-5">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            {Number(goal).toLocaleString()}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4 lg:px-5">
                                        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                            {Number(raised).toLocaleString()}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4 lg:px-5">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${status === "approved"
                                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                : status === "completed"
                                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                                    : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                                                }`}
                                        >
                                            {status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 lg:px-5">
                                        <div className="flex justify-end gap-2">
                                            {status === "pending" && (
                                                <button
                                                    type="button"
                                                    title="Approve campaign"
                                                    onClick={() => setApproveCampaign(campaign)}
                                                    className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                                                >
                                                    <HiOutlineCheckCircle className="h-5 w-5" />
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                title="Delete campaign"
                                                onClick={() => setDeleteCampaign(campaign)}
                                                className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                            >
                                                <HiOutlineTrash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
                {campaigns.map((campaign) => {
                    const campaignId =
                        campaign?._id || campaign?.id;

                    const title =
                        campaign?.campaign_title ||
                        campaign?.title ||
                        "Untitled Campaign";

                    const creator =
                        campaign?.creatorName ||
                        campaign?.creator?.name ||
                        "Unknown Creator";

                    const goal =
                        campaign?.funding_goal ??
                        campaign?.goal ??
                        campaign?.targetAmount ??
                        0;

                    const raised =
                        campaign?.total_contributed ??
                        campaign?.raisedAmount ??
                        campaign?.raised ??
                        campaign?.totalRaised ??
                        0;

                    const status =
                        campaign?.status?.toLowerCase() ||
                        "pending";

                    const image =
                        campaign?.campaign_image_url ||
                        campaign?.coverImage;

                    return (
                        <div
                            key={campaignId}
                            className="p-4 sm:p-5"
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={title}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <HiOutlineMegaphone className="h-6 w-6 text-slate-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                                {title}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {campaign?.category ||
                                                    "General"}
                                            </p>
                                        </div>

                                        <span
                                            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${status === "approved"
                                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                : status === "completed"
                                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                                    : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                                                }`}
                                        >
                                            {status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                        Creator
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {creator}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                        Goal
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                        {Number(goal).toLocaleString()}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                        Raised
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                        {Number(raised).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex items-end justify-end rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                                    <div className="flex gap-2">
                                        {status === "pending" && (
                                            <button
                                                type="button"
                                                title="Approve campaign"
                                                onClick={() => setApproveCampaign(campaign)}
                                                className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                                            >
                                                <div className="flex gap-1 justify-center items-center">
                                                    <span>Approve</span>
                                                    <HiOutlineCheckCircle className="h-5 w-5" /></div>
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            title="Delete campaign"
                                            onClick={() => setDeleteCampaign(campaign)}
                                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                        >
                                            <HiOutlineTrash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {approveCampaign && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <HiOutlineCheckCircle className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                                    Approve Campaign?
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Confirm campaign approval
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            Are you sure you want to approve{" "}
                            <span className="font-bold text-slate-900 dark:text-white">
                                {approveCampaign.campaign_title ||
                                    approveCampaign.title ||
                                    "this campaign"}
                            </span>
                            ?
                        </p>

                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Once approved, this campaign will be marked as approved.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setApproveCampaign(null)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    onApprove(
                                        approveCampaign._id ||
                                        approveCampaign.id
                                    );
                                    setApproveCampaign(null);
                                }}
                                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                            >
                                Yes, Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteCampaign && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                <HiOutlineTrash className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                                    Delete Campaign?
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            Are you sure you want to delete{" "}
                            <span className="font-bold text-slate-900 dark:text-white">
                                {deleteCampaign.campaign_title ||
                                    deleteCampaign.title ||
                                    "this campaign"}
                            </span>
                            ?
                        </p>

                        <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                            This campaign will be permanently removed.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setDeleteCampaign(null)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    onDelete(
                                        deleteCampaign._id ||
                                        deleteCampaign.id
                                    );
                                    setDeleteCampaign(null);
                                }}
                                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignManageTable;