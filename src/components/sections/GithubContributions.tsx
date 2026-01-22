import React from "react";

export default function GithubContributions() {
  return (
    <section className="md:py-12 px-4 ">
      <div className="container mx-auto bg-white dark:bg-[#0f172b] border border-zinc-200 dark:border-zinc-800 rounded-xl md:p-6 py-3 shadow-sm">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="md:text-2xl text-lg font-bold text-zinc-900 dark:text-white">Open Source Contributions</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              My recent activity and coding habits on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/Nahid-Mahmud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity"
          >
            View Profile
          </a>
        </div>

        {/* Chart Container */}
        <div className="flex items-center justify-center   rounded-lg ">
          <img
            className="w-full filter dark:invert-[0.05] transition-transform duration-300"
            src="https://ghchart.rshah.org/Nahid-Mahmud"
            alt="Nahid-Mahmud's GitHub Contributions Chart"
          />
        </div>

        {/* Legend/Footer */}
        <div className="mt-4 flex justify-end">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Powered by GitHub Chart API
          </p>
        </div>
      </div>
    </section>
  );
}
