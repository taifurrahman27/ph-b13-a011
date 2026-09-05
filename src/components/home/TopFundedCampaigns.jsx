"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const TopFundedCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopFundedCampaigns = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/campaigns/top-funded`
                );

                const data = await response.json();

                if (data.success) {
                    setCampaigns(data.campaigns || []);
                } else {
                    setCampaigns([]);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch top funded campaigns:",
                    error
                );
                setCampaigns([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTopFundedCampaigns();
    }, []);

    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                        Top Funded Campaigns
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
                        Discover the campaigns that have raised the most
                        credits from our community.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />

                                <div className="space-y-3 p-5">
                                    <div className="h-6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white py-12 text-center dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-slate-600 dark:text-slate-400">
                            No funded campaigns available.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign._id}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    {campaign.campaign_image_url ? (
                                        <Image
                                            src={campaign.campaign_image_url}
                                            alt={campaign.campaign_title}
                                            fill
                                            unoptimized
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <h3 className="line-clamp-2 text-xl font-semibold text-slate-900 dark:text-white">
                                        {campaign.campaign_title}
                                    </h3>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Total Raised
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-purple-600 dark:text-purple-400">
                                                {Number(
                                                    campaign.total_contributed || 0
                                                ).toLocaleString()}{" "}
                                                Credits
                                            </p>
                                        </div>

                                        <Link
                                            href={`/campaigns/${campaign._id}`}
                                            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                                        >
                                            View Campaign
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopFundedCampaigns;