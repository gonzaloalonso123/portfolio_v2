"use client"

import { motion, AnimatePresence } from "framer-motion"

export default function ProjectPopover({ project, position, isVisible }) {
  if (!project || !isVisible) return null
  const screenX = position.x
  const screenY = position.y

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="absolute z-20 pointer-events-none"
          style={{
            left: `calc(50% + ${screenX * 20}px)`,
            top: `calc(50% + ${screenY * -20}px)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 shadow-[0_0_15px_rgba(0,200,255,0.3)] max-w-xs">
            <h3 className="text-lg font-bold text-blue-400 mb-2">{project.name}</h3>
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-2">
              {project.stack.slice(0, 3).map((tech, index) => (
                <span key={index} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                  {tech.name}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
            <div className="text-xs text-blue-300 italic">Click to view details</div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
