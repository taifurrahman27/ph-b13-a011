import {
    HiOutlineLightBulb,
    HiOutlineHeart,
    HiOutlineUserGroup,
} from "react-icons/hi2";

const benefits = [
    {
        id: 1,
        title: "Discover Meaningful Ideas",
        description:
            "Explore inspiring campaigns and discover ideas that have the potential to create a meaningful impact.",
        icon: HiOutlineLightBulb,
    },
    {
        id: 2,
        title: "Support Creators",
        description:
            "Help passionate creators bring their ideas to life by supporting the campaigns you believe in.",
        icon: HiOutlineHeart,
    },
    {
        id: 3,
        title: "Build Together",
        description:
            "Join a growing community where creators and supporters work together to turn ideas into reality.",
        icon: HiOutlineUserGroup,
    },
];

const WhyCrowdFunding = () => {
    return (
        <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Why CrowdFunding
                    </span>

                    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                        Ideas are Better When We Build Together
                    </h2>

                    <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                        CrowdFunding brings creators and supporters together
                        to discover meaningful ideas, make a difference, and
                        turn ambitious visions into reality.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 lg:grid-cols-3">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.id}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/30 dark:hover:bg-slate-900 dark:hover:shadow-indigo-950/20"
                            >
                                <div className="absolute right-6 top-5 text-5xl font-black text-slate-200/70 transition-colors duration-300 group-hover:text-indigo-100 dark:text-slate-800 dark:group-hover:text-indigo-950">
                                    0{index + 1}
                                </div>

                                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <div className="relative">
                                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {benefit.description}
                                    </p>
                                </div>

                                <div className="mt-7 h-px w-full bg-slate-200 dark:bg-slate-800" />

                                <div className="mt-5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                    {index === 0 && "Find your next inspiration"}
                                    {index === 1 && "Make an impact"}
                                    {index === 2 && "Be part of the journey"}
                                    <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-950/20">
                    <div className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:p-8">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-950/40">
                            <HiOutlineUserGroup className="h-6 w-6" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Your support can make an idea possible.
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Whether you create or support, every
                                contribution helps build a community where
                                meaningful ideas can grow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyCrowdFunding;
