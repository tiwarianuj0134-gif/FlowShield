import { motion } from "framer-motion";
import { MOCK_ANALYTICS, getIVIColor } from "../../lib/ivi";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="glass rounded-lg px-2 py-1.5 border border-white/10 text-xs">
        <p className="text-slate-400">{label}</p>
        <p className="text-white font-bold">IVI: {val}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Deep Work", value: MOCK_ANALYTICS.totalDeepWorkTime, icon: "🎯", color: "text-cyan-400" },
          { label: "Average IVI", value: `${MOCK_ANALYTICS.averageIVI} – ${MOCK_ANALYTICS.averageIVILabel}`, icon: "📊", color: "text-orange-400" },
          { label: "Most Distracting", value: MOCK_ANALYTICS.mostDistractingApp, icon: "⚠", color: "text-red-400" },
          { label: "Peak Focus Hour", value: MOCK_ANALYTICS.mostStableHour, icon: "⚡", color: "text-green-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-3 border border-white/10"
          >
            <div className="text-lg mb-1">{stat.icon}</div>
            <div className={`text-sm font-black leading-tight ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* IVI over time chart */}
      <div className="glass rounded-2xl p-5 border border-white/10">
        <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full" />
          IVI vs Time – Sample Workday
        </h4>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={MOCK_ANALYTICS.dailyIVI} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="iviGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: "#64748b", fontSize: 9 }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 9 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="ivi"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#iviGrad)"
              dot={(props) => {
                const { cx, cy, payload } = props;
                const c = getIVIColor(payload.ivi);
                return <circle key={`dot-${payload.time}`} cx={cx} cy={cy} r={3} fill={c} stroke="none" />;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2">
          {[
            { label: "Deep Focus", color: "#06b6d4" },
            { label: "Stable", color: "#22c55e" },
            { label: "Fragmented", color: "#f97316" },
            { label: "Overloaded", color: "#ef4444" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] text-slate-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* App switches bar chart */}
      <div className="glass rounded-2xl p-5 border border-white/10">
        <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full" />
          App Switch Frequency
        </h4>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={MOCK_ANALYTICS.appSwitches} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis
              dataKey="app"
              tick={{ fill: "#64748b", fontSize: 9 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 9 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                fontSize: "11px",
                color: "#f1f5f9",
              }}
            />
            <Bar dataKey="switches" radius={[4, 4, 0, 0]}>
              {MOCK_ANALYTICS.appSwitches.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#ef4444" : index < 3 ? "#f97316" : "#06b6d4"}
                  opacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="glass rounded-2xl p-5 border border-white/10">
        <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-violet-400 rounded-full" />
          FlowShield Insights
        </h4>
        <div className="space-y-3">
          {[
            {
              icon: "⚡",
              text: "You're most focused between 10:00 and 12:00. Protect this window with an automatic Deep Work profile.",
              color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            },
            {
              icon: "⚠",
              text: "Slack triggers 60% of your volatility spikes. Consider remapping your MX side button to 'Back to Primary App' during focus blocks.",
              color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
            },
            {
              icon: "💡",
              text: "After 13:00, your IVI consistently rises. Schedule async work (email/docs) post-lunch and save creative work for mornings.",
              color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
            },
          ].map((insight, i) => (
            <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl border ${insight.color}`}>
              <span className="text-base flex-shrink-0">{insight.icon}</span>
              <p className="text-sm leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
