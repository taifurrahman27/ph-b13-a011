"use client";

import Image from "next/image";
import { useState } from "react";
import {
    HiOutlineArrowRight,
    HiOutlineCalendarDays,
    HiOutlineCurrencyDollar,
    HiOutlinePhoto,
} from "react-icons/hi2";

const categories = [
    "Technology",
    "Art",
    "Community",
    "Health",
    "Education",
    "Environment",
    "Other",
];

const initialFormData = {
    campaign_title: "",
    campaign_story: "",
    category: "Technology",
    funding_goal: "",
    minimum_Contribution: "",
    deadline: "",
    reward_info: "",
    campaign_image_url: "",
};

const AddCampaignForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const isValidImageUrl = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        try {
            const url = new URL(value.trim());

            return (
                (url.protocol === "http:" || url.protocol === "https:") &&
                Boolean(url.hostname)
            );
        } catch {
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            Number(formData.funding_goal) <= 0 ||
            Number(formData.minimum_Contribution) <= 0
        ) {
            setError(
                "Funding goal and minimum contribution must be greater than 0."
            );
            return;
        }

        if (
            Number(formData.minimum_Contribution) >
            Number(formData.funding_goal)
        ) {
            setError(
                "Minimum contribution cannot be greater than the funding goal."
            );
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");

            if (!token) {
                throw new Error(
                    "Authentication token not found. Please log in again."
                );
            }

            if (!storedUser) {
                throw new Error(
                    "User information not found. Please log in again."
                );
            }

            const user = JSON.parse(storedUser);

            if (!user?.id) {
                throw new Error(
                    "User ID not found. Please log in again."
                );
            }

            if (user.role?.toLowerCase() !== "creator") {
                throw new Error(
                    "Only creators can add campaigns."
                );
            }

            const campaignData = {
                campaign_title: formData.campaign_title.trim(),
                campaign_story: formData.campaign_story.trim(),
                category: formData.category,
                funding_goal: Number(formData.funding_goal),
                minimum_Contribution: Number(
                    formData.minimum_Contribution
                ),
                deadline: formData.deadline,
                reward_info: formData.reward_info.trim(),
                campaign_image_url:
                    formData.campaign_image_url.trim(),
                creatorId: user.id,
            };

            console.log("Campaign data:", campaignData);

            const response = await fetch(
                "http://localhost:5000/api/campaigns",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(campaignData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to create campaign."
                );
            }

            setSuccess(
                "Campaign submitted successfully. Waiting for Admin approval."
            );

            setFormData({
                campaign_title: "",
                campaign_story: "",
                category: "Technology",
                funding_goal: "",
                minimum_Contribution: "",
                deadline: "",
                reward_info: "",
                campaign_image_url: "",
            });
        } catch (error) {
            console.error("Add campaign error:", error);

            setError(
                error.message ||
                "Failed to create campaign."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "block min-h-12 w-full cursor-text touch-manipulation rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 hover:border-indigo-300  focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-indigo-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/10";

    const labelClass =
        "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300";

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10"
        >
            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                    {success}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="campaign_title"
                        className={labelClass}
                    >
                        Campaign Title
                    </label>

                    <input
                        id="campaign_title"
                        name="campaign_title"
                        type="text"
                        value={formData.campaign_title}
                        onChange={handleChange}
                        placeholder="Help us build a solar-powered water pump"
                        autoComplete="off"
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="campaign_story"
                        className={labelClass}
                    >
                        Campaign Story
                    </label>

                    <textarea
                        id="campaign_story"
                        name="campaign_story"
                        value={formData.campaign_story}
                        onChange={handleChange}
                        placeholder="Tell Supporters about your campaign, why it matters, and how their contributions will help..."
                        rows={7}
                        required
                        className={`${inputClass} resize-y`}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="category"
                            className={labelClass}
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer`}
                        >
                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="deadline"
                            className={labelClass}
                        >
                            Deadline
                        </label>

                        <div className="relative">
                            <HiOutlineCalendarDays className="pointer-events-none absolute left-4 top-1/2 z-0 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                            <input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                min={today}
                                required
                                className={`${inputClass} relative z-10 pl-11`}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="funding_goal"
                            className={labelClass}
                        >
                            Funding Goal
                        </label>

                        <div className="relative">
                            <HiOutlineCurrencyDollar className="pointer-events-none absolute left-4 top-1/2 z-0 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                            <input
                                id="funding_goal"
                                name="funding_goal"
                                type="number"
                                min="1"
                                step="1"
                                value={formData.funding_goal}
                                onChange={handleChange}
                                placeholder="5000"
                                inputMode="numeric"
                                required
                                className={`${inputClass} relative z-10 pl-11`}
                            />
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            Total credits needed for this campaign.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="minimum_Contribution"
                            className={labelClass}
                        >
                            Minimum Contribution
                        </label>

                        <div className="relative">
                            <HiOutlineCurrencyDollar className="pointer-events-none absolute left-4 top-1/2 z-0 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                            <input
                                id="minimum_Contribution"
                                name="minimum_Contribution"
                                type="number"
                                min="1"
                                step="1"
                                value={formData.minimum_Contribution}
                                onChange={handleChange}
                                placeholder="50"
                                inputMode="numeric"
                                required
                                className={`${inputClass} relative z-10 pl-11`}
                            />
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            Smallest amount a Supporter can contribute.
                        </p>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="reward_info"
                        className={labelClass}
                    >
                        Reward Information
                    </label>

                    <textarea
                        id="reward_info"
                        name="reward_info"
                        value={formData.reward_info}
                        onChange={handleChange}
                        placeholder="Describe what Supporters will receive for contributing to your campaign..."
                        rows={4}
                        required
                        className={`${inputClass} resize-y`}
                    />
                </div>

                <div>
                    <label
                        htmlFor="campaign_image_url"
                        className={labelClass}
                    >
                        Campaign Image URL
                    </label>

                    <div className="relative">
                        <HiOutlinePhoto className="pointer-events-none absolute left-4 top-1/2 z-0 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                        <input
                            id="campaign_image_url"
                            name="campaign_image_url"
                            type="url"
                            value={formData.campaign_image_url}
                            onChange={handleChange}
                            placeholder="https://i.ibb.co/example/campaign.jpg"
                            inputMode="url"
                            autoComplete="url"
                            required
                            className={`${inputClass} relative z-10 pl-11`}
                        />
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Paste a public image URL for your campaign cover.
                    </p>
                </div>

                {isValidImageUrl(formData.campaign_image_url) && (
                    <div className="group relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 sm:h-64">
                        <Image
                            src={formData.campaign_image_url.trim()}
                            alt="Campaign preview"
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 768px"
                        />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-5 pb-4 pt-10">
                            <p className="text-sm font-medium text-white">
                                Campaign image preview
                            </p>
                        </div>
                    </div>
                )}

                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-300">
                        Campaign approval
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-indigo-700 dark:text-indigo-400">
                        After you submit this campaign, its status will be
                        set to <strong>pending</strong>. An Admin must
                        approve the campaign before it becomes visible to
                        Supporters.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="group flex min-h-12 w-full cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Adding Campaign..."
                        : "Add Campaign"}

                    {!loading && (
                        <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default AddCampaignForm;