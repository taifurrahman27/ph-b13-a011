import {
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const CampaignContributionCard = ({
    campaign,
    progress,
    formatAmount,
    formatDate,
}) => {
    return (
        <aside className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Funding */}
            <div>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Total Raised
                        </p>

                        <h2 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                            ৳{formatAmount(campaign.total_contributed)}
                        </h2>
                    </div>

                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {Math.round(progress)}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-700 dark:bg-indigo-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                        Raised
                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">
                        ৳{formatAmount(campaign.total_contributed)}
                    </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                        Funding Goal
                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">
                        ৳{formatAmount(campaign.funding_goal)}
                    </span>
                </div>
            </div>

            <div className="my-6 h-px bg-slate-200 dark:bg-slate-800" />

            {/* Campaign Information */}
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <HiOutlineCurrencyDollar />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Minimum Contribution
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                            ৳
                            {formatAmount(
                                campaign.minimum_Contribution
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <HiOutlineCalendarDays />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Campaign Deadline
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                            {formatDate(campaign.deadline)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <HiOutlineCheckCircle />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Campaign Status
                        </p>

                        <p className="mt-1 text-sm font-bold capitalize text-emerald-600 dark:text-emerald-400">
                            {campaign.status}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contribution Button */}
            <button
                type="button"
                className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
                Contribute to This Campaign
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                Your contribution helps this creator reach their funding goal.
            </p>
        </aside>
    );
};

export default CampaignContributionCard;
