import React from "react";
import { Type, Contrast } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AccessibilityControls({
  textScale,
  onCycleTextScale,
  highContrast,
  onToggleContrast,
}) {
  const { t } = useTranslation();

  const scaleLabel =
    textScale === 1
      ? t("accessibility.normal")
      : textScale === 1.15
      ? t("accessibility.large")
      : t("accessibility.xLarge");

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={onCycleTextScale}
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        <Type className="h-3.5 w-3.5" />

        {t("accessibility.textSize")}: {scaleLabel}
      </button>

      <button
        onClick={onToggleContrast}
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        <Contrast className="h-3.5 w-3.5" />

        {t("accessibility.highContrast")}:{" "}
        {highContrast
          ? t("accessibility.on")
          : t("accessibility.off")}
      </button>
    </div>
  );
}