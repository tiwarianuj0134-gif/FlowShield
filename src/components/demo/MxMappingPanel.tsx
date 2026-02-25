import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MX_BUTTON_MAPPINGS, MX_PROFILES, getIVIColor } from "../../lib/ivi";

interface Props {
  iviState: string;
  ivi: number;
  activeMode: string;
}

type TabType = "buttons" | "profiles" | "rules";

const RULES = [
  {
    icon: "⚡",
    condition: "IF IVI > 70 for 3 minutes",
    action: "Auto-start 25-min Deep Work Mode & remap MX to Focus Lock profile",
    color: "border-red-500/20 bg-red-500/5",
    badge: "bg-red-500/20 text-red-400",
  },
  {
    icon: "💤",
    condition: "IF IVI < 30 for 15 minutes",
    action: "Suggest a 5-min micro-break to preserve long-term focus reserves",
    color: "border-cyan-500/20 bg-cyan-500/5",
    badge: "bg-cyan-500/20 text-cyan-400",
  },
  {
    icon: "📱",
    condition: "IF app-switch spikes from Slack/Chat",
    action: "Temporarily remap thumb button to 'Back to Primary App'",
    color: "border-yellow-500/20 bg-yellow-500/5",
    badge: "bg-yellow-500/20 text-yellow-400",
  },
  {
    icon: "🔒",
    condition: "IF Overloaded state persists > 5 min",
    action: "Remap gesture-down to 'Lock Screen' and enable aggressive DND",
    color: "border-orange-500/20 bg-orange-500/5",
    badge: "bg-orange-500/20 text-orange-400",
  },
  {
    icon: "🎯",
    condition: "IF entering Deep Work Mode manually",
    action: "Immediately switch to Focus Lock MX profile regardless of current IVI",
    color: "border-indigo-500/20 bg-indigo-500/5",
    badge: "bg-indigo-500/20 text-indigo-400",
  },
];

const BUTTON_POSITIONS = [
  { key: "thumbButton", label: "Thumb Button", x: 12, y: 52, w: 20, h: 10, color: "#06b6d4" },
  { key: "scrollClick", label: "Scroll Click", x: 38, y: 22, w: 18, h: 22, color: "#818cf8" },
  { key: "gestureUp", label: "Gesture ↑", x: 38, y: 10, w: 18, h: 8, color: "#22c55e" },
  { key: "gestureDown", label: "Gesture ↓", x: 38, y: 48, w: 18, h: 8, color: "#f97316" },
  { key: "gestureLeft", label: "Gesture ←", x: 20, y: 30, w: 14, h: 7, color: "#a855f7" },
  { key: "gestureRight", label: "Gesture →", x: 62, y: 30, w: 14, h: 7, color: "#ec4899" },
];

export default function MxMappingPanel({ iviState, ivi, activeMode }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("buttons");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const mapping = MX_BUTTON_MAPPINGS[iviState] || MX_BUTTON_MAPPINGS["Stable"];
  const color = getIVIColor(ivi);

  const tabs: { id: TabType; label: string }[] = [
    { id: "buttons", label: "Buttons" },
    { id: "profiles", label: "Profiles" },
    { id: "rules", label: "Rules" },
  ];

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            <span className="text-lg">🖱</span>
            MX Device Brain
          </h3>
          <select className="bg-slate-800/80 border border-slate-600/50 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none">
            <option>MX Master 4</option>
            <option>MX Creative Console</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold border"
            style={{ backgroundColor: `${color}20`, borderColor: `${color}40`, color }}
          >
            State: {iviState}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
            Mode: {activeMode}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5"
                : "text-slate-500 hover:text-slate-300 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === "buttons" && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mouse SVG visualization */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <svg width="120" height="170" viewBox="0 0 100 140" fill="none">
                    <defs>
                      <linearGradient id="mxGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    <path d="M20 30 Q20 10 50 8 Q80 10 80 30 L85 100 Q85 130 50 132 Q15 130 15 100 Z"
                      fill="url(#mxGrad2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="50" y1="8" x2="50" y2="65" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                    {BUTTON_POSITIONS.map((btn) => (
                      <rect
                        key={btn.key}
                        x={btn.x} y={btn.y} width={btn.w} height={btn.h} rx="2"
                        fill={hoveredButton === btn.key ? btn.color : `${btn.color}60`}
                        stroke={btn.color}
                        strokeWidth="0.8"
                        style={{ cursor: "pointer", transition: "fill 0.2s" }}
                        onMouseEnter={() => setHoveredButton(btn.key)}
                        onMouseLeave={() => setHoveredButton(null)}
                      />
                    ))}

                    <circle cx="50" cy="118" r="3" fill={color} opacity="0.8" />
                    <circle cx="50" cy="118" r="5" fill={`${color}30`} />
                  </svg>
                </div>
              </div>

              {/* Button mapping list */}
              <div className="space-y-2">
                {BUTTON_POSITIONS.map((btn) => (
                  <motion.div
                    key={btn.key}
                    layout
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all duration-200 cursor-default ${
                      hoveredButton === btn.key ? "border-white/20 bg-white/5" : "border-white/5 bg-white/[0.02]"
                    }`}
                    onMouseEnter={() => setHoveredButton(btn.key)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: btn.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-slate-500 font-medium">{btn.label}</div>
                      <motion.div
                        key={`${btn.key}-${iviState}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-slate-200 font-medium truncate"
                      >
                        {mapping[btn.key as keyof typeof mapping]}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profiles" && (
            <motion.div
              key="profiles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {MX_PROFILES.map((profile) => {
                const isActive = profile.state === iviState;
                const pColor = getIVIColor(
                  profile.state === "Deep Focus" ? 10 :
                  profile.state === "Stable" ? 35 :
                  profile.state === "Fragmented" ? 65 : 85
                );
                return (
                  <div
                    key={profile.state}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      isActive ? "border-white/20 bg-white/5 scale-[1.02]" : "border-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white text-xs font-bold">{profile.profileName}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: `${pColor}20`, color: pColor }}
                        >
                          {profile.state}
                        </span>
                        {isActive && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-white font-medium">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-500 text-[10px] leading-relaxed">{profile.behaviorSummary}</p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === "rules" && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {RULES.map((rule, i) => (
                <div key={i} className={`p-3 rounded-xl border ${rule.color}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-base flex-shrink-0">{rule.icon}</span>
                    <div>
                      <div className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded inline-block mb-1 ${rule.badge}`}>
                        {rule.condition}
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">→ {rule.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
