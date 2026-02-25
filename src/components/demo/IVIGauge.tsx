import { motion } from "framer-motion";
import { getIVIColor, getIVIState, getIVIMessage, getIVITextColor } from "../../lib/ivi";

interface IVIGaugeProps {
  value: number;
  size?: number;
}

export default function IVIGauge({ value, size = 180 }: IVIGaugeProps) {
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = getIVIColor(value);
  const state = getIVIState(value);
  const textColor = getIVITextColor(value);
  const message = getIVIMessage(value);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: color }}
        />
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative">
          <defs>
            <filter id="gaugeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Background rings */}
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={10} />
          <circle cx={size / 2} cy={size / 2} r={radius - 12} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth={1} />

          {/* Value arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            filter="url(#gaugeGlow)"
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = ((tick / 100) * 360 - 90) * (Math.PI / 180);
            const innerR = radius - 15;
            const outerR = radius + 3;
            return (
              <line
                key={tick}
                x1={size / 2 + innerR * Math.cos(angle)}
                y1={size / 2 + innerR * Math.sin(angle)}
                x2={size / 2 + outerR * Math.cos(angle)}
                y2={size / 2 + outerR * Math.sin(angle)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={2}
              />
            );
          })}

          {/* Center content */}
          <text x={size / 2} y={size / 2 - 12} textAnchor="middle" fill={color} fontSize={size * 0.2} fontWeight="900" fontFamily="monospace">
            {value}
          </text>
          <text x={size / 2} y={size / 2 + 8} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={size * 0.07}>
            / 100
          </text>
          <text x={size / 2} y={size / 2 + 24} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={size * 0.065}>
            IVI
          </text>
        </svg>
      </div>

      {/* State badge */}
      <motion.div
        key={state}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border"
        style={{
          backgroundColor: `${color}20`,
          borderColor: `${color}40`,
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className={`text-sm font-bold ${textColor}`}>{state}</span>
      </motion.div>

      {/* Message */}
      <p className="text-slate-400 text-xs text-center max-w-[200px] leading-relaxed">
        {message}
      </p>
    </div>
  );
}
