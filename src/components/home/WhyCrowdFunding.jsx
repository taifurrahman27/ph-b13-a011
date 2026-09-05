import {
    HiOutlineHeart,
    HiOutlineLightBulb,
    HiOutlineSparkles,
    HiOutlineUserGroup,
} from "react-icons/hi2";

const benefits = [
    {
        id: 1,
        title: "Discover Meaningful Ideas",
        description:
            "Explore inspiring campaigns and discover ideas that have the potential to create a meaningful impact.",
        icon: HiOutlineLightBulb,
        label: "Find your next inspiration",
    },
    {
        id: 2,
        title: "Support Creators",
        description:
            "Help passionate creators bring their ideas to life by supporting the campaigns you believe in.",
        icon: HiOutlineHeart,
        label: "Make an impact",
    },
    {
        id: 3,
        title: "Build Together",
        description:
            "Join a growing community where creators and supporters work together to turn ideas into reality.",
        icon: HiOutlineUserGroup,
        label: "Be part of the journey",
    },
];

const WhyCrowdFunding = () => {
    return (
        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
            <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-600/10" />
            <div className="absolute bottom-10 right-0 -z-10 h-80 w-80 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-600/10" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-950/30 dark:text-indigo-400">
                        <HiOutlineSparkles className="h-4 w-4" />
                        Why CrowdFunding
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                        Ideas Are Better When
                        <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            We Build Together
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                        CrowdFunding brings creators and supporters together
                        to discover meaningful ideas, make a difference, and
                        turn ambitious visions into reality.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.id}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/20"
                            >
                                <div className="absolute -right-5 -top-7 select-none text-8xl font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-indigo-50 dark:text-slate-800/70 dark:group-hover:text-indigo-950/50">
                                    0{index + 1}
                                </div>

                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white dark:group-hover:shadow-indigo-950/50">
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {benefit.description}
                                    </p>

                                    <div className="mt-7 h-px w-full bg-slate-100 dark:bg-slate-800" />

                                    <div className="mt-5 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                        {benefit.label}

                                        <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
                            </div>
                        );
                    })}
                </div>

                <div className="relative mt-8 overflow-hidden rounded-3xl border border-indigo-100 bg-linear-to-r from-indigo-50 via-white to-purple-50 dark:border-indigo-500/20 dark:from-indigo-950/30 dark:via-slate-900 dark:to-purple-950/30">
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
                    <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10" />

                    <div className="relative flex flex-col items-start gap-6 p-7 sm:p-9 md:flex-row md:items-center">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-950/50">
                            <HiOutlineUserGroup className="h-7 w-7" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Your support can make an idea possible.
                            </h3>

                            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Whether you create or support, every
                                contribution helps build a community where
                                meaningful ideas can grow.
                            </p>
                        </div>

                        <div className="hidden shrink-0 md:block">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400">
                                →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyCrowdFunding;
