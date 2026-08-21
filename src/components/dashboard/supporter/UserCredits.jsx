"use client";

const UserCredits = () => {
    let credits = 0;

    try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            credits = Number(parsedUser?.credits || 0);
        }
    } catch (error) {
        console.error("Failed to parse user data:", error);
    }

    return (
        <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
            {credits.toLocaleString()}
        </h2>
    );
};

export default UserCredits;