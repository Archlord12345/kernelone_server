import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ServerAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Salutations aventurier ! Je suis le Gardien du serveur. Comment puis-je t'aider ?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Prepare history for the API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMsg.text, history);
      
      const botMsg: ChatMessage = { 
        role: 'model', 
        text: responseText || "Je n'ai pas compris...", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-gray-900 border border-emerald-500/30 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md bg-opacity-95 flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-200">
          {/* Header */}
          <div className="bg-emerald-900/40 p-3 border-b border-emerald-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span className="font-pixel text-lg text-emerald-100">Gardien du Serveur</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-lg rounded-tl-none border border-gray-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-gray-900 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question..."
                className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500 transition"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-4 py-3 rounded-full font-semibold shadow-lg transition-all transform hover:scale-105 ${
          isOpen ? 'bg-red-500/80 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-500'
        } text-white backdrop-blur-sm`}
      >
        {isOpen ? (
          <>
            <X className="w-6 h-6" />
            <span className="font-pixel text-lg">Fermer</span>
          </>
        ) : (
          <>
            <div className="relative">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-600"></div>
            </div>
            <span className="font-pixel text-lg tracking-wide">Aide & IA</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ServerAssistant;