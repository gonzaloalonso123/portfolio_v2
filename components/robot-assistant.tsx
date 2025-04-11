"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Zap } from "lucide-react";

interface RobotAssistantProps {
  dialogue: string;
  onClose: () => void;
  onReopen: () => void;
}

export default function RobotAssistant({ dialogue, onClose, onReopen }: RobotAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [chatHistory, setChatHistory] = useState<{ text: string; isUser: boolean }[]>([]);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Typing effect for robot dialogue
  useEffect(() => {
    if (!isMounted || isMinimized) return;

    setIsTyping(true);
    setDisplayedText("");

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < dialogue.length) {
        setDisplayedText((prev) => prev + dialogue.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [dialogue, isMinimized, isMounted]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, displayedText]);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    setChatHistory((prev) => [...prev, { text: userInput, isUser: true }]);

    // Simulate robot response
    setTimeout(() => {
      let response = "";

      if (userInput.toLowerCase().includes("project") || userInput.toLowerCase().includes("work")) {
        response =
          "I've worked on various projects including web applications, AI tools, and data visualization platforms. You can explore them in the Projects section!";
      } else if (userInput.toLowerCase().includes("skill") || userInput.toLowerCase().includes("tech")) {
        response =
          "I specialize in Next.js, React, and AI integration. I'm also proficient with Node.js, Firebase, and various frontend technologies.";
      } else if (userInput.toLowerCase().includes("contact") || userInput.toLowerCase().includes("hire")) {
        response =
          "You can reach me through the Contact section. I'm always open to interesting projects and collaborations!";
      } else if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
        response = "Hello there! I'm NOVA, your guide to this cosmic portfolio. How can I assist you today?";
      } else {
        response =
          "That's an interesting question! Feel free to explore the different sections of my portfolio to learn more about my work and skills.";
      }

      setChatHistory((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);

    setUserInput("");
  };

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-4 right-4 z-50 w-80 md:w-96 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,200,255,0.3)]"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white">Gonzalo's Assistant</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleMinimize}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="sr-only">Minimize</span>
                  <div className="w-3 h-0.5 bg-white rounded-full"></div>
                </button>
                <button
                  onClick={onClose}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>

            <div className="bg-gray-900 p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-3 relative">
                  <img
                    src="/robot-assistant.png"
                    alt="NOVA Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <div className="text-xs text-blue-400 font-medium">NOVA</div>
                  <div className="text-xs text-gray-400">AI Assistant</div>
                </div>
              </div>

              <div ref={chatContainerRef} className="h-64 overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar">
                {chatHistory.length > 0 ? (
                  <>
                    {chatHistory.map((message, index) => (
                      <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.isUser
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-800 text-gray-200 rounded-bl-none"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="bg-gray-800 rounded-2xl p-4 rounded-bl-none">
                    <p className="text-gray-200">
                      {displayedText}
                      {isTyping && (
                        <span className="inline-flex ml-1">
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse animation-delay-200">.</span>
                          <span className="animate-pulse animation-delay-400">.</span>
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-800 text-white rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  disabled={!userInput.trim()}
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleMaximize}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,200,255,0.3)]"
          >
            <img src="/robot-assistant.png" alt="NOVA Assistant" className="w-10 h-10 rounded-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
