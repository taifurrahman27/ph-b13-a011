"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    HiOutlineArrowRight,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineLightBulb,
    HiOutlineShieldCheck,
} from "react-icons/hi2";

const LoginForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.dispatchEvent(new Event("auth-change"));

            router.push("/dashboard");
        } catch (error) {
            setError(error.message || "Something went wrong during login.");
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
                            Welcome Back
                        </p>

                        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Ideas grow when people believe in them.
                        </h1>

                        <p className="mt-5 text-base leading-7 text-slate-400">
                            Sign in to discover meaningful campaigns, support
                            creators, and continue building something better
                            together.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                <HiOutlineShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-white">
                                    Secure Access
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Your account is protected with secure
                                    authentication.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-10 lg:p-12">
                    <div className="mx-auto max-w-md">
                        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Sign in
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                            Welcome back
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Sign in to your CrowdFunding account to continue.
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
                                    autoComplete="email"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                    >
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

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
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className={`${inputClass} pr-12`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) => !previous
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                                    >
                                        {showPassword ? (
                                            <HiOutlineEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <HiOutlineEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign In"}

                                {!loading && (
                                    <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                                )}
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                            <span className="text-xs font-medium text-slate-400">
                                OR
                            </span>

                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-750"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M6.53 13.83A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.53Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.24 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.53c.77-2.31 2.93-4.03 5.47-4.03Z"
                                />
                            </svg>

                            Continue with Google
                        </button>

                        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginForm;
