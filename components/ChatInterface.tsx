
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Trash2, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const STORAGE_KEY = 'museum_ai_chat_history';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved chat history", e);
      }
    }
    return [
      { role: 'bot', content: 'مرحباً بك في الدليل الذكي للمتاحف! كيف يمكنني مساعدتك اليوم في بناء وكيلك الخاص؟' }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const startTime = Date.now();

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user' as any,
        parts: [{ text: msg.content }]
      }));

      // Call Gemini API via the service
      const botResponse = await getGeminiResponse(userMessage, history);
      
      // Calculate how long the API took
      const elapsedTime = Date.now() - startTime;
      // Perceived performance: ensure 'Thinking...' is visible for at least 1500ms
      const minWait = 1500; 
      if (elapsedTime < minWait) {
        await new Promise(resolve => setTimeout(resolve, minWait - elapsedTime));
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "عذراً، حدث خطأ تقني. يرجى التأكد من إعداد المفتاح البرمجي." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في مسح سجل المحادثة؟")) {
      const defaultMsg: Message[] = [
        { role: 'bot', content: 'مرحباً بك في الدليل الذكي للمتاحف! كيف يمكنني مساعدتك اليوم في بناء وكيلك الخاص؟' }
      ];
      setMessages(defaultMsg);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#112240] rounded-2xl border border-[#233554] shadow-2xl overflow-hidden relative">
      {/* Animated Progress Bar at the top of chat area */}
      {isLoading && (
        <div className="absolute top-[60px] left-0 w-full h-0.5 bg-[#667eea10] z-20">
          <div className="h-full bg-gradient-to-r from-transparent via-[#667eea] to-transparent animate-[progress_1.5s_infinite_linear]" 
               style={{ width: '40%' }}></div>
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
      `}</style>

      <div className="bg-[#1e3a5f] p-4 flex items-center justify-between border-b border-[#233554] z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#667eea] p-2 rounded-lg shadow-lg shadow-[#667eea30]">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base leading-none">خبير الذكاء الاصطناعي للمتاحف</h3>
            <p className="text-[10px] text-gray-400 mt-1">متصل الآن عبر Gemini AI</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={clearHistory}
            className="text-gray-400 hover:text-red-400 transition-colors p-1"
            title="مسح السجل"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#0d1b32]"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'} items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`p-2 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-[#667eea]' : 'bg-[#1e3a5f] shadow-inner'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#667eea] text-white rounded-tr-none' 
                : 'bg-[#1e3a5f] text-gray-200 rounded-tl-none border border-[#233554]'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 animate-in fade-in duration-300">
            <div className="bg-[#1e3a5f] p-2 rounded-full shrink-0">
              <Sparkles className="w-4 h-4 text-[#667eea] animate-pulse" />
            </div>
            <div className="bg-[#1e3a5f] p-4 rounded-2xl rounded-tl-none flex items-center gap-4 border border-[#667eea40] shadow-lg shadow-[#667eea10]">
              <div className="relative">
                <Loader2 className="w-5 h-5 animate-spin text-[#667eea]" />
                <div className="absolute inset-0 bg-[#667eea] blur-md opacity-20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-200 font-bold tracking-wide">جاري التفكير...</span>
                <span className="text-[9px] text-gray-500 italic uppercase font-mono tracking-widest">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#0a192f] border-t border-[#233554]">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل عن RAG، Edge AI، أو التنفيذ..."
            className="w-full bg-[#112240] border border-[#233554] rounded-full py-3.5 px-6 pr-14 focus:outline-none focus:border-[#667eea] focus:ring-1 focus:ring-[#667eea50] transition-all text-sm placeholder:text-gray-600 text-[#e6f1ff]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#667eea] hover:bg-[#5a6fd6] text-white p-2.5 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-[#667eea] shadow-lg shadow-[#667eea20] active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
