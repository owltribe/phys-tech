"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "rounded-md overflow-hidden flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-3 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-400/20 hover:bg-sky-500/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-3.5">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700 animate-spin-once"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border border-sky-600 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}