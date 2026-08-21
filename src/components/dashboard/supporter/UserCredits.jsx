"use client";

import { useEffect, useState } from "react";

const UserCredits = () => {
    const [credits, setCredits] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return;
        }

        try {
            const user = JSON.parse(storedUser);
            const currentCredits = Number(user?.credits) || 0;

            const timer = setTimeout(() => {
                setCredits(currentCredits);
            }, 0);

            return () => clearTimeout(timer);
        } catch (error) {
            console.error("Failed to read user data:", error);
        }
    }, [mounted]);

    return (
        <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
            {credits.toLocaleString()}
        </h2>
    );
};

export default UserCredits;