"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium text-purple-600 dark:text-purple-400">Hello, I'm a</h2>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">Fullstack Developer</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
                Specializing in modern web development with Next.js, React, and AI integration. I build responsive,
                performant, and user-friendly applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Button>
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <img src="/focused-coder.png" alt="Developer Portrait" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#skills"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 animate-bounce"
          >
            <ArrowDown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
