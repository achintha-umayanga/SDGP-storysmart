"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, Facebook, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function CreateProfile() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="container flex min-h-screen items-center justify-center">
        <div className="absolute right-4 top-4">
          <Link
            href="/login"
            className="rounded-md bg-sky-400 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
          >
            LOGIN
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md space-y-6 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Sign up</h1>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" className="border-slate-700 bg-slate-800 text-slate-100" />
              <p className="text-sm text-slate-400">
                Providing your age ensures you get the right Duolingo experience. For more details, please visit our{" "}
                <Link href="#" className="text-sky-400 hover:text-sky-300">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input id="name" className="border-slate-700 bg-slate-800 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="border-slate-700 bg-slate-800 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="border-slate-700 bg-slate-800 pr-10 text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button className="w-full bg-sky-400 hover:bg-sky-500">CREATE ACCOUNT</Button>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-400">Or Sign in with</span>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-slate-700 bg-white p-0 hover:bg-slate-100"
                >
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-slate-700 bg-white p-0 hover:bg-slate-100"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                  <span className="sr-only">Google</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-slate-700 bg-white p-0 hover:bg-slate-100"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">X</span>
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

