import { useRef } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import IVIGauge from "./IVIGauge";
import { getIVIColor, getIVIMessage } from "../../lib/ivi";

interface Props {
  ivi: number;
  iviHistory: { value: number; time: number }[];
  appSwitches: number;
  tabChurn: number;
  oscillations: number;
}

export default function IVIMonitor({ ivi, iviHistory, appSwitches, tabChurn, oscillations }: Props) {
  const color = getIVIColor(ivi);
  const message = getIVIMessage(ivi);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          IVI Monitor
        </h3>
        <div
          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
          style={{ backgroundColor: `${color}15`, borderColor: `${color}40`, color }}
        >
          LIVE
        </div>
      </div>

      {/* Gauge */}
      <div ref={containerRef} className="flex justify-center">
        <IVIGauge value={ivi} size={180} />
      </div>

      {/* Sparkline history */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-slate-500 font-medium">IVI History (last 20 intervals)</span>
          <span className="text-[10px] text-slate-600 font-mono">{iviHistory.length} samples</span>
        </div>
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={iviHistory} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "10px",
                  color: "#f1f5f9",
                  padding: "4px 8px",
                }}
                formatter={(value: number | undefined) => [`IVI: ${value ?? 0}`, ""]}
                labelFormatter={() => ""}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "App Switches", value: appSwitches, weight: "×2", color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Tab Churn", value: tabChurn, weight: "×1.5", color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Oscillations", value: oscillations, weight: "×3", color: "text-red-400", bg: "bg-red-500/10" },
        ].map((m) => (
          <div key={m.label} className={`${m.bg} rounded-xl p-2.5 text-center`}>
            <motion.div
              key={m.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-xl font-black ${m.color} font-mono leading-none`}
            >
              {m.value}
            </motion.div>
            <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">{m.label}</div>
            <div className="text-[8px] text-slate-600">{m.weight}</div>
          </div>
        ))}
      </div>

      {/* IVI Formula */}
      <div className="rounded-xl bg-black/30 border border-white/5 p-3">
        <p className="text-[9px] text-slate-600 font-mono mb-1">// IVI FORMULA</p>
        <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
          IVI = (switches×2) + (churn×1.5) + (oscillations×3)
        </p>
        <p className="text-[10px] font-mono mt-1">
          <span className="text-slate-500">Current: </span>
          <span style={{ color }}>
            ({appSwitches}×2) + ({tabChurn}×1.5) + ({oscillations}×3) = <strong>{ivi}</strong>
          </span>
        </p>
      </div>

      {/* Message */}
      <div
        className="rounded-xl p-3 border text-xs text-center font-medium leading-relaxed"
        style={{ backgroundColor: `${color}10`, borderColor: `${color}25`, color }}
      >
        {message}
      </div>
    </div>
  );
}
