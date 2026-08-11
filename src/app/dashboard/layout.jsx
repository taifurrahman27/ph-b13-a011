"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="flex min-h-screen">
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close sidebar"
                        className={`absolute inset-0 bg-slate-900/50 transition duration-200 ${sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
                        onClick={() => setSidebarOpen(false)}
                    />

                    <div
                        className={`relative z-50 h-full w-72 max-w-[85vw] transform border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-72 lg:shrink-0">
                    <DashboardSidebar />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="flex-1 p-5 sm:p-6 lg:p-8">
                        {children}
                    </main>

                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
