"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Globe } from "lucide-react"

interface ProjectLink {
  name: string
  url: string
  image: any
}

interface StackItem {
  name: string
  image: any
}

interface Project {
  name: string
  description: string
  image: any
  stack: StackItem[]
  links: ProjectLink[]
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const [visibleProjects, setVisibleProjects] = useState(6)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 6, projects.length))
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my work, featuring web applications, tools, and client projects.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>

        {visibleProjects < projects.length && (
          <div className="flex justify-center mt-12">
            <Button onClick={loadMore} className="bg-purple-600 hover:bg-purple-700">
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={`/placeholder.svg?height=300&width=600&query=${project.name} project screenshot`}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold">{project.name}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech.name} variant="outline" className="flex items-center gap-1">
                <img
                  src={`/placeholder.svg?height=16&width=16&query=${tech.name} logo`}
                  alt={`${tech.name} logo`}
                  className="w-4 h-4"
                />
                {tech.name}
              </Badge>
            ))}
            {project.stack.length > 4 && <Badge variant="outline">+{project.stack.length - 4}</Badge>}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          {project.links.map((link) => (
            <Button key={link.name} variant="outline" size="sm" asChild className="flex items-center gap-1">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name.toLowerCase().includes("github") ? (
                  <Github className="h-4 w-4" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                {link.name}
              </a>
            </Button>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
