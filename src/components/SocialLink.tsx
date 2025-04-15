import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function SocialLink({
  href,
  icon,
  name,
  username,
}: {
  href: string;
  icon: React.ReactNode;
  name: string;
  username: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-950 rounded-xl transition-all duration-300"
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm mr-4">
          {icon}
        </div>
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">{name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{username}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transform group-hover:translate-x-1 transition-all duration-300" />
    </Link>
  );
}

export default SocialLink;
