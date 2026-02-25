import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Real-Time Interaction Volatility Index",
    description: "Continuously measures how unstable your workflow is with a 0–100 cognitive strain score updated every 5 seconds.",
    color: "cyan",
    tag: "Core",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: "Adaptive MX Button Mapping",
    description: "MX buttons and gestures change behavior in real time based on your cognitive state. From 'Forward' to 'Return to main app' when fragmented.",
    color: "indigo",
    tag: "Hardware",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Deep Work Protection Modes",
    description: "One-click 25 / 45 / 90 minute focus modes with fewer ways to derail yourself. Auto-engage DND and limit app switching.",
    color: "emerald",
    tag: "Focus",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: "AI Cognitive Coach",
    description: "An AI assistant powered by GPT-4 that explains your volatility patterns, identifies triggers, and suggests next best actions.",
    color: "violet",
    tag: "AI",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "Jarvis-Style Voice Control",
    description: "Talk to your workflow: 'Start 45-minute deep work on coding.' 'Mute notifications.' 'Switch to collaboration mode.'",
    color: "sky",
    tag: "Voice",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Team / Analytics Dashboard",
    description: "Aggregate 'flow health' for teams without spying on content. Identify systemic interruption patterns across your organization.",
    color: "amber",
    tag: "Future",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400", badge: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", badge: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
  sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400", badge: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", badge: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What FlowShield adds to your{" "}
            <span className="text-gradient">MX</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Six powerful capabilities that transform your Logitech MX from a peripheral into a cognitive partner.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={`glass rounded-2xl p-6 border ${colors.border} hover:scale-105 transition-all duration-300 group cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${colors.badge}`}>
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
