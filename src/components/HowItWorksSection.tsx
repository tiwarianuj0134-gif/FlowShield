import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Sense",
    subtitle: "Perceive workflow signals",
    color: "cyan",
    colorClass: "text-cyan-400",
    borderClass: "border-cyan-500/30",
    bgClass: "bg-cyan-500/10",
    glowClass: "shadow-cyan-500/20",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    points: [
      "Tracks app-switch velocity, tab churn, and rapid tool oscillation",
      "Listens to MX clicks, scrolls and gestures via the Logitech Actions SDK",
      "Monitors active window context and transition frequency",
      "Detects oscillation patterns between specific app pairs",
    ],
  },
  {
    number: "02",
    title: "Think – IVI",
    subtitle: "Interaction Volatility Index",
    color: "indigo",
    colorClass: "text-indigo-400",
    borderClass: "border-indigo-500/30",
    bgClass: "bg-indigo-500/10",
    glowClass: "shadow-indigo-500/20",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    points: [
      "Computes an IVI score from 0–100 based on interaction volatility",
      "Deep Focus: 0–25 · Stable: 26–50 · Fragmented: 51–75 · Overloaded: 76–100",
      "Weighted formula: appSwitches×2 + tabChurn×1.5 + oscillations×3",
      "Updates every 5 seconds with rolling window metrics",
    ],
  },
  {
    number: "03",
    title: "Act",
    subtitle: "Adapt your hardware",
    color: "orange",
    colorClass: "text-orange-400",
    borderClass: "border-orange-500/30",
    bgClass: "bg-orange-500/10",
    glowClass: "shadow-orange-500/20",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    points: [
      "Overloaded → Thumb button = 'Back to main app' instead of 'Forward/Back'",
      "Overloaded → Gesture up = 'Enable Do Not Disturb'",
      "Fragmented → Scroll wheel = more resistance (reduce mindless scrolling)",
      "Deep Focus → Gesture left/right = 'Switch between 2 key apps only'",
    ],
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            How FlowShield{" "}
            <span className="text-gradient">thinks on top of</span>
            <br />
            Logitech MX
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-orange-500/30" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative"
              >
                {/* Arrow between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-14 z-10 items-center justify-center w-8">
                    <span className={`text-xl ${steps[i + 1].colorClass}`}>→</span>
                  </div>
                )}

                <div className={`glass rounded-2xl p-6 border ${step.borderClass} h-full hover:shadow-xl ${step.glowClass} transition-all duration-300`}>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${step.bgClass} border ${step.borderClass} flex items-center justify-center ${step.colorClass}`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${step.colorClass} tracking-wider`}>
                        STEP {step.number}
                      </div>
                      <h3 className="text-xl font-black text-white">{step.title}</h3>
                      <p className="text-slate-500 text-xs">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {step.points.map((point) => (
                      <div key={point} className="flex items-start gap-2">
                        <span className={`text-xs mt-1 flex-shrink-0 ${step.colorClass}`}>▸</span>
                        <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
