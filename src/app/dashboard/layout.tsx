import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOutUser } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, LayoutDashboard, Layers, CreditCard, Sparkles } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* Dashboard Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-base">
                $
              </div>
              <span className="font-semibold text-zinc-100 text-base tracking-tight">
                Spend Control
              </span>
            </Link>
            <Badge variant="gold" className="hidden sm:inline-flex text-[10px]">
              Multi-Tenant
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
              <span>Tenant:</span>
              <span className="text-zinc-200 font-medium">user_active_session</span>
            </div>
            <ThemeToggle />
            <form action={signOutUser}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-amber-400 gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
