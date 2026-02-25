import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FocusMode = "none" | "deep25" | "deep45" | "deep90" | "collaboration" | "reactive";

interface Props {
  ivi: number;
  iviState: string;
  onModeChange: (mode: string) => void;
}

const MODES: { id: FocusMode; label: string; duration?: number; icon: string; color: string; borderColor: string; description: string }[] = [
  {
    id: "deep25", label: "Deep Work 25m", duration: 25 * 60, icon: "🎯",
    color: "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400",
    borderColor: "border-cyan-500/40",
    description: "Pomodoro-style focus block. Min interruptions."
  },
  {
    id: "deep45", label: "Deep Work 45m", duration: 45 * 60, icon: "🔥",
    color: "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400",
    borderColor: "border-indigo-500/40",
    description: "Extended flow state. Full cognitive commitment."
  },
  {
    id: "deep90", label: "Deep Work 90m", duration: 90 * 60, icon: "⚡",
    color: "bg-violet-500/20 hover:bg-violet-500/30 text-violet-400",
    borderColor: "border-violet-500/40",
    description: "Ultradian rhythm block. Maximum depth."
  },
  {
    id: "collaboration", label: "Collaboration", icon: "🤝",
    color: "bg-green-500/20 hover:bg-green-500/30 text-green-400",
    borderColor: "border-green-500/40",
    description: "Optimized for meetings and team work."
  },
  {
    id: "reactive", label: "Reactive", icon: "📬",
    color: "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400",
    borderColor: "border-orange-500/40",
    description: "Inbox processing, reviews, admin tasks."
  },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusModesPanel({ ivi, iviState, onModeChange }: Props) {
  const [activeMode, setActiveMode] = useState<FocusMode>("none");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);
  const timerRef = useRef<number | null>(null);
  const prevIVI = useRef(ivi);

  useEffect(() => {
    // Detect IVI spike during deep work
    if (activeMode.startsWith("deep") && ivi > 65 && prevIVI.current <= 65) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 6000);
    }
    prevIVI.current = ivi;
  }, [ivi, activeMode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startMode = (mode: typeof MODES[0]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveMode(mode.id);
    setShowAlert(false);
    const modeLabel =
      mode.id === "deep25" ? "Deep Work 25m" :
      mode.id === "deep45" ? "Deep Work 45m" :
      mode.id === "deep90" ? "Deep Work 90m" :
      mode.id === "collaboration" ? "Collaboration" : "Reactive";
    onModeChange(modeLabel);

    if (mode.duration) {
      setTimeLeft(mode.duration);
      setTotalTime(mode.duration);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setActiveMode("none");
            onModeChange("None");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(0);
      setTotalTime(0);
    }
  };

  const stopMode = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveMode("none");
    setTimeLeft(0);
    setTotalTime(0);
    setShowAlert(false);
    onModeChange("None");
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const activeModeData = MODES.find((m) => m.id === activeMode);

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <span>🎯</span> Focus Modes
        </h3>
        {activeMode !== "none" && (
          <button
            onClick={stopMode}
            className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-2 py-0.5 rounded-lg transition-all"
          >
            Stop
          </button>
        )}
      </div>

      {/* Active mode display */}
      <AnimatePresence mode="wait">
        {activeMode !== "none" && activeModeData && (
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl bg-white/5 border border-white/10 p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>{activeModeData.icon}</span>
                <span className="text-white text-xs font-bold">{activeModeData.label}</span>
              </div>
              {timeLeft > 0 && (
                <span className="text-cyan-400 font-mono text-sm font-bold">{formatTime(timeLeft)}</span>
              )}
            </div>
            {totalTime > 0 && (
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* IVI Spike Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-orange-500/10 border border-orange-500/30 p-3"
          >
            <div className="flex items-start gap-2">
              <span className="text-orange-400 text-sm flex-shrink-0">⚠</span>
              <div>
                <p className="text-orange-400 text-xs font-bold mb-0.5">Volatility spike during Deep Work!</p>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Your IVI just hit {ivi}. Suggestion: Lock to 2 apps only and snooze notifications.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode buttons */}
      <div className="grid grid-cols-1 gap-2">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => startMode(mode)}
            disabled={activeMode === mode.id}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-default
              ${activeMode === mode.id
                ? `${mode.color} ${mode.borderColor} ring-1 ring-white/20`
                : `${mode.color} ${mode.borderColor} hover:scale-[1.02]`}`}
          >
            <span className="text-base">{mode.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold leading-tight">{mode.label}</div>
              <div className="text-[10px] opacity-70 leading-tight truncate">{mode.description}</div>
            </div>
            {activeMode === mode.id && (
              <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">ACTIVE</span>
            )}
          </button>
        ))}
      </div>

      {/* IVI context */}
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5">
        <div className="flex-1">
          <p className="text-[10px] text-slate-500">Current state recommendation</p>
          <p className="text-xs text-slate-300 font-medium">
            {iviState === "Deep Focus" ? "✓ Stay in current mode, you're in the zone!" :
             iviState === "Stable" ? "💡 Good time to start a focus block" :
             iviState === "Fragmented" ? "⚡ Start 25-min deep work to stabilize" :
             "🚨 Immediate 25-min reset recommended"}
          </p>
        </div>
      </div>
    </div>
  );
}
