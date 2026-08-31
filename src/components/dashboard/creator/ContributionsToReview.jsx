"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContributionsToReview = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [selectedContribution, setSelectedContribution] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

    useEffect(() => {
        let cancelled = false;

        const loadContributions = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    if (!cancelled) {
                        setContributions([]);
                        setLoading(false);
                    }
                    return;
                }

                const res = await fetch(
                    `${API_URL}/api/contributions/creator/my-contributions`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                console.log("Creator contributions API:", data);

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to load contributions."
                    );
                }

                const pendingContributions = (data.contributions || []).filter(
                    (item) =>
                        String(item.status || "").toLowerCase() === "pending"
                );

                if (!cancelled) {
                    setContributions(pendingContributions);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Load contributions error:", error);

                if (!cancelled) {
                    setContributions([]);
                    setLoading(false);

                    toast.error(
                        error.message || "Failed to load contributions."
                    );
                }
            }
        };

        loadContributions();

        return () => {
            cancelled = true;
        };
    }, [API_URL]);

    const handleApprove = async (contributionId) => {
        if (!contributionId || processingId !== null) {
            return;
        }

        try {
            setProcessingId(contributionId);

            const token = localStorage.getItem("accessToken");

            if (!token) {
                toast.error("Please login again.");
                return;
            }

            const res = await fetch(
                `${API_URL}/api/contributions/${contributionId}/approve`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to approve contribution."
                );
            }

            setContributions((prev) =>
                prev.filter((item) => item._id !== contributionId)
            );

            setSelectedContribution(null);

            toast.success(
                data.message || "Contribution approved successfully."
            );
        } catch (error) {
            console.error("Approve contribution error:", error);

            toast.error(
                error.message || "Failed to approve contribution."
            );
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (contributionId) => {
        if (!contributionId || processingId !== null) {
            return;
        }

        try {
            setProcessingId(contributionId);

            const token = localStorage.getItem("accessToken");

            if (!token) {
                toast.error("Please login again.");
                return;
            }

            const res = await fetch(
                `${API_URL}/api/contributions/${contributionId}/reject`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to reject contribution."
                );
            }

            setContributions((prev) =>
                prev.filter((item) => item._id !== contributionId)
            );

            setSelectedContribution(null);

            toast.success(
                data.message ||
                "Contribution rejected and credits refunded."
            );
        } catch (error) {
            console.error("Reject contribution error:", error);

            toast.error(
                error.message || "Failed to reject contribution."
            );
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-bold">
                        Contributions To Review
                    </h2>

                    <p className="mt-1 text-sm text-base-content/60">
                        Review pending contributions made to your campaigns.
                    </p>
                </div>

                <div className="flex min-h-40 items-center justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            Contributions To Review
                        </h2>

                        <p className="mt-1 text-sm text-base-content/60">
                            Review pending contributions made to your
                            campaigns.
                        </p>
                    </div>

                    <div className="badge badge-warning gap-1 px-3 py-3">
                        {contributions.length} Pending
                    </div>
                </div>

                {contributions.length === 0 ? (
                    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-base-300 px-4">
                        <div className="text-center">
                            <p className="font-medium">
                                No pending contributions
                            </p>

                            <p className="mt-1 text-sm text-base-content/60">
                                All contributions have been reviewed.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Supporter</th>
                                    <th>Campaign</th>
                                    <th>Contribution</th>
                                    <th>View Contribution</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {contributions.map((contribution) => {
                                    const contributionId =
                                        contribution._id;

                                    const amount = Number(
                                        contribution.contribution_amount || 0
                                    );

                                    const credits = Number(
                                        contribution.contribution_credit || 0
                                    );

                                    const isProcessing =
                                        processingId === contributionId;

                                    return (
                                        <tr key={contributionId}>
                                            <td>
                                                <div>
                                                    <div className="font-semibold">
                                                        {contribution.supporter_name ||
                                                            "Unknown Supporter"}
                                                    </div>

                                                    <div className="text-xs text-base-content/60">
                                                        {contribution.supporter_email ||
                                                            "No email"}
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="font-medium">
                                                    {contribution.campaignTitle ||
                                                        contribution.campaign_title ||
                                                        "Untitled Campaign"}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="font-semibold">
                                                    ${amount.toFixed(2)}
                                                </div>

                                                <div className="text-xs text-base-content/60">
                                                    {credits} credits
                                                </div>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline"
                                                    disabled={
                                                        processingId !== null
                                                    }
                                                    onClick={() =>
                                                        setSelectedContribution(
                                                            contribution
                                                        )
                                                    }
                                                >
                                                    View Contribution
                                                </button>
                                            </td>

                                            <td>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        disabled={
                                                            processingId !== null
                                                        }
                                                        onClick={() =>
                                                            handleApprove(
                                                                contributionId
                                                            )
                                                        }
                                                    >
                                                        {isProcessing ? (
                                                            <span className="loading loading-spinner loading-xs"></span>
                                                        ) : (
                                                            "Approve"
                                                        )}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-error btn-outline"
                                                        disabled={
                                                            processingId !== null
                                                        }
                                                        onClick={() =>
                                                            handleReject(
                                                                contributionId
                                                            )
                                                        }
                                                    >
                                                        {isProcessing ? (
                                                            <span className="loading loading-spinner loading-xs"></span>
                                                        ) : (
                                                            "Reject"
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedContribution && (
                <dialog
                    open
                    className="modal modal-bottom sm:modal-middle"
                >
                    <div className="modal-box">
                        <h3 className="text-xl font-bold">
                            Contribution Details
                        </h3>

                        <div className="mt-5 space-y-4">
                            <div>
                                <p className="text-sm text-base-content/60">
                                    Supporter
                                </p>

                                <p className="font-semibold">
                                    {selectedContribution.supporter_name ||
                                        "Unknown Supporter"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-base-content/60">
                                    Email
                                </p>

                                <p className="break-all font-medium">
                                    {selectedContribution.supporter_email ||
                                        "No email"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-base-content/60">
                                    Campaign
                                </p>

                                <p className="font-semibold">
                                    {selectedContribution.campaignTitle ||
                                        selectedContribution.campaign_title ||
                                        "Untitled Campaign"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl bg-base-200 p-3">
                                    <p className="text-sm text-base-content/60">
                                        Credits
                                    </p>

                                    <p className="mt-1 text-lg font-bold">
                                        {Number(
                                            selectedContribution.contribution_credit ||
                                            0
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-base-200 p-3">
                                    <p className="text-sm text-base-content/60">
                                        Amount
                                    </p>

                                    <p className="mt-1 text-lg font-bold">
                                        $
                                        {Number(
                                            selectedContribution.contribution_amount ||
                                            0
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-base-content/60">
                                    Contribution Date
                                </p>

                                <p className="font-medium">
                                    {selectedContribution.contribution_date
                                        ? new Date(
                                            selectedContribution.contribution_date
                                        ).toLocaleString()
                                        : "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-base-content/60">
                                    Message
                                </p>

                                {selectedContribution.message ? (
                                    <div className="mt-1 whitespace-pre-wrap rounded-lg bg-base-200 p-3">
                                        {selectedContribution.message}
                                    </div>
                                ) : (
                                    <div className="mt-1 rounded-lg bg-base-200 p-3 text-sm text-base-content/60">
                                        No message provided.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                disabled={processingId !== null}
                                onClick={() =>
                                    setSelectedContribution(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="btn btn-error btn-outline"
                                disabled={processingId !== null}
                                onClick={() =>
                                    handleReject(
                                        selectedContribution._id
                                    )
                                }
                            >
                                {processingId ===
                                    selectedContribution._id ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    "Reject"
                                )}
                            </button>

                            <button
                                type="button"
                                className="btn btn-success"
                                disabled={processingId !== null}
                                onClick={() =>
                                    handleApprove(
                                        selectedContribution._id
                                    )
                                }
                            >
                                {processingId ===
                                    selectedContribution._id ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    "Approve"
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        className="modal-backdrop"
                        onClick={() => {
                            if (processingId === null) {
                                setSelectedContribution(null);
                            }
                        }}
                    ></div>
                </dialog>
            )}
        </>
    );

};

export default ContributionsToReview;
