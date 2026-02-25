export interface IVIMetrics {
  appSwitches: number;
  tabChurn: number;
  oscillations: number;
}

export function computeIVI(metrics: IVIMetrics): number {
  const score =
    metrics.appSwitches * 2 +
    metrics.tabChurn * 1.5 +
    metrics.oscillations * 3;

  const clamped = Math.max(0, Math.min(100, score));
  return Math.round(clamped);
}

export function getIVIState(ivi: number): string {
  if (ivi <= 25) return "Deep Focus";
  if (ivi <= 50) return "Stable";
  if (ivi <= 75) return "Fragmented";
  return "Overloaded";
}

export function getIVIColor(ivi: number): string {
  if (ivi <= 25) return "#06b6d4";
  if (ivi <= 50) return "#22c55e";
  if (ivi <= 75) return "#f97316";
  return "#ef4444";
}

export function getIVIGradient(ivi: number): string {
  if (ivi <= 25) return "from-cyan-500 to-teal-500";
  if (ivi <= 50) return "from-green-500 to-emerald-500";
  if (ivi <= 75) return "from-orange-500 to-amber-500";
  return "from-red-500 to-rose-500";
}

export function getIVITextColor(ivi: number): string {
  if (ivi <= 25) return "text-cyan-400";
  if (ivi <= 50) return "text-green-400";
  if (ivi <= 75) return "text-orange-400";
  return "text-red-400";
}

export function getIVIBgColor(ivi: number): string {
  if (ivi <= 25) return "bg-cyan-500/20";
  if (ivi <= 50) return "bg-green-500/20";
  if (ivi <= 75) return "bg-orange-500/20";
  return "bg-red-500/20";
}

export function getIVIMessage(ivi: number): string {
  if (ivi <= 25) return "You're in the zone. Let's keep it that way.";
  if (ivi <= 50) return "Stable flow. Minor context switching detected.";
  if (ivi <= 75) return "Your brain is juggling too much. Time for a reset?";
  return "Cognitive overload detected. Immediate action recommended.";
}

export const MX_BUTTON_MAPPINGS: Record<string, {
  thumbButton: string;
  scrollClick: string;
  gestureUp: string;
  gestureDown: string;
  gestureLeft: string;
  gestureRight: string;
}> = {
  "Deep Focus": {
    thumbButton: "Back to Main App (Primary Tool)",
    scrollClick: "Quick Note – Capture Distraction",
    gestureUp: "Toggle Do Not Disturb",
    gestureDown: "Flow Review Panel",
    gestureLeft: "Switch to IDE",
    gestureRight: "Switch to Docs",
  },
  Stable: {
    thumbButton: "Forward / Back Navigation",
    scrollClick: "Middle Click",
    gestureUp: "Mission Control",
    gestureDown: "App Expose",
    gestureLeft: "Back",
    gestureRight: "Forward",
  },
  Fragmented: {
    thumbButton: "Return to Last Stable App",
    scrollClick: "Close Current Tab",
    gestureUp: "Open Flow Review Panel",
    gestureDown: "Snap Distraction to Sidebar",
    gestureLeft: "Switch to Primary App",
    gestureRight: "Switch to Secondary App",
  },
  Overloaded: {
    thumbButton: "Close Current Tab",
    scrollClick: "Dump Distraction to Inbox",
    gestureUp: "Start 10-min Reset Break",
    gestureDown: "Lock Screen",
    gestureLeft: "Return to Main App",
    gestureRight: "Enable Aggressive DND",
  },
};

export const MX_PROFILES: Array<{
  state: string;
  profileName: string;
  behaviorSummary: string;
}> = [
  { state: "Deep Focus", profileName: "Focus Lock", behaviorSummary: "Limit navigation to 1–2 core apps. Scroll wheel resistance increased." },
  { state: "Stable", profileName: "Balanced Flow", behaviorSummary: "Normal behavior with gentle guardrails. Smart context switching enabled." },
  { state: "Fragmented", profileName: "Flow Rescue", behaviorSummary: "Reduce scrolling, prioritize 'back to main app'. Tab churn dampening active." },
  { state: "Overloaded", profileName: "Cognitive Shield", behaviorSummary: "Aggressively remove distractions, add mandatory micro-breaks every 10 min." },
];

export const MOCK_ANALYTICS = {
  totalDeepWorkTime: "2h 15m",
  averageIVI: 42,
  averageIVILabel: "Mildly Fragmented",
  mostDistractingApp: "Slack",
  mostStableHour: "10:00–12:00",
  dailyIVI: [
    { time: "9:00", ivi: 22, label: "Deep Focus" },
    { time: "9:30", ivi: 35, label: "Stable" },
    { time: "10:00", ivi: 18, label: "Deep Focus" },
    { time: "10:30", ivi: 15, label: "Deep Focus" },
    { time: "11:00", ivi: 20, label: "Deep Focus" },
    { time: "11:30", ivi: 28, label: "Stable" },
    { time: "12:00", ivi: 52, label: "Fragmented" },
    { time: "12:30", ivi: 67, label: "Fragmented" },
    { time: "13:00", ivi: 80, label: "Overloaded" },
    { time: "13:30", ivi: 72, label: "Fragmented" },
    { time: "14:00", ivi: 55, label: "Fragmented" },
    { time: "14:30", ivi: 40, label: "Stable" },
    { time: "15:00", ivi: 30, label: "Stable" },
    { time: "15:30", ivi: 25, label: "Deep Focus" },
    { time: "16:00", ivi: 45, label: "Stable" },
    { time: "16:30", ivi: 60, label: "Fragmented" },
    { time: "17:00", ivi: 35, label: "Stable" },
  ],
  appSwitches: [
    { app: "Slack", switches: 48 },
    { app: "Browser", switches: 35 },
    { app: "VS Code", switches: 22 },
    { app: "Figma", switches: 18 },
    { app: "Notion", switches: 15 },
    { app: "Email", switches: 12 },
  ],
};
