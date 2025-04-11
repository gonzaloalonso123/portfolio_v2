"use client"

import { useEffect, useRef, useState } from "react"

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    const stars: { x: number; y: number; radius: number; color: string; velocity: number }[] = []

    // Create stars
    const createStars = () => {
      stars.length = 0
      const starCount = Math.floor((canvas.width * canvas.height) / 2000)

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.5
        const hue = Math.random() * 60 + 200 // Blue to cyan hues
        const color = `hsl(${hue}, 100%, 70%)`
        const velocity = Math.random() * 0.05 + 0.01

        stars.push({ x, y, radius, color, velocity })
      }
    }

    createStars()
    window.addEventListener("resize", createStars)

    // Nebula properties
    const nebulae: { x: number; y: number; radius: number; color: string }[] = []

    // Create nebulae
    const createNebulae = () => {
      nebulae.length = 0
      const nebulaCount = 5

      for (let i = 0; i < nebulaCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 300 + 200
        const hue = Math.random() * 60 + 200 // Blue to cyan hues
        const color = `hsla(${hue}, 100%, 50%, 0.05)`

        nebulae.push({ x, y, radius, color })
      }
    }

    createNebulae()
    window.addEventListener("resize", createNebulae)

    // Animation
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw and update stars
      stars.forEach((star) => {
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // Move stars
        star.y += star.velocity

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", createStars)
      window.removeEventListener("resize", createNebulae)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-black" style={{ zIndex: 0 }} />
}
