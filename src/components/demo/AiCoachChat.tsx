import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askCoach, type CoachPayload } from "../../lib/openai";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Props {
  ivi: number;
  iviState: string;
  metrics: {
    appSwitchesLast10Min: number;
    tabChurnLast10Min: number;
    oscillationsLast10Min: number;
  };
  userProfile: {
    role: string;
    tools: string[];
    deepWorkLengthMinutes: number;
    interruptionSensitivity: string;
  };
  activeMode: string;
}

const SUGGESTIONS = [
  "Why is my IVI so high?",
  "How can I stabilize my focus right now?",
  "Design a Deep Work profile for developers.",
];

export default function AiCoachChat({ ivi, iviState, metrics, userProfile, activeMode }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 I'm your FlowShield Cognitive Coach. Ask me anything about your current workflow state, IVI patterns, or how to optimize your focus!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;
    setError("");

    const userMessage: Message = {
      role: "user",
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const payload: CoachPayload = {
      message: messageText.trim(),
      userProfile,
      ivi,
      state: iviState,
      metrics,
      mode: activeMode,
    };

    const response = await askCoach(payload);

    if (response.error) {
      setError(response.error);
      // Show error as assistant message for better UX
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${response.error}. Please ensure the OpenAI API key is configured correctly on the server.`,
          timestamp: new Date(),
        },
      ]);
    } else if (response.reply) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.reply!,
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl shadow-2xl shadow-violet-500/30 border border-violet-500/30 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-sm font-semibold">AI Coach</span>
        {messages.length > 1 && (
          <span className="w-5 h-5 bg-white/20 rounded-full text-xs flex items-center justify-center font-bold">
            {messages.length}
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            <div className="glass rounded-2xl border border-violet-500/30 shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
              style={{ height: "min(500px, 70vh)" }}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-violet-900/30 to-indigo-900/30 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">FlowShield AI Coach</div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-[10px]">GPT-4 powered · IVI: {ivi}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[8px] font-bold">AI</span>
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-500/80 to-indigo-600/80 text-white rounded-tr-sm"
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
                    }`}>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-[9px] opacity-50 mt-1 text-right">{formatTime(msg.timestamp)}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[8px] font-bold">AI</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-3 py-2">
                      <div className="flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion chips */}
              <div className="px-4 pb-2 flex gap-1.5 flex-wrap flex-shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={isLoading}
                    className="px-2 py-1 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 text-[10px] font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 pt-2 border-t border-white/5 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your focus patterns..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500/50 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-3 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                {error && <p className="text-red-400 text-[9px] mt-1">{error}</p>}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
