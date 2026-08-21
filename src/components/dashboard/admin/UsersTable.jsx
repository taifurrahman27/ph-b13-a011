"use client";

import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineUserCircle,
    HiOutlineCreditCard,
} from "react-icons/hi2";

const UsersTable = ({ users }) => {
    const getRoleClass = (role) => {
        if (role === "admin") {
            return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
        }

        if (role === "creator") {
            return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400";
        }

        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
    };

    if (!users.length) {
        return (
            <div className="flex min-h-64 items-center justify-center px-5 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    No users found.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-190">
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
                    {users.map((user) => (
                        <tr
                            key={user._id || user.id}
                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        >
                            <td className="px-5 py-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    {user.profileImage ? (
                                        <Image
                                            src={user.profileImage}
                                            alt={user.name || "User"}
                                            width={44}
                                            height={44}
                                            unoptimized
                                            className="h-11 w-11 shrink-0 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                            <HiOutlineUserCircle className="h-7 w-7" />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate font-bold text-slate-900 dark:text-white">
                                            {user.name || "Unknown User"}
                                        </p>

                                        <p className="mt-0.5 max-w-65 truncate text-sm text-slate-500 dark:text-slate-400">
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
                                <Link
                                    href={`/dashboard/users/${user._id || user.id}`}
                                    className="rounded-lg px-3 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
