import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function GapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            The Gap
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Your software tries to manage attention.
            <br />
            <span className="text-slate-400">Your hardware stays blind.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Today's MX */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Today's MX Devices</h3>
                <p className="text-slate-500 text-xs">Powerful but perception-blind</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: "✓", text: "Super customizable buttons & gestures", good: true },
                { icon: "✓", text: "Multiple device profiles", good: true },
                { icon: "✗", text: "No understanding of cognitive overload", good: false },
                { icon: "✗", text: "No awareness of workflow fragmentation", good: false },
                { icon: "✗", text: "Static button mapping regardless of your state", good: false },
                { icon: "✗", text: "No proactive focus protection", good: false },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className={`text-sm font-bold mt-0.5 flex-shrink-0 ${item.good ? "text-green-400" : "text-red-400"}`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm ${item.good ? "text-slate-300" : "text-slate-500"}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FlowShield */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl p-8 border border-cyan-500/30 glow-cyan overflow-hidden"
            style={{ background: "rgba(6,182,212,0.04)" }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">FlowShield Layer</h3>
                <p className="text-cyan-400 text-xs font-medium">Cognitive-aware hardware intelligence</p>
              </div>
              <div className="ml-auto">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">NEW</span>
              </div>
            </div>

            <div className="space-y-3 relative">
              {[
                "Detects workflow fragmentation signals in real time",
                "Computes a real-time Interaction Volatility Index (IVI)",
                "Adapts MX buttons & modes based on cognitive strain",
                "Protects deep work continuity without locking you down",
                "AI Cognitive Coach explains your volatility patterns",
                "Jarvis-style voice control for hands-free mode changes",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-cyan-400 text-sm font-bold mt-0.5 flex-shrink-0">⚡</span>
                  <span className="text-slate-200 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
