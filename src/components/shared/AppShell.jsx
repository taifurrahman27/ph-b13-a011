"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const AppShell = ({ children }) => {
    const pathname = usePathname();
    const hideShell = pathname?.startsWith("/dashboard");

    return (
        <div className="flex min-h-screen flex-col">
            {!hideShell && <Navbar />}

            <main className="flex-1">{children}</main>

            {!hideShell && <Footer />}
        </div>
    );
};

export default AppShell;
