"use client";

import {
    HiOutlineMagnifyingGlass,
    HiOutlineHeart,
    HiOutlineSparkles,
} from "react-icons/hi2";

const steps = [
    {
        id: 1,
        icon: HiOutlineMagnifyingGlass,
        title: "Discover",
        description:
            "Explore campaigns and discover creative ideas, meaningful projects, and causes that deserve your attention.",
    },
    {
        id: 2,
        icon: HiOutlineHeart,
        title: "Support",
        description:
            "Choose a campaign you believe in and support it with a contribution that helps bring the creator's vision closer to reality.",
    },
    {
        id: 3,
        icon: HiOutlineSparkles,
        title: "Make an Impact",
        description:
            "Be part of something meaningful as your support helps creators turn ambitious ideas into real-world results.",
    },
];

const HowItWorks = () => {
    return (<section className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-slate-950 sm:py-24"> <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                Simple & Meaningful
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                How CrowdFunding Works
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                Turning a great idea into reality is easier when people
                come together. Discover, support, and make a difference.
            </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">

            {/* Connecting Line */}
            <div className="absolute left-[16.66%] right-[16.66%] top-14 hidden h-px bg-linear-to-r from-indigo-200 via-indigo-400 to-indigo-200 md:block dark:from-indigo-500/10 dark:via-indigo-500/40 dark:to-indigo-500/10" />

            {steps.map((step) => {
                const Icon = step.icon;

                return (
                    <div
                        key={step.id}
                        className="group relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/20"
                    >
                        {/* Icon */}
                        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                            <Icon className="h-7 w-7" />
                        </div>

                        {/* Step Number */}
                        <span className="absolute right-5 top-5 text-xs font-bold text-slate-300 dark:text-slate-700">
                            0{step.id}
                        </span>

                        {/* Content */}
                        <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                            {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {step.description}
                        </p>
                    </div>
                );
            })}
        </div>
    </div>
    </section>
    );

};

export default HowItWorks;
