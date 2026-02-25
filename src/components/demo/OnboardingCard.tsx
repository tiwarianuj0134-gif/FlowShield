import { useState } from "react";
import { motion } from "framer-motion";

const ROLES = ["Developer", "Designer", "Writer", "Manager", "Researcher"];
const ALL_TOOLS = ["VS Code", "Figma", "Notion", "Slack", "Browser", "Email", "Terminal", "GitHub", "Jira", "Miro"];
const SENSITIVITY = ["Low", "Medium", "High"];
const DEEP_WORK_LENGTHS = [25, 45, 90];

export interface UserProfile {
  role: string;
  tools: string[];
  deepWorkLengthMinutes: number;
  interruptionSensitivity: string;
}

interface Props {
  onSave: (profile: UserProfile) => void;
  saved: boolean;
  profile: UserProfile;
}

export default function OnboardingCard({ onSave, saved, profile }: Props) {
  const [role, setRole] = useState(profile.role || "Developer");
  const [tools, setTools] = useState<string[]>(profile.tools.length ? profile.tools : ["VS Code", "Browser", "Slack"]);
  const [sensitivity, setSensitivity] = useState(profile.interruptionSensitivity || "Medium");
  const [deepWorkLength, setDeepWorkLength] = useState(profile.deepWorkLengthMinutes || 25);

  const toggleTool = (tool: string) => {
    setTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSave = () => {
    onSave({ role, tools, deepWorkLengthMinutes: deepWorkLength, interruptionSensitivity: sensitivity.toLowerCase() });
  };

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <span>👤</span> Your Profile
        </h3>
        {saved && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full"
          >
            ✓ Saved
          </motion.span>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">
          You primarily work as
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150 ${
                role === r
                  ? "bg-cyan-500/30 border-cyan-500/50 text-cyan-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">
          Your typical tools
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TOOLS.map((tool) => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150 ${
                tools.includes(tool)
                  ? "bg-indigo-500/30 border-indigo-500/50 text-indigo-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Sensitivity + Deep Work */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">
            Interruption sensitivity
          </label>
          <div className="flex gap-1">
            {SENSITIVITY.map((s) => (
              <button
                key={s}
                onClick={() => setSensitivity(s)}
                className={`flex-1 py-1 rounded-lg text-xs font-medium border transition-all duration-150 ${
                  sensitivity === s
                    ? "bg-orange-500/30 border-orange-500/50 text-orange-300"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">
            Ideal deep work session
          </label>
          <div className="flex gap-1">
            {DEEP_WORK_LENGTHS.map((l) => (
              <button
                key={l}
                onClick={() => setDeepWorkLength(l)}
                className={`flex-1 py-1 rounded-lg text-xs font-medium border transition-all duration-150 ${
                  deepWorkLength === l
                    ? "bg-violet-500/30 border-violet-500/50 text-violet-300"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {l}m
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-200 hover:scale-[1.02]"
      >
        Save Profile & Personalize FlowShield
      </button>
    </div>
  );
}
