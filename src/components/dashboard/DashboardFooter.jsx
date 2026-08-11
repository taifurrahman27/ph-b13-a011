const DashboardFooter = () => {
    return (<footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"> <div className="flex flex-col items-center justify-between gap-3 px-5 py-5 text-sm sm:flex-row sm:px-6 lg:px-8"> <p className="text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} CrowdFunding. All rights reserved. </p>

        <div className="flex items-center gap-4">
            <a
                href="#"
                className="font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
                Privacy
            </a>

            <a
                href="#"
                className="font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
                Terms
            </a>

            <a
                href="#"
                className="font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
                Support
            </a>
        </div>
    </div>
    </footer>
    );

};

export default DashboardFooter;
