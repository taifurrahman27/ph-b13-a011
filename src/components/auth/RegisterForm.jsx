"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    HiOutlineArrowRight,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineLightBulb,
    HiOutlineUserGroup,
} from "react-icons/hi2";
import { registerUser } from "@/lib/auth";

const RegisterForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profileImage: "",
        password: "",
        role: "supporter",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser(formData);

            localStorage.setItem("accessToken", data.token);

            router.push("/dashboard");
        } catch (error) {
            setError(error.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/10";

    return (
        <main className="min-h-[calc(100vh-80px)] bg-white px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-indigo-100/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-indigo-950/20 lg:grid-cols-2">
                <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600">
                            <HiOutlineLightBulb className="h-6 w-6" />
                        </div>

                        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
                            Join CrowdFunding
                        </p>

                        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Turn meaningful ideas into real impact.
                        </h1>

                        <p className="mt-5 text-base leading-7 text-slate-400">
                            Create an account to discover inspiring campaigns,
                            support passionate creators, and build meaningful
                            projects together.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                                ✓
                            </span>
                            Discover meaningful campaigns
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                                ✓
                            </span>
                            Support ideas you believe in
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                                ✓
                            </span>
                            Start with credits on registration
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-10 lg:p-12">
                    <div className="mx-auto max-w-md">
                        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Create your account
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                            Join CrowdFunding
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Create your account and start supporting ideas that
                            matter.
                        </p>

                        {error && (
                            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="profileImage"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Profile Picture URL
                                </label>

                                <input
                                    id="profileImage"
                                    name="profileImage"
                                    type="url"
                                    value={formData.profileImage}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Minimum 8 characters"
                                        required
                                        minLength={8}
                                        className={`${inputClass} pr-12`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) => !previous
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                                    >
                                        {showPassword ? (
                                            <HiOutlineEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <HiOutlineEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Choose your role
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((previous) => ({
                                                ...previous,
                                                role: "supporter",
                                            }))
                                        }
                                        className={`rounded-xl border p-4 text-left transition-all ${formData.role === "supporter"
                                                ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10 dark:border-indigo-400 dark:bg-indigo-950/30"
                                                : "border-slate-200 bg-slate-50 hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-800"
                                            }`}
                                    >
                                        <HiOutlineUserGroup className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />

                                        <span className="mt-2 block text-sm font-bold text-slate-900 dark:text-white">
                                            Supporter
                                        </span>

                                        <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                                            Start with 50 credits
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((previous) => ({
                                                ...previous,
                                                role: "creator",
                                            }))
                                        }
                                        className={`rounded-xl border p-4 text-left transition-all ${formData.role === "creator"
                                                ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10 dark:border-indigo-400 dark:bg-indigo-950/30"
                                                : "border-slate-200 bg-slate-50 hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-800"
                                            }`}
                                    >
                                        <HiOutlineLightBulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />

                                        <span className="mt-2 block text-sm font-bold text-slate-900 dark:text-white">
                                            Creator
                                        </span>

                                        <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                                            Start with 20 credits
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create Account"}

                                {!loading && (
                                    <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterForm;