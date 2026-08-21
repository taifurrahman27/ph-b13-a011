"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen((current) => !current);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="flex min-h-screen">
                <div
                    className={`fixed inset-0 z-100 lg:hidden ${sidebarOpen
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                        }`}
                >
                    <button
                        type="button"
                        aria-label="Close sidebar"
                        onClick={closeSidebar}
                        className={`absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${sidebarOpen
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                    />

                    <aside
                        className={`absolute left-0 top-0 z-101 h-full w-72 max-w-[85vw] border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950 ${sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                            }`}
                    >
                        <DashboardSidebar
                            onNavigate={closeSidebar}
                            onClose={closeSidebar}
                        />
                    </aside>
                </div>

                <aside className="hidden lg:flex lg:w-72 lg:shrink-0">
                    <DashboardSidebar />
                </aside>

                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardHeader
                        sidebarOpen={sidebarOpen}
                        onMenuClick={toggleSidebar}
                    />

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
