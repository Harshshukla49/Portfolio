import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBrain,
  FaXmark,
  FaPaperPlane,
  FaWandMagicSparkles,
  FaRotateLeft,
  FaRobot,
  FaUser,
  FaArrowUpRightFromSquare,
  FaShieldHalved,
} from 'react-icons/fa6';
import { askHarshAI, AIMessage } from '../services/aiService';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am Harsh's AI Portfolio Assistant. I can answer any questions about Harsh's AI/ML projects, technical skills, education at UIT, certifications from IIIT Allahabad, or contact details based strictly on verified portfolio records. How can I help you?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'Tell me about his healthcare project.',
        'How can I contact Harsh?',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What projects has Harsh built?',
    'What are his AI & ML skills?',
    'Tell me about his healthcare project.',
    'What is Harsh’s educational background?',
    'How can I contact or hire Harsh?',
  ];

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await askHarshAI(textToSend);

      const assistantMessage: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action,
        suggestedQuestions: response.suggestedQuestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          sender: 'assistant',
          text: "An error occurred while querying the portfolio knowledge base. Please feel free to reach Harsh directly at shuklaharsh0207@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Chat cleared! Ask me anything about Harsh's AI projects, skills, or background.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'What projects has Harsh built?',
          'What are his core AI skills?',
          'Tell me about his healthcare project.',
          'How can I contact Harsh?',
        ],
      },
    ]);
  };

  return (
    <>
      {/* Conversational AI Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative flex h-[650px] max-h-[92vh] w-full max-w-2xl flex-col rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#0e0e18] via-[#090910] to-[#040407] shadow-[0_25px_90px_rgba(168,85,247,0.3)] backdrop-blur-2xl text-left overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black">
                      <FaBrain className="text-cyan-300 text-lg animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">HARSH AI</h3>
                      <span className="flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-mono text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        ONLINE
                      </span>
                    </div>
                    <p className="text-[0.65rem] font-mono text-slate-400">Portfolio Intelligence • 100% Fact-Checked</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white transition-all"
                    title="Reset Conversation"
                  >
                    <FaRotateLeft className="text-xs" />
                  </button>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white transition-all"
                    aria-label="Close AI Chat"
                  >
                    <FaXmark className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-cyan-300 mt-1">
                          <FaRobot className="text-xs" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isUser
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                            : 'border border-white/10 bg-white/[0.04] text-slate-200 rounded-tl-none backdrop-blur-md'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Interactive Direct Action Button */}
                        {msg.action && (
                          <div className="mt-3 pt-2.5 border-t border-white/10">
                            <a
                              href={msg.action.link}
                              onClick={onClose}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 px-3 py-1.5 text-xs font-mono font-bold text-cyan-200 hover:bg-cyan-500/30 transition-all"
                            >
                              <span>{msg.action.label}</span>
                              <FaArrowUpRightFromSquare className="text-[0.65rem]" />
                            </a>
                          </div>
                        )}

                        {/* Suggested Follow-up Prompts */}
                        {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                            {msg.suggestedQuestions.map((q) => (
                              <button
                                key={q}
                                onClick={() => handleSend(q)}
                                className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 py-1 text-[0.65rem] font-mono text-purple-200 hover:border-purple-400 hover:bg-purple-500/20 transition-all"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        )}

                        <span className="block mt-2 text-[0.6rem] text-slate-500 font-mono text-right">
                          {msg.timestamp}
                        </span>
                      </div>

                      {isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 mt-1">
                          <FaUser className="text-xs" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3 justify-start items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-cyan-300">
                      <FaRobot className="text-xs animate-spin" />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-mono text-slate-400 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Neural Engine Reasoning...</span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Sample Quick Prompt Bar */}
              <div className="border-t border-white/10 px-4 py-2 bg-black/40 overflow-x-auto flex gap-2 no-scrollbar">
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[0.65rem] font-mono text-slate-300 hover:border-cyan-400/40 hover:text-white transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 border-t border-white/10 p-3 sm:p-4 bg-black/70"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask anything about Harsh's AI projects, skills, education..."
                  className="flex-1 rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:outline-none transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isLoading}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all"
                  aria-label="Send Message"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
