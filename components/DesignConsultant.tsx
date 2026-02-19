
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface DesignConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignConsultant: React.FC<DesignConsultantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to Verdant Vision. I am your AI Design Consultant. How can I help you envision your perfect landscape today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'You are an expert Landscape Architect and Garden Designer for Verdant Vision Studio. Be elegant, poetic, and professional. Provide concise but inspiring advice on landscape design, plant pairings, and architectural harmony. Refer to yourself as the Verdant Vision Assistant.',
          temperature: 0.7,
        }
      });

      const aiText = response.text || 'I apologize, but I am unable to process that vision at the moment. Please try again.';
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Our botanical circuits are slightly tangled. Please refresh or try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="AI Design Consultant" className="fixed inset-0 z-[100] bg-earth/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-warmBeige w-full max-w-2xl h-[600px] shadow-2xl flex flex-col rounded-sm overflow-hidden border border-earth/10">
        <div className="bg-earth p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center animate-pulse" aria-hidden="true">🌱</div>
            <div>
              <h3 className="text-warmBeige font-serif text-xl italic">Design Consultant</h3>
              <p className="text-[10px] text-warmBeige/40 uppercase tracking-widest">Gemini Powered Visionary</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close dialog" className="text-warmBeige/60 hover:text-warmBeige text-3xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">&times;</button>
        </div>

        <div ref={scrollRef} aria-live="polite" className="flex-grow p-8 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-sm text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-earth text-warmBeige'
                  : 'bg-white border border-earth/5 text-earth italic'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-earth/5 p-4 rounded-sm" aria-label="Loading response">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-earth/5 bg-white">
          <div className="flex gap-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your garden dream..."
              aria-label="Type your message"
              className="flex-grow bg-warmBeige/50 border-b border-earth/10 py-3 px-4 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage text-earth"
            />
            <button
              onClick={handleSend}
              className="bg-earth text-warmBeige px-6 py-2 uppercase text-xs font-bold tracking-widest hover:bg-sage transition-all disabled:opacity-50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              disabled={isLoading}
            >
              Consult
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
