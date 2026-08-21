"use client";

import { useEffect, useMemo, useState } from "react";
import {
    HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import CampaignManageTable from "@/components/dashboard/admin/CampaignManageTable";

const CampaignManagePage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    useEffect(() => {
        let mounted = true;

        const loadCampaigns = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    throw new Error("Authentication required.");
                }

                const serverUrl =
                    process.env.NEXT_PUBLIC_SERVER_URL ||
                    "http://localhost:5000";

                const response = await fetch(
                    `${serverUrl}/api/campaigns/admin/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message || "Failed to load campaigns."
                    );
                }

                if (mounted) {
                    setCampaigns(
                        Array.isArray(data?.campaigns)
                            ? data.campaigns
                            : Array.isArray(data?.data)
                                ? data.data
                                : []
                    );
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err?.message || "Failed to load campaigns."
                    );
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadCampaigns();

        return () => {
            mounted = false;
        };
    }, []);

    const filteredCampaigns = useMemo(() => {
        const query = search.trim().toLowerCase();

        return campaigns.filter((campaign) => {
            const title = campaign?.title?.toLowerCase() || "";
            const category = campaign?.category?.toLowerCase() || "";
            const creatorName =
                campaign?.creatorName?.toLowerCase() ||
                campaign?.creator?.name?.toLowerCase() ||
                "";

            const campaignStatus =
                campaign?.status?.toLowerCase() || "active";

            const matchesSearch =
                !query ||
                title.includes(query) ||
                category.includes(query) ||
                creatorName.includes(query);

            const matchesStatus =
                status === "all" || campaignStatus === status;

            return matchesSearch && matchesStatus;
        });
    }, [campaigns, search, status]);

    const handleApprove = async (campaignId) => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                throw new Error("Authentication required.");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/campaigns/admin/${campaignId}/approve`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to approve campaign."
                );
            }

            setCampaigns((current) =>
                current.map((campaign) => {
                    const id = campaign?._id || campaign?.id;

                    if (id === campaignId) {
                        return {
                            ...campaign,
                            status: "approved",
                        };
                    }

                    return campaign;
                })
            );
        } catch (error) {
            window.alert(
                error.message || "Failed to approve campaign."
            );
        }
    };


    const handleDelete = async (campaignId) => {
        if (!campaignId) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this campaign?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                throw new Error("Authentication required.");
            }

            const serverUrl =
                process.env.NEXT_PUBLIC_SERVER_URL ||
                "http://localhost:5000";

            const response = await fetch(
                `${serverUrl}/api/campaigns/${campaignId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to delete campaign."
                );
            }

            setCampaigns((current) =>
                current.filter(
                    (campaign) =>
                        campaign?._id !== campaignId &&
                        campaign?.id !== campaignId
                )
            );
        } catch (err) {
            window.alert(
                err?.message || "Failed to delete campaign."
            );
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Administration
                    </p>

                    <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Manage Campaigns
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Review, manage, and monitor campaigns submitted by
                        creators.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Total Campaigns
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                        {campaigns.length}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="relative flex-1">
                        <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search campaigns..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                        className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 dark:border-red-500/20 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <CampaignManageTable
                campaigns={filteredCampaigns}
                loading={loading}
                onApprove={handleApprove}
                onDelete={handleDelete}
            />
        </section>
    );
};

export default CampaignManagePage;
