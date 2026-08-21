"use client";

import { useEffect, useMemo, useState } from "react";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineUserGroup,
    HiOutlineShieldCheck,
    HiOutlineUserCircle,
    HiOutlineCreditCard,
    HiOutlineArrowPath,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";

const UsersManagePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load users.");
            }

            setUsers(Array.isArray(data.users) ? data.users : []);
        } catch (error) {
            toast.error(error.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.trim().toLowerCase();

            const matchesSearch =
                !searchValue ||
                user.name?.toLowerCase().includes(searchValue) ||
                user.email?.toLowerCase().includes(searchValue);

            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const getRoleClass = (role) => {
        if (role === "admin") {
            return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
        }

        if (role === "creator") {
            return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400";
        }

        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
    };

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
                                {
                                    users.filter(
                                        (user) => user.role === "supporter"
                                    ).length
                                }
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
                                {
                                    users.filter(
                                        (user) => user.role === "creator"
                                    ).length
                                }
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
                                {
                                    users.filter(
                                        (user) => user.role === "admin"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                            <HiOutlineShieldCheck className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            value={roleFilter}
                            onChange={(event) =>
                                setRoleFilter(event.target.value)
                            }
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                            <option value="all">All Roles</option>
                            <option value="supporter">Supporters</option>
                            <option value="creator">Creators</option>
                            <option value="admin">Admins</option>
                        </select>

                        <button
                            type="button"
                            onClick={fetchUsers}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                            <HiOutlineArrowPath
                                className={`h-5 w-5 ${loading ? "animate-spin" : ""
                                    }`}
                            />
                            Refresh
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
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Role
                                    </th>

                                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Credits
                                    </th>

                                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user._id || user.id}
                                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.profileImage ? (
                                                    <img
                                                        src={user.profileImage}
                                                        alt={user.name || "User"}
                                                        className="h-11 w-11 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                                        <HiOutlineUserCircle className="h-7 w-7" />
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">
                                                        {user.name || "Unknown User"}
                                                    </p>

                                                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${getRoleClass(
                                                    user.role
                                                )}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <HiOutlineCreditCard className="h-5 w-5 text-indigo-500" />

                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {user.credits ?? 0}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersManagePage;