"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Sparkles, BookOpen, Pen, Stars } from "lucide-react"
import { motion } from "framer-motion"

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function GetStarted() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2a4b6d] via-[#1e3a5f] to-[#132744] relative overflow-hidden">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full px-4 py-4 flex items-center justify-between bg-transparent"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-19%20at%2012.12.16_0621b292.jpg-DQAcfaeKRNtIRlljMb1RsQAnxsGLbh.jpeg"
            alt="StorySmart Logo"
            width={50}
            height={50}
            className="w-12 h-12 object-contain mix-blend-screen"
          />
        </Link>

        <Select defaultValue="english">
          <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Español</SelectItem>
            <SelectItem value="french">Français</SelectItem>
            <SelectItem value="german">Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </motion.header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl transform scale-150"></div>
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="max-w-[800px] mx-auto grid gap-8 relative z-10"
        >
          <motion.div variants={floatingAnimation} className="relative w-full h-[300px] mx-auto">
            <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl transform -translate-y-1/2"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-19%20at%2012.12.16_0621b292.jpg-DQAcfaeKRNtIRlljMb1RsQAnxsGLbh.jpeg"
              alt="StorySmart Logo"
              width={300}
              height={300}
              className="mx-auto object-contain relative z-10 mix-blend-screen opacity-90"
              priority
            />
          </motion.div>

          <div className="space-y-6">
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Begin Your Creative Writing Journey Today!
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col gap-4 items-center">
              <Link href="/signup" className="w-full max-w-[300px]">
                <Button
                  size="lg"
                  className="w-full max-w-[300px] text-lg py-6 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 transition-all duration-300 group border-0"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  GET STARTED
                </Button>
              </Link>

              <Link href="/login" className="w-full max-w-[300px]">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full max-w-[300px] text-lg text-white/90 hover:bg-white/10 hover:text-white"
                >
                  I ALREADY HAVE AN ACCOUNT
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 right-20 text-orange-300/20"
        >
          <Stars className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-20 left-20 text-blue-300/20"
        >
          <BookOpen className="w-16 h-16" />
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-8 overflow-hidden bg-transparent"
      >
        <motion.div
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex items-center justify-center gap-8 px-4 overflow-auto no-scrollbar"
        >
          {[
            "Creative Writing",
            "Story Structure",
            "Character Development",
            "World Building",
            "Dialogue",
            "Plot Development",
          ].map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-white/70 hover:text-orange-300 transition-colors"
            >
              <Pen className="w-4 h-4" />
              {topic}
            </motion.div>
          ))}
        </motion.div>
      </motion.footer>
    </div>
  )
}

