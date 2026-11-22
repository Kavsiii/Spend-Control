"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters in length."),
});

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function signInWithEmail(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = authSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid credentials format.",
    };
  }

  const { email, password } = validation.data;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Development fallback for unconfigured Supabase credentials
  if (!supabaseUrl || supabaseUrl.includes("placeholder") || supabaseUrl.includes("your-project")) {
    return {
      success: false,
      error: "Supabase credentials not configured in .env.local. Add live keys to authenticate.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/dashboard");
}

export async function signUpWithEmail(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = authSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input format.",
    };
  }

  const { email, password } = validation.data;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl || supabaseUrl.includes("placeholder") || supabaseUrl.includes("your-project")) {
    return {
      success: false,
      error: "Supabase credentials not configured in .env.local. Add live keys to register.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Registration successful. Please verify your email to log in.",
  };
}

export async function signOutUser(): Promise<void> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder") && !supabaseUrl.includes("your-project")) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}
