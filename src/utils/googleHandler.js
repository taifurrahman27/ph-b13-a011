import { googleAuth } from "@/actions/googleAuth";

export const handleGoogleAuth = async ({
    response,
    role = null,
}) => {
    if (!response?.credential) {
        throw new Error("Google credential is missing.");
    }

    const data = await googleAuth({
        credential: response.credential,
        role,
    });

    return data;
};
