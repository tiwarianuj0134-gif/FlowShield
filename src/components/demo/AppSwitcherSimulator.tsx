import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APPS = [
  { name: "VS Code", icon: "⟨/⟩", color: "bg-blue-500/20 border-blue-500/40 text-blue-400", hoverColor: "hover:border-blue-400" },
  { name: "Browser", icon: "⊙", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400", hoverColor: "hover:border-yellow-400" },
  { name: "Slack", icon: "#", color: "bg-green-500/20 border-green-500/40 text-green-400", hoverColor: "hover:border-green-400" },
  { name: "Figma", icon: "◈", color: "bg-purple-500/20 border-purple-500/40 text-purple-400", hoverColor: "hover:border-purple-400" },
  { name: "Notion", icon: "N", color: "bg-slate-500/20 border-slate-400/40 text-slate-300", hoverColor: "hover:border-slate-300" },
  { name: "Terminal", icon: ">_", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400", hoverColor: "hover:border-emerald-400" },
  { name: "Email", icon: "@", color: "bg-red-500/20 border-red-500/40 text-red-400", hoverColor: "hover:border-red-400" },
  { name: "GitHub", icon: "⊕", color: "bg-indigo-500/20 border-indigo-500/40 text-indigo-400", hoverColor: "hover:border-indigo-400" },
];

interface Props {
  onAppSwitch: () => void;
  onTabChurn: () => void;
  onOscillation: () => void;
  appSwitches: number;
  tabChurn: number;
  oscillations: number;
  onSimulateChaos: () => void;
  onSimulateFocus: () => void;
}

export default function AppSwitcherSimulator({
  onAppSwitch,
  onTabChurn,
  onOscillation,
  appSwitches,
  tabChurn,
  oscillations,
  onSimulateChaos,
  onSimulateFocus,
}: Props) {
  const [activeApp, setActiveApp] = useState<string>("VS Code");
  const [lastApp, setLastApp] = useState<string>("");
  const [tabs, setTabs] = useState<number>(3);
  const [switchLog, setSwitchLog] = useState<string[]>(["→ VS Code", "→ Browser", "→ VS Code"]);
  const [toast, setToast] = useState<string>("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleAppClick = (appName: string) => {
    if (appName === activeApp) return;
    const prev = activeApp;
    setLastApp(prev);
    setActiveApp(appName);
    onAppSwitch();
    // detect oscillation: switching back to where we just were
    if (appName === lastApp) {
      onOscillation();
      showToast(`⚠ Oscillation detected: ${prev} ↔ ${appName}`);
    } else {
      showToast(`→ Switched to ${appName}`);
    }
    setSwitchLog((log) => [`→ ${appName}`, ...log].slice(0, 5));
  };

  const handleNewTab = () => {
    setTabs((t) => Math.min(t + 1, 12));
    onTabChurn();
    showToast("+ New tab opened");
  };

  const handleCloseTab = () => {
    if (tabs <= 1) return;
    setTabs((t) => Math.max(t - 1, 0));
    onTabChurn();
    showToast("✕ Tab closed");
  };

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          App Switcher Simulator
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="text-cyan-400 font-mono">{activeApp}</span>
          <span>active</span>
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-4 gap-2">
        {APPS.map((app) => (
          <motion.button
            key={app.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAppClick(app.name)}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer
              ${app.color} ${app.hoverColor}
              ${activeApp === app.name ? "ring-2 ring-white/30 scale-105" : "opacity-70 hover:opacity-100"}`}
          >
            <span className="text-base font-mono font-bold leading-none">{app.icon}</span>
            <span className="text-[9px] font-medium leading-tight">{app.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Browser Tab Controls */}
      <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/20 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-yellow-400 text-xs font-semibold flex items-center gap-1.5">
            <span>⊙</span> Browser Tabs
          </span>
          <span className="text-yellow-400 font-mono text-xs font-bold">{tabs} open</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab pills */}
          <div className="flex gap-1 flex-1 overflow-hidden">
            {Array.from({ length: Math.min(tabs, 8) }).map((_, i) => (
              <div key={i} className="h-4 flex-1 max-w-[20px] bg-yellow-500/30 rounded-sm" />
            ))}
            {tabs > 8 && <span className="text-yellow-500 text-[9px] self-center">+{tabs - 8}</span>}
          </div>
          <button
            onClick={handleNewTab}
            className="px-2 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-400 text-xs rounded-lg transition-colors"
          >
            + Tab
          </button>
          <button
            onClick={handleCloseTab}
            className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-xs rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "App Switches", value: appSwitches, color: "text-orange-400", icon: "↔" },
          { label: "Tab Churn", value: tabChurn, color: "text-yellow-400", icon: "⊙" },
          { label: "Oscillations", value: oscillations, color: "text-red-400", icon: "⇌" },
        ].map((m) => (
          <div key={m.label} className="bg-white/5 rounded-lg p-2 text-center">
            <div className={`text-lg font-black ${m.color} font-mono leading-none`}>{m.value}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Switch log */}
      <div className="rounded-lg bg-black/30 border border-white/5 p-2.5">
        <p className="text-slate-600 text-[9px] font-mono mb-1.5">// SWITCH LOG</p>
        <div className="space-y-0.5">
          {switchLog.map((entry, i) => (
            <motion.div
              key={`${entry}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - i * 0.18, x: 0 }}
              className="text-[10px] font-mono text-slate-400"
            >
              {entry}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simulation Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onSimulateChaos}
          className="py-2 px-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105"
        >
          🔥 Simulate Chaos Day
        </button>
        <button
          onClick={onSimulateFocus}
          className="py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105"
        >
          🎯 Deep Focus Mode
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-4 left-4 right-4 glass rounded-lg px-3 py-2 text-xs text-slate-300 border border-white/10 text-center z-20"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
