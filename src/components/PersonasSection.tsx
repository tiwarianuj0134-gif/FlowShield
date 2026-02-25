import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const personas = [
  {
    icon: "⟨/⟩",
    role: "Developers",
    color: "cyan",
    tools: ["VS Code", "GitHub", "Browser", "Slack", "Terminal"],
    description: "FlowShield keeps engineers in flow by reducing app thrash between code, docs and chat. Auto-remaps MX to 'Back to IDE' when volatility spikes from Slack.",
    painPoint: "Constant Slack pings interrupt deep coding sessions",
    borderClass: "border-cyan-500/30",
    bgClass: "bg-cyan-500/5",
    iconClass: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    tagClass: "bg-cyan-500/20 text-cyan-400",
  },
  {
    icon: "◈",
    role: "Designers",
    color: "violet",
    tools: ["Figma", "Notion", "Browser", "Teams", "Miro"],
    description: "FlowShield stabilizes rapid tool hopping while exploring designs and specs. Protects creative flow during iterative design phases.",
    painPoint: "Rapidly switching between reference docs and Figma",
    borderClass: "border-violet-500/30",
    bgClass: "bg-violet-500/5",
    iconClass: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    tagClass: "bg-violet-500/20 text-violet-400",
  },
  {
    icon: "✎",
    role: "Writers & PMs",
    color: "emerald",
    tools: ["Docs", "Notion", "Email", "Chat", "Calendar"],
    description: "FlowShield protects long-form thinking time while still letting you respond when it matters. Detects when async tasks are safer than sync interruptions.",
    painPoint: "Email + chat pulls attention from strategic work",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/5",
    iconClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    tagClass: "bg-emerald-500/20 text-emerald-400",
  },
];

export default function PersonasSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="personas" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            For Whom
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Designed for{" "}
            <span className="text-gradient">real workflows</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every knowledge worker faces cognitive saturation differently. FlowShield adapts to your role.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.role}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className={`rounded-2xl p-6 border ${persona.borderClass} ${persona.bgClass} glass hover:scale-105 transition-all duration-300 cursor-default group`}
            >
              {/* Icon + role */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl border ${persona.iconClass} flex items-center justify-center text-2xl font-bold`}>
                  {persona.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{persona.role}</h3>
                  <p className="text-slate-500 text-xs">Knowledge worker</p>
                </div>
              </div>

              {/* Pain point */}
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-xs font-medium">
                  ⚠ Pain Point: {persona.painPoint}
                </p>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {persona.tools.map((tool) => (
                  <span key={tool} className={`px-2 py-0.5 rounded-full text-xs ${persona.tagClass} border border-current/20`}>
                    {tool}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">{persona.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
