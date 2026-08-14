import CampaignDetails from "@/components/campaigns/CampaignDetails";

const CampaignDetailsPage = async ({ params }) => {
    const { id } = await params;

    return <CampaignDetails campaignId={id} />;
};

export default CampaignDetailsPage;
