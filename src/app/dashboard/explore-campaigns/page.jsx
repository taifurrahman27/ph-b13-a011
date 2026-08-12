"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineFunnel,
    HiOutlineHeart,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const campaigns = [
    {
        id: 1,
        title: "Community Learning Center",
        category: "Education",
        description:
            "Help us create a modern learning space with books, computers, and educational resources for local students.",
        goal: 5000,
        raised: 3250,
        supporters: 84,
        image: "/images/campaign-1.jpg",
    },
    {
        id: 2,
        title: "Clean Water for Rural Families",
        category: "Environment",
        description:
            "Support our mission to provide safe drinking water and sustainable water systems for rural communities.",
        goal: 8000,
        raised: 5100,
        supporters: 126,
        image: "/images/campaign-2.jpg",
    },
    {
        id: 3,
        title: "Small Business Startup Fund",
        category: "Business",
        description:
            "Help promising local entrepreneurs turn their ideas into sustainable businesses and create new jobs.",
        goal: 10000,
        raised: 6700,
        supporters: 143,
        image: "/images/campaign-3.jpg",
    },
];

const categories = [
    "All",
    "Education",
    "Environment",
    "Business",
    "Health",
    "Technology",
];

const ExploreCampaignPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter((campaign) => {
            const matchesSearch =
                campaign.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                campaign.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || campaign.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Discover
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Explore Campaigns
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Discover meaningful campaigns and support creators
                    working on projects that matter.
                </p>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1">
                    <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search campaigns..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                    <HiOutlineFunnel className="h-5 w-5 shrink-0 text-slate-400" />

                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setCategory(item)}
                            className={`whitespace - nowrap rounded - xl px - 4 py - 2.5 text - sm font - semibold transition ${category === item
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                                } `}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {filteredCampaigns.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredCampaigns.map((campaign) => {
                        const percentage = Math.min(
                            Math.round(
                                (campaign.raised / campaign.goal) * 100
                            ),
                            100
                        );

                        return (
                            <article
                                key={campaign.id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <Image
                                        src={campaign.image}
                                        alt={campaign.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition duration-500 hover:scale-105"

                                    />

                                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-indigo-600 backdrop-blur dark:bg-slate-950/90 dark:text-indigo-400">
                                        {campaign.category}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                                        {campaign.title}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {campaign.description}
                                    </p>

                                    <div className="mt-5">
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                ${campaign.raised.toLocaleString()}
                                            </span>

                                            <span className="text-slate-500 dark:text-slate-400">
                                                {percentage}%
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-indigo-600"
                                                style={{
                                                    width: `${percentage}% `,
                                                }}
                                            />
                                        </div>

                                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                            <span>
                                                Goal ${campaign.goal.toLocaleString()}
                                            </span>

                                            <span>
                                                {campaign.supporters} supporters
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                                        >
                                            <HiOutlineHeart className="h-5 w-5" />
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                                        >
                                            <HiOutlineCurrencyDollar className="h-5 w-5" />
                                            Support
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                    <HiOutlineMagnifyingGlass className="mx-auto h-10 w-10 text-slate-400" />

                    <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                        No campaigns found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Try changing your search or selecting another
                        category.
                    </p>
                </div>
            )}
        </div>
    );

};

export default ExploreCampaignPage;
