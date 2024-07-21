"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { login } from "@/lib/api/auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("mahatiToken");
    if (token) {
      router.push("/admin/dashboard")
    }
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response?.status === 200) {
        const token = response?.data?.access_token;
        router.push("/admin/dashboard");
        Cookies.set("mahatiToken", token, { path: "/" });
      } else {
        setError(response?.message);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center max-[766px]:grid sm:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900"></div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
          </svg>
          Mahati Admin
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to admin account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to continue
            </p>
          </div>
          <div className="grid gap-6">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="admin@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 mt-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    type="password"
                    placeholder="********"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="inline-flex mt-4 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                  disabled={!email || !password}
                  type="submit"
                >
                  Sign In with Email
                </button>
              </div>
            </form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div >
    </div >
  );
}