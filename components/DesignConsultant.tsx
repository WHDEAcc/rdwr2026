import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../hooks/useDirection';

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

interface DesignConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const DesignConsultant: React.FC<DesignConsultantProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: t('ai.welcome', "Hello. I am the EDGE Landscape Architecture design consultant. How can I assist with your landscape architecture needs today?")
      }
    ]);
  }, [i18n.language, t]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!genAI) {
        throw new Error("Gemini API key not configured");
      }

      const chat = genAI.chats.create({
        model: "gemini-1.5-flash",
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        config: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage({ message: input });
      const text = result.text;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t('ai.error', "I apologize, but I'm currently unable to connect to my design knowledge base. Please try again later.")
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150]"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed ${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 w-full md:w-[450px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-[160] flex flex-col border-s border-black/5 dark:border-white/5`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a]">
              <div>
                <h3 className="text-lg font-serif font-light text-black dark:text-white">{t('ai.title', 'Design Consultant')}</h3>
                <p className="text-xs text-muted dark:text-white/50 flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {t('ai.status', 'AI Assistant Online')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-sm uppercase tracking-widest text-muted dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
              >
                {t('ai.close', 'Close')}
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface dark:bg-white/5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-white dark:bg-[#0a0a0a] text-black dark:text-white border border-black/5 dark:border-white/5'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-4 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('ai.placeholder', 'Ask about sustainable materials...')}
                  className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 pe-12 text-sm focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors placeholder:text-muted dark:placeholder:text-white/30 text-black dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute end-0 top-1/2 -translate-y-1/2 text-black dark:text-white disabled:opacity-30 hover:opacity-70 transition-opacity"
                  aria-label={t('ai.send', 'Send message')}
                >
                  →
                </button>
              </div>
              <p className="text-[10px] text-muted dark:text-white/30 mt-4 text-center">
                {t('ai.disclaimer', 'AI can make mistakes. Please verify important information.')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
