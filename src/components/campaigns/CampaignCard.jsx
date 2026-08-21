import Link from "next/link";
import Image from "next/image";
import {
    HiOutlineArrowRight,
    HiOutlineCalendarDays,
    HiOutlineCurrencyDollar,
    HiOutlineUserCircle,
} from "react-icons/hi2";

const CampaignCard = ({ campaign }) => {
    const calculateProgress = (raised, goal) => {
        if (!goal || goal <= 0) return 0;

        return Math.min(
            (Number(raised || 0) / Number(goal)) * 100,
            100
        );
    };

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString();
    };

    const formatDate = (date) => {
        if (!date) return "No deadline";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const progress = calculateProgress(
        campaign.total_contributed,
        campaign.funding_goal
    );

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            {/* Campaign Image */}
            <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {campaign.campaign_image_url ? (
                    <Image
                        src={campaign.campaign_image_url}
                        alt={campaign.campaign_title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-slate-100 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-slate-800">
                        <HiOutlineCurrencyDollar className="text-6xl text-indigo-400" />
                    </div>
                )}

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {campaign.category}
                </div>

                {/* Status */}
                <div className="absolute right-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold capitalize text-white backdrop-blur-sm">
                    {campaign.status}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {campaign.campaign_title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {campaign.campaign_story}
                </p>

                {/* Creator */}
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <HiOutlineUserCircle className="text-lg" />

                    <span className="truncate">
                        Creator
                    </span>
                </div>

                {/* Funding Progress */}
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">
                            $
                            {formatAmount(
                                campaign.total_contributed
                            )}
                        </span>

                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                            className="h-full rounded-full bg-indigo-600 transition-all duration-500 dark:bg-indigo-500"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>
                            Raised $
                            {formatAmount(
                                campaign.total_contributed
                            )}
                        </span>

                        <span>
                            Goal $
                            {formatAmount(
                                campaign.funding_goal
                            )}
                        </span>
                    </div>
                </div>

                {/* Minimum Contribution */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <HiOutlineCurrencyDollar className="text-base" />

                    <span>
                        Minimum contribution: $
                        {formatAmount(
                            campaign.minimum_Contribution
                        )}
                    </span>
                </div>

                {/* Deadline */}
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <HiOutlineCalendarDays className="text-base" />

                    <span>
                        Deadline:{" "}
                        {formatDate(campaign.deadline)}
                    </span>
                </div>

                {/* Details Button */}
                <Link
                    href={`/campaigns/${campaign._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                    View Campaign

                    <HiOutlineArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    );
};

export default CampaignCard;
