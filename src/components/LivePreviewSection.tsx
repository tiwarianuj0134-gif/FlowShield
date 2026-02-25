import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function MiniGauge({ value }: { value: number }) {
  const size = 120;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="miniGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={60} cy={60} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
      <circle
        cx={60}
        cy={60}
        r={radius}
        fill="none"
        stroke="#f97316"
        strokeWidth={7}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        filter="url(#miniGlow)"
      />
      <text x={60} y={56} textAnchor="middle" fill="#f97316" fontSize={18} fontWeight="bold" fontFamily="monospace">{value}</text>
      <text x={60} y={70} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9}>IVI</text>
    </svg>
  );
}

export default function LivePreviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-3xl border border-orange-500/20 overflow-hidden" style={{ background: "rgba(249,115,22,0.04)" }}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-slate-400 text-xs font-medium ml-2">FlowShield Dashboard – Live Preview</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">Live</span>
              </div>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
              {/* Gauge */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MiniGauge value={68} />
                </motion.div>
                <div className="mt-2 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    <span className="text-orange-400 text-xs font-semibold">Fragmented</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cognitive State</p>
                <h3 className="text-xl font-black text-white mb-2">
                  Interaction Volatility: 68
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  FlowShield Suggestion:{" "}
                  <span className="text-cyan-400 font-medium">
                    Enter 25-min Deep Work Mode
                  </span>{" "}
                  to stabilize your focus.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate("/demo")}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Open Full Demo →
                  </button>
                </div>
              </div>
            </div>

            {/* Mini bar chart */}
            <div className="px-6 pb-5">
              <p className="text-xs text-slate-600 mb-2">IVI over last 10 intervals</p>
              <div className="flex items-end gap-1 h-8">
                {[42, 55, 48, 61, 70, 68, 72, 65, 68, 71].map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.05 }}
                      className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${(v / 100) * 32}px`,
                      backgroundColor: v > 75 ? "#ef4444" : v > 50 ? "#f97316" : v > 25 ? "#22c55e" : "#06b6d4",
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
