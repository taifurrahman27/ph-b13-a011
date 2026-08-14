"use client";

import { useEffect, useState } from "react";
import MyCampaignTable from "@/components/dashboard/creator/MyCampaignTable";

const API_URL = "http://localhost:5000";

const MyCampaignPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setLoading(true);
                setError("");

                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    throw new Error("You must be logged in.");
                }

                const user = JSON.parse(storedUser);
                const creatorId = user?.id;

                if (!creatorId) {
                    throw new Error("Creator ID could not be found.");
                }

                const token = localStorage.getItem("accessToken");

                if (!token) {
                    throw new Error("Authentication token not found.");
                }

                const response = await fetch(
                    `${API_URL}/api/campaigns/my-campaigns`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "x-user-id": creatorId,
                        },
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load campaigns."
                    );
                }

                setCampaigns(data.campaigns || []);
            } catch (error) {
                console.error("My campaigns error:", error);

                setError(
                    error.message || "Failed to load your campaigns."
                );

                setCampaigns([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const approvedCampaigns = campaigns.filter(
        (campaign) => campaign.status === "approved"
    );

    const pendingCampaigns = campaigns.filter(
        (campaign) => campaign.status === "pending"
    );

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Creator Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    My Campaigns
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Manage your campaigns, monitor their approval status,
                    and track your campaign progress.
                </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Campaigns
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                        {campaigns.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Approved
                    </p>

                    <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        {approvedCampaigns.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Pending
                    </p>

                    <p className="mt-2 text-3xl font-black text-amber-600 dark:text-amber-400">
                        {pendingCampaigns.length}
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            <MyCampaignTable
                campaigns={campaigns}
                loading={loading}
            />
        </div>
    );
};

export default MyCampaignPage;