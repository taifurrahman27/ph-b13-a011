const DashboardPage = () => {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        CrowdFunding
                    </span>

                    <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                        Welcome to your Dashboard
                    </h1>

                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Your account has been created successfully.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
