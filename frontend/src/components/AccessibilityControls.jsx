import React from "react";
import { Type, Contrast } from "lucide-react";

export default function AccessibilityControls({
  textScale,
  onCycleTextScale,
  highContrast,
  onToggleContrast,
}) {
  const scaleLabel = textScale === 1 ? "Normal" : textScale === 1.15 ? "Large" : "X-Large";

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={onCycleTextScale}
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        <Type className="h-3.5 w-3.5" />
        Text size: {scaleLabel}
      </button>
      <button
        onClick={onToggleContrast}
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        <Contrast className="h-3.5 w-3.5" />
        High contrast: {highContrast ? "On" : "Off"}
      </button>
    </div>
  );
}
