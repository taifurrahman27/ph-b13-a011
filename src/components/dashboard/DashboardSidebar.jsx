"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    HiOutlineBanknotes,
    HiOutlineChartBar,
    HiOutlineClipboardDocumentList,
    HiOutlineCreditCard,
    HiOutlineHome,
    HiOutlineMegaphone,
    HiOutlinePlusCircle,
    HiOutlineSparkles,
    HiOutlineUsers,
    HiOutlineXMark,
} from "react-icons/hi2";

const navigation = {
    supporter: [
        {
            label: "Home",
            href: "/dashboard",
            icon: HiOutlineHome,
        },
        {
            label: "Explore Campaigns",
            href: "/dashboard/explore-campaigns",
            icon: HiOutlineMegaphone,
        },
        {
            label: "My Contributions",
            href: "/dashboard/my-contributions",
            icon: HiOutlineClipboardDocumentList,
        },
        {
            label: "Purchase Credit",
            href: "/dashboard/purchase-credit",
            icon: HiOutlineCreditCard,
        },
        {
            label: "Payment History",
            href: "/dashboard/payment-history",
            icon: HiOutlineBanknotes,
        },
    ],

    creator: [
        {
            label: "Home",
            href: "/dashboard",
            icon: HiOutlineHome,
        },
        {
            label: "Add New Campaign",
            href: "/dashboard/add-new-campaign",
            icon: HiOutlinePlusCircle,
        },
        {
            label: "My Campaigns",
            href: "/dashboard/my-campaigns",
            icon: HiOutlineMegaphone,
        },
        {
            label: "Withdrawals",
            href: "/dashboard/withdrawals",
            icon: HiOutlineBanknotes,
        },
        {
            label: "Payment History",
            href: "/dashboard/payment-history",
            icon: HiOutlineCreditCard,
        },
    ],

    admin: [
        {
            label: "Home",
            href: "/dashboard",
            icon: HiOutlineHome,
        },
        {
            label: "Manage Users",
            href: "/dashboard/manage-users",
            icon: HiOutlineUsers,
        },
        {
            label: "Manage Campaigns",
            href: "/dashboard/manage-campaigns",
            icon: HiOutlineMegaphone,
        },
        {
            label: "Withdrawal Requests",
            href: "/dashboard/withdrawal-requests",
            icon: HiOutlineBanknotes,
        },
        {
            label: "Reports",
            href: "/dashboard/reports",
            icon: HiOutlineChartBar,
        },
    ],
};

const DashboardSidebar = ({ onNavigate, onClose }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                setUser(null);
                return;
            }

            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        };

        loadUser();

        window.addEventListener("auth-change", loadUser);

        return () => {
            window.removeEventListener("auth-change", loadUser);
        };
    }, []);

    const role = user?.role?.toLowerCase();

    const menuItems = navigation[role] || [
        {
            label: "Home",
            href: "/dashboard",
            icon: HiOutlineHome,
        },
    ];

    const handleNavigation = () => {
        onNavigate?.();
    };

    return (
        <aside className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-slate-900">
            <header className="sticky top-0 z-20 shrink-0 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href="/"
                        onClick={handleNavigation}
                        className="group flex min-w-0 items-center gap-3"
                    >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-transform duration-200 group-hover:scale-105">
                            <HiOutlineSparkles className="h-6 w-6" />
                        </span>

                        <div className="min-w-0">
                            <span className="block truncate text-lg font-black tracking-tight text-slate-900 dark:text-white">
                                Crowd
                                <span className="text-indigo-600 dark:text-indigo-400">
                                    Funding
                                </span>
                            </span>

                            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                                Dashboard
                            </span>
                        </div>
                    </Link>

                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close sidebar"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-red-500/40 dark:hover:bg-red-950/30 dark:hover:text-red-400 lg:hidden"
                        >
                            <HiOutlineXMark className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="px-4 py-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center gap-3">
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-indigo-100 dark:bg-indigo-950">
                                {user?.profileImage ? (
                                    <Image
                                        src={user.profileImage}
                                        alt={user.name || "User"}
                                        fill
                                        sizes="44px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                    {user?.name || "User"}
                                </p>

                                <p className="mt-0.5 text-xs font-semibold capitalize text-indigo-600 dark:text-indigo-400">
                                    {user?.role || "User"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 dark:bg-slate-900">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Available Credits
                            </span>

                            <span className="text-sm font-black text-slate-900 dark:text-white">
                                {user?.credits ?? 0}
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="px-4 pb-6">
                    <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Navigation
                    </p>

                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleNavigation}
                                    className="group flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                                >
                                    <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />

                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>

            <footer className="shrink-0 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    CrowdFunding Dashboard
                </p>
            </footer>
        </aside>
    );
};

export default DashboardSidebar;