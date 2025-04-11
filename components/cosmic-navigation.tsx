"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, Rocket, Cpu, Send, BookOpen, FileText } from "lucide-react"

interface CosmicNavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

export default function CosmicNavigation({ currentSection, onNavigate }: CosmicNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / scrollHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Command Center", icon: <Home className="w-5 h-5" /> },
    { id: "diary", label: "Space Diary", icon: <BookOpen className="w-5 h-5" /> },
    { id: "projects", label: "Project Cosmos", icon: <Rocket className="w-5 h-5" /> },
    { id: "skills", label: "Tech Arsenal", icon: <Cpu className="w-5 h-5" /> },
    { id: "blogs", label: "Cosmic Insights", icon: <FileText className="w-5 h-5" /> },
    { id: "contact", label: "Transmission", icon: <Send className="w-5 h-5" /> },
  ]

  if (!isMounted) return null

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gray-700 rounded-full">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
                top: 0,
                position: "absolute",
              }}
            />
          </div>

          <div className="space-y-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <motion.button
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center group ${
                    currentSection === item.id ? "text-blue-400" : "text-gray-400"
                  }`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                      currentSection === item.id
                        ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(0,200,255,0.5)]"
                        : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      currentSection === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800"
        >
          <div className="flex justify-around overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`py-4 px-2 flex flex-col items-center min-w-[70px] ${
                  currentSection === item.id ? "text-blue-400" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    currentSection === item.id ? "bg-blue-500/20 text-blue-400" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-medium truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
