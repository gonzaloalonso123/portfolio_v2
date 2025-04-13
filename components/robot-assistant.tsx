"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Zap, Loader2 } from "lucide-react";

interface ChatMessage {
  text: string;
  isUser: boolean;
}
export default function RobotAssistant() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { text: "Hello! I'm NOVA, your personal assistant while you are here. How can I help you today?", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = { text: userInput, isUser: true };
    setChatHistory((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setChatHistory((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting to my neural network. Please try again later.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
            className="fixed top-4 md:bottom-4 md:top-auto right-4 z-50 w-80 md:w-96 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,200,255,0.3)]"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3 relative">
                  <img
                    src="/robot-assistant.png"
                    alt="NOVA Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <div className="text-xs text-white font-medium">NOVA</div>
                  <div className="text-xs text-gray-200">Gonzalo's AI Assistant</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleMinimize}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="sr-only">Minimize</span>
                  <div className="w-3 h-0.5 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            <div className="bg-gray-900 p-4">
              <div ref={chatContainerRef} className="h-96 overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar">
                {chatHistory.length > 0 && (
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
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 rounded-2xl p-3 rounded-bl-none flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                          <span className="text-gray-300 text-sm">NOVA is thinking...</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-800 text-white rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`absolute right-2 top-2 ${
                    isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                  } text-white p-2 rounded-full transition-colors`}
                  disabled={!userInput.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
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
            className="fixed top-4 md:bottom-4 md:top-auto right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,200,255,0.3)]"
          >
            <img src="/robot-assistant.png" alt="NOVA Assistant" className="w-10 h-10 rounded-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
