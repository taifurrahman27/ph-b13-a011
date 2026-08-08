import Link from "next/link";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

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

const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">

                    {/* Brand */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5"
                        aria-label="CrowdFund home"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-950/30 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500">
                            <HiOutlineSparkles className="h-5 w-5" />
                        </span>

                        <div>
                            <span className="block text-xl font-extrabold tracking-tight">
                                Crowd<span className="text-indigo-400">Fund</span>
                            </span>

                            <span className="text-xs text-slate-500">
                                Fund ideas. Build futures.
                            </span>
                        </div>
                    </Link>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;

                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit our ${social.name} profile`}
                                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                                >
                                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Divider & Copyright */}
                <div className="mt-8 border-t border-slate-800 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} CrowdFund. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;