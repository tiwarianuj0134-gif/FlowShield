import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const diagramNodes = [
  { label: "MX Device", sub: "MX Master / MX Creative Console", icon: "🖱", color: "border-slate-500/30 bg-slate-800/50" },
  { label: "Logitech Actions SDK", sub: "Events layer", icon: "⚙", color: "border-blue-500/30 bg-blue-900/20" },
  { label: "FlowShield Brain", sub: "IVI + Cognitive Engine", icon: "🧠", color: "border-cyan-500/30 bg-cyan-900/20" },
  { label: "MX Profiles", sub: "Remapped configs", icon: "✓", color: "border-green-500/30 bg-green-900/20" },
];

const arrows = [
  "Events (clicks, scrolls, app context)",
  "Behavioral signals",
  "Adaptive configs",
];

export default function SdkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            SDK Integration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Built on the{" "}
            <span className="text-gradient">Logitech Actions SDK</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            FlowShield doesn't replace your MX devices. It makes them smarter.
            We sit on top of the Logitech Actions SDK to sense interaction patterns
            and push adaptive profiles back to your hardware.
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-0 overflow-x-auto pb-4">
            {diagramNodes.map((node, i) => (
              <div key={node.label} className="flex items-center">
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className={`flex flex-col items-center p-5 rounded-2xl border ${node.color} glass min-w-[140px] text-center`}
                >
                  <span className="text-3xl mb-2">{node.icon}</span>
                  <span className="text-white font-bold text-sm leading-tight">{node.label}</span>
                  <span className="text-slate-500 text-xs mt-1">{node.sub}</span>
                </motion.div>

                {/* Arrow */}
                {i < diagramNodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.15 }}
                    className="flex flex-col items-center mx-2 min-w-[100px] lg:min-w-[120px]"
                  >
                    <div className="relative w-full">
                      <div className="h-px bg-gradient-to-r from-cyan-500/50 to-indigo-500/50 w-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-cyan-400 text-xs">→</div>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 text-center leading-tight max-w-[100px]">
                      {arrows[i]}
                    </span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Code-style info */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-slate-500 text-xs font-mono">events_used.ts</span>
            </div>
            <p className="text-cyan-400 text-xs font-semibold mb-3 font-mono">// Events Consumed</p>
            {[
              "App focus changes",
              "Active profile identifier",
              "Button trigger events",
              "Scroll wheel delta + velocity",
              "Custom macro invocations",
              "Gesture direction + duration",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                <span className="text-green-400 font-mono text-xs">→</span>
                <span className="text-slate-300 text-sm font-mono">{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-slate-500 text-xs font-mono">actions_used.ts</span>
            </div>
            <p className="text-indigo-400 text-xs font-semibold mb-3 font-mono">// Actions Dispatched</p>
            {[
              "Remap MX button functions",
              "Switch active MX profile",
              "Trigger OS DND command",
              "Open primary app window",
              "Close distraction apps",
              "Lock screen (overload shield)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                <span className="text-indigo-400 font-mono text-xs">⚡</span>
                <span className="text-slate-300 text-sm font-mono">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
