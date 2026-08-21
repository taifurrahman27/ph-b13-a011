export const googleAuth = async ({
    credential,
    role = null,
}) => {
    if (!credential) {
        throw new Error("Google credential is required.");
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                credential,
                role,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Google authentication failed."
        );
    }

    return data;
};
