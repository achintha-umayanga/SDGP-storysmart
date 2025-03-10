"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Facebook, Twitter } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-slate-100">
      <motion.div
        className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-green-500 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-yellow-500 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <div className="container flex min-h-screen items-center justify-center">
        <motion.div
          className="absolute right-4 top-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/login"
            className="rounded-md bg-sky-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
          >
            LOGIN
          </Link>
        </motion.div>
        <motion.div
          className="w-full max-w-md space-y-8 rounded-lg bg-slate-800 p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            >
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={90}
                height={90}
                className="object-cover"
              />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Create Your Account
            </motion.h1>
            <motion.p
              className="mt-2 text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Join us and start your learning adventure
            </motion.p>
          </div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" className="border-slate-600 bg-slate-700 text-slate-100" />
              <p className="text-xs text-slate-400">
                Providing your age ensures you get the right experience. For more details, please visit our{" "}
                <Link href="#" className="text-sky-400 hover:text-sky-300">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input id="name" className="border-slate-600 bg-slate-700 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="border-slate-600 bg-slate-700 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="border-slate-600 bg-slate-700 pr-10 text-slate-100"
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
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">Or sign up with</span>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-slate-600 bg-transparent p-0 text-slate-100 hover:bg-slate-700"
              >
                <Facebook className="h-5 w-5 text-[#1877F2]" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-slate-600 bg-transparent p-0 text-slate-100 hover:bg-slate-700"
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
                className="h-10 w-10 rounded-full border-slate-600 bg-transparent p-0 text-slate-100 hover:bg-slate-700"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="text-center text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>
              By signing up, you agree to our{" "}
              <Link href="#" className="text-sky-400 hover:text-sky-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-sky-400 hover:text-sky-300">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

