"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="container relative flex min-h-screen items-center justify-center">
        <div className="absolute right-4 top-4">
          <Link
            href="/signup"
            className="rounded-md bg-sky-400 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
          >
            SIGN UP
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md space-y-6 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Log in</h1>
          </div>
          <div className="space-y-4">
            <div>
              <Input placeholder="Email or username" className="border-slate-700 bg-slate-800 text-slate-100" />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-slate-700 bg-slate-800 pr-10 text-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <Link
                href="/forgot-password"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-300"
              >
                FORGOT?
              </Link>
            </div>
            <Button className="w-full bg-sky-400 hover:bg-sky-500">LOG IN</Button>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-400">OR</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800">
                  <svg className="mr-2 h-4 w-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.945 22v-8.834H7V9.485h2.945V6.54c0-3.043 1.926-4.54 4.64-4.54 1.3 0 2.418.097 2.744.14v3.18h-1.883c-1.476 0-1.82.703-1.82 1.732v2.433h3.68l-.736 3.68h-2.944L13.685 22" />
                  </svg>
                  FACEBOOK
                </Button>
                <Button variant="outline" className="border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  GOOGLE
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-center text-sm text-slate-400">
              <p>
                By signing in to Duolingo, you agree to our{" "}
                <Link href="#" className="text-slate-100 hover:text-slate-300">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-slate-100 hover:text-slate-300">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                This site is protected by reCAPTCHA Enterprise and the Google{" "}
                <Link href="#" className="text-slate-100 hover:text-slate-300">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-slate-100 hover:text-slate-300">
                  Terms of Service
                </Link>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

