"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Lightbulb, Sparkles } from "lucide-react";
import { timelineData } from "@/data/timeline-data";

// Get icon component based on icon name
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "calendar":
      return <Calendar className="h-6 w-6" />;
    case "lightbulb":
      return <Lightbulb className="h-6 w-6" />;
    case "sparkles":
      return <Sparkles className="h-6 w-6" />;
    default:
      return <Calendar className="h-6 w-6" />;
  }
};

export default function SpaceDiary() {
  return (
    <div className="w-full py-16 px-4 overflow-y-auto max-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
        >
          Space Diary
        </motion.h2>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative px-4"
          >
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full md:block hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500"></div>
            </div>

            {/* Mobile Vertical Line */}
            <div className="absolute left-2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full md:hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500"></div>
            </div>

            <div className="space-y-12 relative py-8 mb-16">
              {timelineData.map((entry, index) => (
                <VerticalTimelineEntry
                  key={`${entry.title}-${index}`}
                  entry={entry}
                  index={index}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VerticalTimelineEntry({ entry, index, isEven }: { entry: any; index: number; isEven: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
    >
      <div className="absolute md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 z-10 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
      </div>
      <div className={`md:w-1/2 w-full ${isEven ? "md:pr-12 pl-4 md:pl-0" : "md:pl-12 pl-4 md:pr-0"}`}>
        <div className="relative">
          <div
            className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-sm"
            style={{
              backgroundImage: `linear-gradient(to right, ${entry.color.split(" ")[0]}, ${entry.color.split(" ")[2]})`,
            }}
          ></div>
          <div className={`bg-gradient-to-r ${entry.color} p-0.5 rounded-2xl shadow-lg`}>
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 h-full">
              <div className="flex items-center mb-4 flex-col md:flex-row">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${entry.color} flex items-center justify-center mr-4`}
                >
                  {getIcon(entry.icon)}
                </div>
                <div>
                  <div className="text-sm text-blue-400 font-medium">{entry.date}</div>
                  <h3 className="text-xl font-bold text-white">{entry.title}</h3>
                </div>
              </div>
              <p className="text-gray-300">{entry.description}</p>
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-blue-500/50"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-blue-500/50"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 hidden md:block"></div>
    </motion.div>
  );
}
