import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const statCards = [
  {
    title: "23 minutes",
    text: "Average time to fully regain deep focus after an interruption.",
    icon: "⏱",
    color: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/20",
  },
  {
    title: "1,000+",
    text: "Micro-interruptions per day for modern knowledge workers.",
    icon: "🔔",
    color: "from-orange-500/20 to-transparent",
    border: "border-orange-500/20",
  },
  {
    title: "Context Switch → Residue → Burnout",
    text: "Your brain pays a hidden tax every time you alt-tab.",
    icon: "🧠",
    color: "from-red-500/20 to-transparent",
    border: "border-red-500/20",
  },
];

const tools = [
  { name: "VS Code", icon: "⟨/⟩", color: "bg-blue-500/20 border-blue-500/30 text-blue-400" },
  { name: "Figma", icon: "◈", color: "bg-purple-500/20 border-purple-500/30 text-purple-400" },
  { name: "Notion", icon: "N", color: "bg-slate-500/20 border-slate-500/30 text-slate-300" },
  { name: "Slack", icon: "#", color: "bg-green-500/20 border-green-500/30 text-green-400" },
  { name: "Chrome", icon: "⊙", color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" },
  { name: "Terminal", icon: ">_", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" },
  { name: "Email", icon: "@", color: "bg-red-500/20 border-red-500/30 text-red-400" },
  { name: "GitHub", icon: "⊕", color: "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" },
];

function AnimatedCard({ card, index }: { card: typeof statCards[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`glass rounded-2xl p-6 border ${card.border} hover:scale-105 transition-transform duration-300 cursor-default`}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-4 border ${card.border}`}>
        {card.icon}
      </div>
      <h3 className="text-2xl font-black text-white mb-2 leading-tight">{card.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{card.text}</p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-red-500/20 text-red-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            The Problem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Speed is not the problem.
            <br />
            <span className="text-gradient-warm">Cognitive saturation is.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Knowledge workers jump between IDEs, design tools, docs, email, and chat apps dozens of
            times per hour. Each switch leaves attention residue, drains working memory, and
            increases decision fatigue.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {statCards.map((card, i) => (
            <AnimatedCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* App switch strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-center text-slate-500 text-sm mb-4">
            Every context switch between these apps leaves cognitive residue…
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max mx-auto justify-start md:justify-center px-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="group relative"
                >
                  <div className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${tool.color} cursor-default
                    hover:scale-110 transition-all duration-200 hover:shadow-lg w-16`}>
                    <span className="text-xl font-mono font-bold">{tool.icon}</span>
                    <span className="text-[10px] font-medium whitespace-nowrap">{tool.name}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="glass px-2 py-1 rounded text-[10px] text-red-400 whitespace-nowrap border border-red-500/20">
                      ⚠ Attention residue
                    </div>
                  </div>
                  {/* Arrow connector */}
                  {i < tools.length - 1 && (
                    <div className="absolute top-1/2 -right-2 text-slate-600 text-xs z-10">→</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
