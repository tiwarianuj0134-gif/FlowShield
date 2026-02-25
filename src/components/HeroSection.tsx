import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function IVIGauge({ value, size = 160 }: { value: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = value <= 25 ? "#06b6d4" : value <= 50 ? "#22c55e" : value <= 75 ? "#f97316" : "#ef4444";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={8}
      />
      {/* Value arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        filter="url(#glow)"
        style={{ transition: "stroke-dashoffset 1s ease, stroke 0.5s ease" }}
      />
      {/* Center text */}
      <text x={size / 2} y={size / 2 - 6} textAnchor="middle" fill={color} fontSize={size * 0.18} fontWeight="bold" fontFamily="monospace">
        {value}
      </text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={size * 0.08}>
        IVI
      </text>
    </svg>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                Logitech MX Hackathon 2024
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              <span className="text-white">FlowShield –</span>
              <br />
              <span className="text-gradient">Cognitive Defense</span>
              <br />
              <span className="text-white">Layer for</span>{" "}
              <span className="text-slate-400">Logitech MX</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-cyan-400 font-semibold mb-4"
            >
              Stops cognitive overload before it breaks your deep work.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-base leading-relaxed mb-8 max-w-xl"
            >
              Today's workflows aren't limited by typing speed. They're limited by cognitive stability.
              FlowShield sits on top of your Logitech MX devices, senses workflow chaos, and adapts
              your hardware in real time to protect your focus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => navigate("/demo")}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Live Demo
              </button>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-slate-600 hover:border-cyan-500/50 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 flex items-center gap-2"
              >
                See How It Works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl blur-2xl" />

              <div className="glass rounded-3xl p-8 relative border border-cyan-500/20 glow-cyan">
                {/* Mock MX Mouse silhouette */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
                      <defs>
                        <linearGradient id="mouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                      </defs>
                      {/* Mouse body */}
                      <path d="M20 30 Q20 10 50 8 Q80 10 80 30 L85 100 Q85 130 50 132 Q15 130 15 100 Z" fill="url(#mouseGrad)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
                      {/* Center line */}
                      <line x1="50" y1="8" x2="50" y2="80" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
                      {/* Scroll wheel */}
                      <rect x="43" y="25" width="14" height="22" rx="4" fill="rgba(6,182,212,0.2)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
                      <rect x="43" y="31" width="14" height="2" fill="rgba(6,182,212,0.4)" />
                      <rect x="43" y="35" width="14" height="2" fill="rgba(6,182,212,0.4)" />
                      <rect x="43" y="39" width="14" height="2" fill="rgba(6,182,212,0.4)" />
                      {/* Thumb button */}
                      <rect x="14" y="55" width="18" height="10" rx="3" fill="url(#accentGrad)" opacity="0.8" />
                      {/* Status LED */}
                      <circle cx="50" cy="118" r="3" fill="#06b6d4" opacity="0.8" />
                      <circle cx="50" cy="118" r="5" fill="rgba(6,182,212,0.2)" />
                    </svg>
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-cyan-400"
                    />
                  </div>
                </div>

                {/* IVI Gauge */}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Interaction Volatility Index</p>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <IVIGauge value={68} size={140} />
                  </motion.div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                      <span className="text-orange-400 text-xs font-semibold">Fragmented</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Suggestion:{" "}
                      <span className="text-cyan-400 font-medium">
                        Enter 25-min Deep Work Mode
                      </span>
                    </p>
                  </div>

                  {/* Mini metrics */}
                  <div className="grid grid-cols-3 gap-3 w-full mt-2">
                    {[
                      { label: "App Switches", value: "12/min", color: "text-orange-400" },
                      { label: "Tab Churn", value: "8/min", color: "text-yellow-400" },
                      { label: "Oscillations", value: "4/min", color: "text-red-400" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-2 rounded-lg bg-white/5">
                        <div className={`text-sm font-bold ${m.color}`}>{m.value}</div>
                        <div className="text-[10px] text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs">Scroll to explore</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
