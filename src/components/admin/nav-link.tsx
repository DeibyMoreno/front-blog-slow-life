"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AdminNavItem } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

export function NavLink({ item }: { item: AdminNavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm transition-colors lg:whitespace-normal",
        isActive
          ? "bg-forest/10 font-medium text-forest"
          : "text-stone hover:bg-sand hover:text-ink"
      )}
    >
      {item.label}
    </Link>
  );
}