import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { computeIVI, getIVIState, getIVIColor } from "../lib/ivi";
import Navbar from "../components/Navbar";
import IVIMonitor from "../components/demo/IVIMonitor";
import AppSwitcherSimulator from "../components/demo/AppSwitcherSimulator";
import MxMappingPanel from "../components/demo/MxMappingPanel";
import FocusModesPanel from "../components/demo/FocusModesPanel";
import AiCoachChat from "../components/demo/AiCoachChat";
import VoiceControlButton from "../components/demo/VoiceControlButton";
import OnboardingCard, { UserProfile } from "../components/demo/OnboardingCard";
import AnalyticsSection from "../components/demo/AnalyticsSection";

type DemoTab = "dashboard" | "analytics";

const DEFAULT_PROFILE: UserProfile = {
  role: "Developer",
  tools: ["VS Code", "Browser", "Slack"],
  deepWorkLengthMinutes: 25,
  interruptionSensitivity: "medium",
};

export default function DemoPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DemoTab>("dashboard");
  const [profileSaved, setProfileSaved] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  // Raw metrics (cumulative)
  const [appSwitches, setAppSwitches] = useState(0);
  const [tabChurn, setTabChurn] = useState(0);
  const [oscillations, setOscillations] = useState(0);

  // IVI computed state
  const [ivi, setIvi] = useState(0);
  const [iviHistory, setIviHistory] = useState<{ value: number; time: number }[]>([]);
  const [iviState, setIviState] = useState("Deep Focus");

  // Mode + voice
  const [activeMode, setActiveMode] = useState("None");
  const [voiceToast, setVoiceToast] = useState<{ command: string; action: string } | null>(null);

  // Simulation intervals
  const chaosTimerRef = useRef<number | null>(null);
  const focusTimerRef = useRef<number | null>(null);
  const iviTimerRef = useRef<number | null>(null);

  // Decay refs to track sliding window metrics
  const switchesRef = useRef(0);
  const churnRef = useRef(0);
  const oscillRef = useRef(0);

  // Sync refs
  useEffect(() => { switchesRef.current = appSwitches; }, [appSwitches]);
  useEffect(() => { churnRef.current = tabChurn; }, [tabChurn]);
  useEffect(() => { oscillRef.current = oscillations; }, [oscillations]);

  // Compute IVI every 2 seconds with partial decay
  useEffect(() => {
    iviTimerRef.current = window.setInterval(() => {
      const raw = computeIVI({
        appSwitches: switchesRef.current,
        tabChurn: churnRef.current,
        oscillations: oscillRef.current,
      });
      const clamped = Math.max(0, Math.min(100, raw));
      setIvi(clamped);
      setIviState(getIVIState(clamped));
      setIviHistory((h) => [...h.slice(-19), { value: clamped, time: Date.now() }]);

      // Gradual decay
      setAppSwitches((v) => Math.max(0, v - 1));
      setTabChurn((v) => Math.max(0, v - 1));
      setOscillations((v) => Math.max(0, v - 1));
    }, 2000);

    return () => {
      if (iviTimerRef.current) clearInterval(iviTimerRef.current);
    };
  }, []);

  const handleSimulateChaos = useCallback(() => {
    if (chaosTimerRef.current) clearInterval(chaosTimerRef.current);
    let count = 0;
    chaosTimerRef.current = window.setInterval(() => {
      setAppSwitches((v) => v + 3);
      setTabChurn((v) => v + 2);
      setOscillations((v) => v + 2);
      count++;
      if (count >= 5) clearInterval(chaosTimerRef.current!);
    }, 300);
  }, []);

  const handleSimulateFocus = useCallback(() => {
    if (focusTimerRef.current) clearInterval(focusTimerRef.current);
    let count = 0;
    focusTimerRef.current = window.setInterval(() => {
      setAppSwitches((v) => Math.max(0, v - 4));
      setTabChurn((v) => Math.max(0, v - 3));
      setOscillations((v) => Math.max(0, v - 3));
      count++;
      if (count >= 5) clearInterval(focusTimerRef.current!);
    }, 300);
  }, []);

  const handleVoiceCommand = (command: string, action: string) => {
    setVoiceToast({ command, action });
    setTimeout(() => setVoiceToast(null), 4000);

    // Apply actual effects
    if (command.includes("deep work") || command.includes("focus")) {
      setActiveMode("Deep Work 25m");
    } else if (command.includes("stop") || command.includes("exit")) {
      setActiveMode("None");
    } else if (command.includes("collaboration") || command.includes("meeting")) {
      setActiveMode("Collaboration");
    }
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setProfileSaved(true);
  };

  const color = getIVIColor(ivi);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #020617 0%, #030712 100%)" }}
    >
      <Navbar />

      {/* Ambient glow based on IVI state */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-2000 opacity-[0.04] z-0"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Demo Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <button
                onClick={() => navigate("/")}
                className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition-colors"
              >
                ← Back
              </button>
              <span className="text-slate-700">|</span>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                FlowShield <span className="text-gradient">Live Demo</span>
              </h1>
              <div
                className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                style={{ backgroundColor: `${color}20`, borderColor: `${color}40`, color }}
              >
                IVI: {ivi} – {iviState}
              </div>
            </div>
            <p className="text-slate-500 text-xs">
              Simulate your workflow, watch your IVI, and see FlowShield adapt your MX in real time.
            </p>
          </div>

          {/* Tab switch + voice */}
          <div className="flex items-center gap-3 flex-wrap">
            <VoiceControlButton onCommand={handleVoiceCommand} />
            <div className="flex rounded-xl border border-white/10 overflow-hidden">
              {(["dashboard", "analytics"] as DemoTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-semibold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-cyan-500/20 text-cyan-400 border-r border-white/10"
                      : "text-slate-500 hover:text-slate-300 bg-transparent"
                  }`}
                >
                  {tab === "dashboard" ? "🎛 Dashboard" : "📊 Analytics"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Voice toast */}
        <AnimatePresence>
          {voiceToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 glass rounded-xl p-3 border border-cyan-500/20 flex items-start gap-2"
            >
              <span className="text-cyan-400 text-sm">🎙</span>
              <div>
                <p className="text-cyan-400 text-xs font-semibold">Voice command: &quot;{voiceToast.command}&quot;</p>
                <p className="text-slate-400 text-xs">{voiceToast.action}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Main grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left column: Profile + IVI Monitor + Focus Modes */}
                <div className="lg:col-span-3 space-y-4">
                  <OnboardingCard
                    onSave={handleSaveProfile}
                    saved={profileSaved}
                    profile={userProfile}
                  />
                  <IVIMonitor
                    ivi={ivi}
                    iviHistory={iviHistory}
                    appSwitches={appSwitches}
                    tabChurn={tabChurn}
                    oscillations={oscillations}
                  />
                </div>

                {/* Center column: App Switcher + Focus Modes */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Personalized tip */}
                  {profileSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-xl p-3 border border-indigo-500/20"
                    >
                      <p className="text-xs text-slate-300">
                        <span className="text-indigo-400 font-semibold">👤 {userProfile.role} profile active.</span>{" "}
                        FlowShield is tuned for: {userProfile.tools.slice(0, 3).join(", ")}{userProfile.tools.length > 3 ? ` +${userProfile.tools.length - 3} more` : ""}.
                        Sensitivity: <span className="text-cyan-400 capitalize">{userProfile.interruptionSensitivity}</span>.
                      </p>
                    </motion.div>
                  )}

                  <div className="relative">
                    <AppSwitcherSimulator
                      onAppSwitch={() => setAppSwitches((v) => v + 2)}
                      onTabChurn={() => setTabChurn((v) => v + 1)}
                      onOscillation={() => setOscillations((v) => v + 3)}
                      appSwitches={appSwitches}
                      tabChurn={tabChurn}
                      oscillations={oscillations}
                      onSimulateChaos={handleSimulateChaos}
                      onSimulateFocus={handleSimulateFocus}
                    />
                  </div>

                  <FocusModesPanel
                    ivi={ivi}
                    iviState={iviState}
                    onModeChange={setActiveMode}
                  />

                  {/* How IVI works explainer */}
                  <div className="glass rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] text-slate-600 font-mono mb-2">// HOW IVI WORKS</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      IVI is a composite score of your interaction volatility. Click apps to switch between them,
                      open/close browser tabs, and watch the IVI gauge respond in real time. Higher switching = higher IVI = more cognitive strain.
                    </p>
                    <div className="flex gap-3 mt-3 flex-wrap">
                      {[
                        { range: "0–25", label: "Deep Focus", color: "#06b6d4" },
                        { range: "26–50", label: "Stable", color: "#22c55e" },
                        { range: "51–75", label: "Fragmented", color: "#f97316" },
                        { range: "76–100", label: "Overloaded", color: "#ef4444" },
                      ].map((s) => (
                        <div key={s.range} className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-[10px] text-slate-500">{s.range} {s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column: MX Mapping Panel */}
                <div className="lg:col-span-4">
                  <MxMappingPanel
                    iviState={iviState}
                    ivi={ivi}
                    activeMode={activeMode}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-white font-bold text-lg mb-1">Your Flow Report – Sample Day</h2>
                <p className="text-slate-500 text-xs">Sample analytics from a real workday pattern.</p>
              </div>
              <AnalyticsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Coach floating chat */}
      <AiCoachChat
        ivi={ivi}
        iviState={iviState}
        metrics={{
          appSwitchesLast10Min: appSwitches,
          tabChurnLast10Min: tabChurn,
          oscillationsLast10Min: oscillations,
        }}
        userProfile={userProfile}
        activeMode={activeMode}
      />
    </div>
  );
}
