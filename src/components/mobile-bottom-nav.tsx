"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CalendarClock,
  Receipt,
  Sparkles,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Center",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/accounts",
      label: "Accounts",
      icon: Building2,
      active: pathname === "/dashboard/accounts",
    },
    {
      href: "/dashboard/transactions",
      label: "Expenses",
      icon: Receipt,
      active: pathname === "/dashboard/transactions",
    },
    {
      href: "/dashboard/commitments",
      label: "Debts",
      icon: CalendarClock,
      active: pathname === "/dashboard/commitments",
    },
    {
      href: "/dashboard/advisor",
      label: "Advisor",
      icon: Sparkles,
      active: pathname === "/dashboard/advisor",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-zinc-800/90 bg-zinc-950/95 backdrop-blur px-2 py-1.5 safe-area-bottom"
    >
      <div className="grid grid-cols-5 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-md transition-colors ${
                item.active
                  ? "text-amber-400 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
