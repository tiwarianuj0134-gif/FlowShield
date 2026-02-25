import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const team = [
  { name: "Alex Chen", role: "Full-Stack & AI Engineer", initials: "AC", color: "from-cyan-500 to-indigo-600" },
  { name: "Jordan Kim", role: "UX / Hardware Integration", initials: "JK", color: "from-violet-500 to-pink-600" },
  { name: "Sam Rivera", role: "Cognitive Systems Researcher", initials: "SR", color: "from-emerald-500 to-teal-600" },
];

export default function TeamVisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Vision
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            The Cognitive Defense Layer
            <br />
            <span className="text-gradient">for every knowledge worker</span>
          </h2>
          <div className="max-w-2xl mx-auto glass rounded-2xl p-8 border border-cyan-500/20">
            <p className="text-slate-300 text-base leading-relaxed mb-4">
              FlowShield's mission is to add a cognitive defense layer to every Logitech MX device.
              As AI accelerates output, we prevent the hidden cost: <span className="text-orange-400 font-semibold">cognitive saturation</span>.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              When every team member has FlowShield, organizations gain visibility into collective flow health —
              not to surveil, but to design better meeting schedules, interrupt policies, and tool stacks
              that respect human cognitive limits.
            </p>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-center text-lg font-bold text-slate-400 mb-8">The Team</h3>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-3 text-white font-black text-lg shadow-lg`}>
                  {member.initials}
                </div>
                <h4 className="text-white font-bold">{member.name}</h4>
                <p className="text-slate-500 text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hackathon badge + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass rounded-2xl p-6 border border-slate-700/50 mb-8">
            <div className="text-3xl">🏆</div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold">Built for the Logitech International Hackathon</p>
              <p className="text-slate-400 text-sm">Exploring the future of cognitive-aware hardware interfaces</p>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate("/demo")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 hover:scale-105 text-lg"
            >
              Try the Live Demo →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
