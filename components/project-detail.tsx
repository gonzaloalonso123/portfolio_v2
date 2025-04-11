"use client";

import { motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageGallery from "@/components/image-gallery";

export default function ProjectDetail({ project, onClose }) {
  if (!project) return null;

  const galleryImages = project.images || [project.image];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative bg-black/80 border border-blue-500/30 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-[0_0_30px_rgba(0,200,255,0.3)]"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-80"></div>
          <div className="relative p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{project.name}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-xl overflow-hidden object-contain"
            >
              <ImageGallery images={galleryImages} alt={project.name} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Description</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/30">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {project.links.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="bg-blue-900/30 border-blue-500/30 hover:bg-blue-800/50"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {link.name.toLowerCase().includes("github") ? (
                            <Github className="h-4 w-4" />
                          ) : (
                            <ExternalLink className="h-4 w-4" />
                          )}
                          {link.name}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Futuristic decorative elements */}
          <div className="absolute top-1/2 left-0 w-1 h-20 bg-blue-500/50 -translate-y-1/2"></div>
          <div className="absolute top-1/3 right-0 w-1 h-40 bg-cyan-500/50 -translate-y-1/2"></div>
          <div className="absolute bottom-10 left-10 w-20 h-1 bg-blue-500/50"></div>
          <div className="absolute top-20 right-10 w-10 h-1 bg-cyan-500/50"></div>

          {/* Animated corner elements */}
          <motion.div
            className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>
          <motion.div
            className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
          ></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
