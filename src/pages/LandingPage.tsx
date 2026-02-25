import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import GapSection from "../components/GapSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";
import SdkSection from "../components/SdkSection";
import LivePreviewSection from "../components/LivePreviewSection";
import PersonasSection from "../components/PersonasSection";
import TeamVisionSection from "../components/TeamVisionSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #020617 0%, #030712 50%, #020617 100%)" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <GapSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SdkSection />
      <LivePreviewSection />
      <PersonasSection />
      <TeamVisionSection />

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm font-medium">FlowShield © 2026</span>
          </div>
          <p className="text-slate-600 text-xs">Built with ♥ for the Logitech Hackathon · Cognitive Defense Layer</p>
        </div>
      </footer>
    </div>
  );
}
