import {
    HiOutlineGift,
    HiOutlineInformationCircle,
} from "react-icons/hi2";

const CampaignDetailsInfo = ({ campaign }) => {
    return (
        <div className="mt-8 space-y-6">
            {/* Campaign Story */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <HiOutlineInformationCircle className="text-xl" />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        About This Campaign
                    </h2>
                </div>

                <div className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {campaign.campaign_story}
                </div>
            </section>

            {/* Reward */}
            {campaign.reward_info && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                            <HiOutlineGift className="text-xl" />
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Reward Information
                        </h2>
                    </div>

                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {campaign.reward_info}
                    </p>
                </section>
            )}
        </div>
    );
};

export default CampaignDetailsInfo;
