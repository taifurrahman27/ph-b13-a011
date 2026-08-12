import AddCampaignForm from "@/components/dashboard/creator/AddCampaignForm";

const AddCampaignPage = () => {
    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Creator Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Add New Campaign
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Share your idea with the CrowdFunding community and create
                    a campaign for Supporters to contribute to.
                </p>
            </div>

            <AddCampaignForm />

        </div>
    );
};

export default AddCampaignPage;
