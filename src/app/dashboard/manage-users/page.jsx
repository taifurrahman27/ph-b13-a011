"use client";

import { useEffect, useMemo, useState } from "react";
import {
    HiOutlineArrowPath,
    HiOutlineMagnifyingGlass,
    HiOutlineShieldCheck,
    HiOutlineUserCircle,
    HiOutlineUserGroup,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";
import UsersTable from "@/components/dashboard/admin/UsersTable";

const UsersManagePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        let cancelled = false;

        const loadUsers = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    throw new Error("Authentication token not found.");
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load users."
                    );
                }

                if (!cancelled) {
                    setUsers(Array.isArray(data.users) ? data.users : []);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Fetch users error:", error);
                    toast.error(
                        error.message || "Failed to load users."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadUsers();

        return () => {
            cancelled = true;
        };
    }, []);

    const refreshUsers = async () => {
        setRefreshing(true);

        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                throw new Error("Authentication token not found.");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to refresh users."
                );
            }

            setUsers(Array.isArray(data.users) ? data.users : []);

            toast.success("Users refreshed successfully.");
        } catch (error) {
            console.error("Refresh users error:", error);
            toast.error(
                error.message || "Failed to refresh users."
            );
        } finally {
            setRefreshing(false);
        }
    };

    const filteredUsers = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !searchValue ||
                user.name?.toLowerCase().includes(searchValue) ||
                user.email?.toLowerCase().includes(searchValue);

            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const supporterCount = users.filter(
        (user) => user.role === "supporter"
    ).length;

    const creatorCount = users.filter(
        (user) => user.role === "creator"
    ).length;

    const adminCount = users.filter(
        (user) => user.role === "admin"
    ).length;

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Administration
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    Manage Users
                </h1>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    View and manage all CrowdFunding users from one place.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Users
                            </p>

                            <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                                {users.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <HiOutlineUserGroup className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Supporters
                            </p>

                            <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                                {supporterCount}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <HiOutlineUserCircle className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Creators
                            </p>

                            <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                                {creatorCount}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <HiOutlineShieldCheck className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Admins
                            </p>

                            <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                                {adminCount}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                            <HiOutlineShieldCheck className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search by name or email..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                        <select
                            value={roleFilter}
                            onChange={(event) =>
                                setRoleFilter(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-auto"
                        >
                            <option value="all">All Roles</option>
                            <option value="supporter">Supporters</option>
                            <option value="creator">Creators</option>
                            <option value="admin">Admins</option>
                        </select>

                        <button
                            type="button"
                            onClick={refreshUsers}
                            disabled={loading || refreshing}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                            <HiOutlineArrowPath
                                className={`h-5 w-5 ${refreshing ? "animate-spin" : ""
                                    }`}
                            />

                            {refreshing ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex min-h-64 items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
                        <HiOutlineUserGroup className="h-12 w-12 text-slate-300 dark:text-slate-700" />

                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                            No users found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Try changing your search or role filter.
                        </p>
                    </div>
                ) : (
                    <UsersTable users={filteredUsers} />
                )}
            </div>
        </div>
    );
};

export default UsersManagePage;
