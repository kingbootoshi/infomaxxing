"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface AchievementToastProps {
  milestone: number;
  onDismiss: () => void;
}

function getMessage(milestone: number) {
  if (milestone >= 560) return "INFOMAXXED";
  if (milestone >= 250) return "Knowledge overload";
  if (milestone >= 100) return "Triple digits";
  if (milestone >= 50) return "Half century";
  if (milestone >= 25) return "Getting serious";
  return "First steps";
}

export function AchievementToast({ milestone, onDismiss }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    // Fire confetti
    confetti({
      particleCount: milestone >= 100 ? 120 : 60,
      spread: 70,
      origin: { y: 0.3 },
      colors: ["#1d9bf0", "#ffff55", "#55ff55", "#f43f5e", "#a855f7"],
      disableForReducedMotion: true,
    });

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss, milestone]);

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div
        className="flex items-center gap-3 rounded px-5 py-3 shadow-2xl border-2"
        style={{
          background: "#1a1a1a",
          borderColor: "#4a4a4a",
          imageRendering: "pixelated",
        }}
      >
        {/* Pixelated star */}
        <div
          className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 text-lg"
          style={{ background: "#2d8a2d", color: "#55ff55", imageRendering: "pixelated" }}
        >
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" style={{ imageRendering: "pixelated" }}>
            <rect x="7" y="0" width="2" height="2" />
            <rect x="5" y="2" width="2" height="2" />
            <rect x="9" y="2" width="2" height="2" />
            <rect x="0" y="4" width="6" height="2" />
            <rect x="10" y="4" width="6" height="2" />
            <rect x="0" y="6" width="16" height="2" />
            <rect x="2" y="8" width="12" height="2" />
            <rect x="2" y="10" width="4" height="2" />
            <rect x="10" y="10" width="4" height="2" />
            <rect x="2" y="12" width="2" height="2" />
            <rect x="12" y="12" width="2" height="2" />
          </svg>
        </div>
        <div>
          <p
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "#ffff55", fontFamily: "monospace" }}
          >
            Achievement Unlocked!
          </p>
          <p
            className="text-[12px] mt-0.5 text-white"
            style={{ fontFamily: "monospace" }}
          >
            {getMessage(milestone)} [{milestone} concepts]
          </p>
        </div>
      </div>
    </div>
  );
}
