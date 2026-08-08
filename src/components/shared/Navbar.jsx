"use client";

import Link from "next/link";
import { useState } from "react";
import {
    HiBars3,
    HiXMark,
    HiOutlineSquares2X2,
    HiOutlineUserCircle,
    HiOutlineArrowRightOnRectangle,
    HiOutlineCodeBracket,
    HiOutlineWallet,
    HiOutlineSparkles,
} from "react-icons/hi2";

const CLIENT_GITHUB_REPO =
    "https://github.com/taifurrahman27/ph-b13-a011";

const Navbar = () => {
    /*
     * Temporary preview state.
     *
     * This allows us to test both logged-out and logged-in
     * navbar states before authentication is implemented.
     *
     * Later this will be replaced with the real authentication state.
     */
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const togglePreview = () => {
        setIsLoggedIn((prev) => !prev);
        closeMenu();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        closeMenu();
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                {/* ==================== Logo ==================== */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="group flex shrink-0 items-center gap-2.5"
                    aria-label="CrowdFund home"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-700">
                        <HiOutlineSparkles className="h-5 w-5" />
                    </span>

                    <span className="text-xl font-extrabold tracking-tight text-slate-950">
                        Crowd<span className="text-indigo-600">Funding</span>
                    </span>
                </Link>

                {/* ==================== Desktop Navigation ==================== */}
                <div className="hidden items-center gap-3 md:flex">

                    {/* Development Preview Toggle */}
                    <button
                        type="button"
                        onClick={togglePreview}
                        className="rounded-full border border-dashed border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        {isLoggedIn
                            ? "Preview Guest"
                            : "Preview Logged In"}
                    </button>

                    <nav className="flex items-center gap-1">
                        {!isLoggedIn ? (
                            <>
                                {/* Explore Campaigns */}
                                <Link
                                    href="/campaigns"
                                    className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    <HiOutlineSquares2X2 className="h-5 w-5 transition-transform group-hover:scale-105" />
                                    Explore Campaigns
                                </Link>

                                {/* Login */}
                                <Link
                                    href="/login"
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                                >
                                    Login
                                </Link>

                                {/* Register */}
                                <Link
                                    href="/register"
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Dashboard */}
                                <Link
                                    href="/dashboard"
                                    className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    <HiOutlineSquares2X2 className="h-5 w-5 transition-transform group-hover:scale-105" />
                                    Dashboard
                                </Link>

                                {/* Available Credits */}
                                <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2.5">
                                    <HiOutlineWallet className="h-5 w-5 text-indigo-600" />

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-slate-500">
                                            Credits
                                        </span>

                                        <span className="rounded-md bg-white px-1.5 py-0.5 text-sm font-bold text-indigo-600 shadow-sm">
                                            50
                                        </span>
                                    </div>
                                </div>

                                {/* Profile */}
                                <Link
                                    href="/profile"
                                    className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                                >
                                    <HiOutlineUserCircle className="h-5 w-5 transition-transform group-hover:scale-105" />
                                    Profile
                                </Link>

                                {/* Logout */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                                >
                                    <HiOutlineArrowRightOnRectangle className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Join as Developer */}
                        <a
                            href={CLIENT_GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <HiOutlineCodeBracket className="h-5 w-5" />
                            Join as Developer
                        </a>
                    </nav>
                </div>

                {/* ==================== Mobile Menu Button ==================== */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-100 md:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <HiXMark className="h-6 w-6" />
                    ) : (
                        <HiBars3 className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* ==================== Mobile Navigation ==================== */}
            {isMenuOpen && (
                <div className="border-t border-slate-200 bg-white md:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">

                        {/* Development Preview Toggle */}
                        <button
                            type="button"
                            onClick={togglePreview}
                            className="mb-2 flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <span>Development Preview</span>

                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold shadow-sm">
                                {isLoggedIn ? "Logged In" : "Guest"}
                            </span>
                        </button>

                        {!isLoggedIn ? (
                            <>
                                {/* Explore Campaigns */}
                                <Link
                                    href="/campaigns"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    <HiOutlineSquares2X2 className="h-5 w-5" />
                                    Explore Campaigns
                                </Link>

                                {/* Login */}
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                                >
                                    Login
                                </Link>

                                {/* Register */}
                                <Link
                                    href="/register"
                                    onClick={closeMenu}
                                    className="mt-1 flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Dashboard */}
                                <Link
                                    href="/dashboard"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    <HiOutlineSquares2X2 className="h-5 w-5" />
                                    Dashboard
                                </Link>

                                {/* Available Credits */}
                                <div className="my-1 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineWallet className="h-5 w-5 text-indigo-600" />

                                        <span className="text-sm font-semibold text-slate-600">
                                            Available Credits
                                        </span>
                                    </div>

                                    <span className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-indigo-600 shadow-sm">
                                        50
                                    </span>
                                </div>

                                {/* Profile */}
                                <Link
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                                >
                                    <HiOutlineUserCircle className="h-5 w-5" />
                                    Profile
                                </Link>

                                {/* Logout */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Join as Developer */}
                        <a
                            href={CLIENT_GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <HiOutlineCodeBracket className="h-5 w-5" />
                            Join as Developer
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;