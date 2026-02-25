import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onCommand: (command: string, action: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWindow = Window & { SpeechRecognition?: any; webkitSpeechRecognition?: any };

export default function VoiceControlButton({ onCommand }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [toast, setToast] = useState<{ command: string; action: string } | null>(null);
  const [supported, setSupported] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const w = window as AnyWindow;
    const SpeechRecognitionClass = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const text = Array.from(event.results as ArrayLike<{ [index: number]: { transcript: string }; isFinal: boolean }>)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join("")
        .toLowerCase();
      setTranscript(text);

      if (event.results[event.results.length - 1].isFinal) {
        handleCommand(text);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript("");
    };

    recognitionRef.current = recognition;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommand = (text: string) => {
    let action = "";

    if (text.includes("deep work") || text.includes("focus")) {
      const mins = text.includes("90") ? 90 : text.includes("45") ? 45 : 25;
      action = `Deep Work ${mins}m mode started. MX remapped to Focus Lock.`;
    } else if (text.includes("stop") || text.includes("exit") || text.includes("cancel")) {
      action = "Focus mode stopped. Returning to default mode.";
    } else if (text.includes("mute") || text.includes("do not disturb") || text.includes("dnd")) {
      action = "Do Not Disturb enabled. Notifications snoozed.";
    } else if (text.includes("collaboration") || text.includes("meeting")) {
      action = "Collaboration mode activated. MX optimized for team work.";
    } else if (text.includes("break") || text.includes("rest")) {
      action = "10-minute reset break scheduled. Scroll resistance increased.";
    } else {
      action = `Tip: Try "start deep work", "stop", "mute notifications", or "collaboration mode".`;
    }

    onCommand(text, action);
    setToast({ command: text, action });
    setTimeout(() => setToast(null), 4000);
    setTranscript("");
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setTranscript("");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript("");
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    }
  };

  if (!supported) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-500 text-xs">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        Voice not supported in this browser
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-0 mb-2 w-72 glass rounded-xl p-3 border border-cyan-500/20 shadow-xl z-50"
          >
            <p className="text-cyan-400 text-xs font-semibold mb-1">
              🎙 &quot;{toast.command}&quot;
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">{toast.action}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleListening}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
          isListening
            ? "bg-red-500/20 border-red-500/40 text-red-400 shadow-lg shadow-red-500/20"
            : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
        }`}
      >
        <div className="relative">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-400 opacity-20"
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        {isListening ? (
          <div className="flex items-center gap-0.5">
            {[1, 0.6, 0.9, 0.4, 0.8, 0.5, 1].map((h, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-red-400 rounded-full"
                animate={{ scaleY: [h * 0.5, h * 1.5, h * 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.07 }}
                style={{ height: "12px", transformOrigin: "center" }}
              />
            ))}
          </div>
        ) : (
          <span>Talk to FlowShield</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && transcript && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 mt-1 px-2 py-1 bg-black/70 rounded-lg text-[10px] text-slate-300 whitespace-nowrap max-w-[200px] truncate z-10"
          >
            &quot;{transcript}&quot;
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
