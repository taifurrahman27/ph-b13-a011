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

            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch {
                    setUser(null);
                }
            }
        };

        loadUser();

        window.addEventListener("auth-change", loadUser);

        return () => {
            window.removeEventListener("auth-change", loadUser);
        };
    }, []);

    const role = user?.role?.toLowerCase();
    const menuItems = navigation[role] || [];

    const handleNavigation = () => {
        if (onNavigate) {
            onNavigate();
        }
    };

    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href="/"
                        onClick={handleNavigation}
                        className="flex items-center gap-3"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500 dark:shadow-indigo-950/40">
                            <HiOutlineSparkles className="h-5 w-5" />
                        </span>

                        <div>
                            <span className="block text-lg font-black tracking-tight text-slate-900 dark:text-white">
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
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-red-500/40 dark:hover:bg-red-950/30 dark:hover:text-red-400 lg:hidden"
                        >
                            <HiOutlineXMark className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>

            <div className="px-4 py-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">


                    <div className="flex items-center gap-3">


                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-indigo-100 dark:bg-indigo-950">
                            {user?.profileImage ? (
                                <Image
                                    src={user.profileImage}
                                    alt={user.name || "User"}
                                    fill
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

            <nav className="flex-1 px-4 pb-6">
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
                                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                            >
                                <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    CrowdFunding Dashboard
                </p>
            </div>
        </div>
    );
};

export default DashboardSidebar;