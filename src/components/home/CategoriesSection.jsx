import Link from "next/link";
import {
    HiOutlineBuildingOffice2,
    HiOutlineCpuChip,
    HiOutlineLightBulb,
    HiOutlinePaintBrush,
    HiOutlineUserGroup,
} from "react-icons/hi2";

const categories = [
    {
        id: 1,
        name: "Technology",
        description: "Innovative products, apps, and technology projects.",
        icon: HiOutlineCpuChip,
        href: "/campaigns?category=technology",
    },
    {
        id: 2,
        name: "Education",
        description: "Projects focused on learning, skills, and education.",
        icon: HiOutlineLightBulb,
        href: "/campaigns?category=education",
    },
    {
        id: 3,
        name: "Creative",
        description: "Support creators working on art, design, and culture.",
        icon: HiOutlinePaintBrush,
        href: "/campaigns?category=creative",
    },
    {
        id: 4,
        name: "Community",
        description: "Ideas and initiatives designed to create positive change.",
        icon: HiOutlineUserGroup,
        href: "/campaigns?category=community",
    },
    {
        id: 5,
        name: "Business",
        description: "Discover promising businesses and entrepreneurial ideas.",
        icon: HiOutlineBuildingOffice2,
        href: "/campaigns?category=business",
    },
];

const CategoriesSection = () => {
    return (
        <section className="bg-white py-20 transition-colors duration-300 dark:bg-slate-900 sm:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                            Find Your Interest
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                            Explore by Category
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                            Discover campaigns across different fields and find
                            ideas that inspire you to get involved.
                        </p>
                    </div>

                    <Link
                        href="/campaigns"
                        className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Explore all campaigns

                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.id}
                                href={category.href}
                                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/30 dark:hover:bg-slate-900 dark:hover:shadow-indigo-950/20"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                                    {category.name}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {category.description}
                                </p>

                                <span className="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                    Explore

                                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
