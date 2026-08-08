import Link from "next/link";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";
import {
    HiArrowUpRight,
    HiOutlineCodeBracket,
    HiOutlineHeart,
    HiOutlineSparkles,
} from "react-icons/hi2";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/taifurrahman27",
        icon: FaGithub,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: FaLinkedinIn,
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/",
        icon: FaFacebookF,
    },
];

const footerLinks = {
    Platform: [
        {
            name: "Explore Campaigns",
            href: "/campaigns",
        },
        {
            name: "Create Campaign",
            href: "/campaigns/create",
        },
    ],
    Account: [
        {
            name: "Login",
            href: "/login",
        },
        {
            name: "Register",
            href: "/register",
        },
        {
            name: "Dashboard",
            href: "/dashboard",
        },
    ],
};

const Footer = () => {
    return (<footer className="border-t border-slate-200 bg-white text-slate-900 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

                <div className="max-w-md">

                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2.5"
                        aria-label="CrowdFund home"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500 dark:shadow-indigo-950/30">
                            <HiOutlineSparkles className="h-5.5 w-5.5" />
                        </span>

                        <span className="text-2xl font-extrabold tracking-tight">
                            Crowd
                            <span className="text-indigo-600 dark:text-indigo-400">
                                Fund
                            </span>
                        </span>
                    </Link>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
                        A community-powered crowdfunding platform where
                        creators bring meaningful ideas to life and
                        supporters help make them possible.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;

                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit our ${social.name} profile`}
                                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-600 dark:hover:text-white"
                                >
                                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Platform
                    </h3>

                    <ul className="mt-5 space-y-3">
                        {footerLinks.Platform.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="group inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                                >
                                    {link.name}

                                    <HiArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Account
                    </h3>

                    <ul className="mt-5 space-y-3">
                        {footerLinks.Account.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="group inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                                >
                                    {link.name}

                                    <HiArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Built With Purpose
                    </h3>

                    <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Have an idea worth building? Join the community
                        and help turn ambitious ideas into reality.
                    </p>

                    <a
                        href="https://github.com/taifurrahman27/ph-b13-a011"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-indigo-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md dark:shadow-indigo-950/30"
                    >
                        <HiOutlineCodeBracket className="h-5 w-5" />
                        Join as Developer
                    </a>
                </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 py-6 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">

                <p className="text-slate-500 dark:text-slate-500">
                    © {new Date().getFullYear()} CrowdFund. All rights reserved.
                </p>

                <p className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-500">
                    Made with
                    <HiOutlineHeart className="h-4 w-4 text-indigo-500" />
                    for ideas that matter.
                </p>
            </div>
        </div>
    </footer>
    );

};

export default Footer;
