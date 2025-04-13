"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/loading-screen";
import RobotAssistant from "@/components/robot-assistant";
import CosmicBackground from "@/components/cosmic-background";
import ProjectDetail from "@/components/project-detail";
import ProjectPopover from "@/components/project-popover";
import SpaceDiary from "@/components/space-diary";
import BlogsPage from "@/components/blogs-page";
import { projects } from "@/data/projects";
import { languages, frontend, backend, tools } from "@/data/skills";
import { SkillsGalaxy } from "@/components/skills";
import ContactPortal from "@/components/contact";
import Image from "next/image";

const CosmicNavigation = dynamic(() => import("@/components/cosmic-navigation"), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Loading navigation...</div>,
});

const PlanetarySystem = dynamic(() => import("@/components/planetary-system"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showRobot, setShowRobot] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowRobot(true);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleProjectSelect = (project, position) => {
    setSelectedProject(project);
    setHoveredProject(null);
  };

  const handleProjectHover = (project, position) => {
    setHoveredProject(project);
    setHoveredPosition(position);
  };

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <CosmicBackground />
      <div className="relative z-10 h-full">
        {showRobot && <RobotAssistant />}
        <CosmicNavigation
          currentSection={currentSection}
          onNavigate={(section) => {
            setCurrentSection(section);
          }}
        />
        <AnimatePresence>
          {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>

        <div className="h-full overflow-y-auto">
          {currentSection === "home" && (
            <div className="h-screen flex items-center justify-center p-8">
              <div className="max-w-4xl text-center flex flex-col items-center">
                <Image src="/gonzalo.webp" alt="Gonzalo Alonso" width={200} height={200} className="rounded-xl mb-6" />
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Gonzalo Alonso
                </h1>
                <p className="text-xl md:text-2xl text-blue-200 mb-8">
                  Exploring the universe of code, one project at a time
                </p>
              </div>
            </div>
          )}

          {currentSection === "diary" && <SpaceDiary />}

          {currentSection === "blogs" && <BlogsPage />}

          {currentSection === "projects" && (
            <div className="h-full w-full relative">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
                <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full text-blue-400 font-bold">
                  Project Cosmos
                </div>
              </div>
              <ProjectPopover
                project={hoveredProject}
                position={hoveredPosition}
                isVisible={hoveredProject !== null && !selectedProject}
              />
              <Suspense
                fallback={
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-blue-400 text-xl">Loading cosmic visualization...</div>
                  </div>
                }
              >
                <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
                  <PlanetarySystem
                    projects={projects}
                    onProjectSelect={handleProjectSelect}
                    onProjectHover={handleProjectHover}
                  />
                  <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
              </Suspense>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-blue-200 text-sm">
                  Hover over planets to see details • Click to explore
                </div>
              </div>

              <div className="absolute top-4 right-4 z-10 max-w-xs w-full">
                <div className="bg-black/80 backdrop-blur-md rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,200,255,0.3)] border border-blue-500/30">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-blue-400 mb-4">Projects</h3>
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className="bg-blue-900/20 hover:bg-blue-900/30 rounded-lg p-3 transition-colors cursor-pointer"
                          onClick={() => handleProjectSelect(project, { x: 0, y: 0, z: 0 })}
                        >
                          <h4 className="font-medium text-white">{project.name}</h4>
                          <p className="text-xs text-gray-300 mt-1 line-clamp-2">{project.description}</p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.stack.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full"
                              >
                                {tech.name}
                              </span>
                            ))}
                            {project.stack.length > 3 && (
                              <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                                +{project.stack.length - 3}
                              </span>
                            )}
                          </div>

                          {project.links.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {project.links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-full transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {link.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentSection === "skills" && (
            <div className="min-h-screen py-20 px-4 md:max-w-3xl xl:max-w-5xl mx-auto">
              <SkillsGalaxy languages={languages} frontend={frontend} backend={backend} tools={tools} />
            </div>
          )}
          {currentSection === "contact" && (
            <div className="h-screen flex items-center justify-center">
              <ContactPortal />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
