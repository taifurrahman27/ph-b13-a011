import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center lg:px-8">
        <span className="mb-4 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-700">
          Crowdfunding platform
        </span>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Bring big ideas to life with a trusted community.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Discover campaigns, support creators, and help the next great product or cause reach its goal.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/campaigns"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Explore Campaigns
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Create an Account
          </Link>
        </div>
      </main>
    </>
  );
}