"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { signInWithEmail, signUpWithEmail } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShieldCheck, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [tab, setTab] = React.useState<"signin" | "signup">("signin");
  const [signInState, signInAction, isSigningIn] = useActionState(signInWithEmail, null);
  const [signUpState, signUpAction, isSigningUp] = useActionState(signUpWithEmail, null);

  const activeState = tab === "signin" ? signInState : signUpState;
  const isPending = tab === "signin" ? isSigningIn : isSigningUp;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to overview</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Auth Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="h-10 w-10 rounded-md bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-xl">
              $
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Spend Control Account
            </h1>
            <p className="text-sm text-zinc-400">
              Multi-tenant authentication with Row Level Security.
            </p>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/40">
            <CardHeader className="pb-4">
              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-lg border border-zinc-800 text-sm">
                <button
                  type="button"
                  onClick={() => setTab("signin")}
                  className={`py-2 text-center font-medium rounded-md transition-colors ${
                    tab === "signin"
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  className={`py-2 text-center font-medium rounded-md transition-colors ${
                    tab === "signup"
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Register
                </button>
              </div>
            </CardHeader>

            <CardContent>
              {activeState?.error && (
                <div className="mb-4 p-3 rounded-md bg-red-950/40 border border-red-500/40 flex items-start gap-2 text-xs text-red-200">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{activeState.error}</span>
                </div>
              )}

              {activeState?.success && activeState?.message && (
                <div className="mb-4 p-3 rounded-md bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-2 text-xs text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{activeState.message}</span>
                </div>
              )}

              <form action={tab === "signin" ? signInAction : signUpAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    className="h-11 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={tab === "signin" ? "current-password" : "new-password"}
                    required
                    placeholder="Enter account password"
                    className="h-11 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isPending}>
                  {isPending
                    ? "Authenticating..."
                    : tab === "signin"
                    ? "Sign In to Dashboard"
                    : "Create Account"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-0 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                <span>Encrypted session tokens via Supabase Auth</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
