import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HistoryHelp() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="border-t border-white/10 pt-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium hover:text-white transition"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />

        {t("historyHelp.title")}
      </button>

      {open && (
        <div className="mt-3 text-sm text-white/70 leading-relaxed bg-white/5 rounded-lg p-4 space-y-2">
          <p>
            <span className="font-semibold text-white/90">
              {t("historyHelp.chrome")}
            </span>{" "}
            {t("historyHelp.chromeInstructions")}
          </p>

          <p>
            <span className="font-semibold text-white/90">
              {t("historyHelp.safari")}
            </span>{" "}
            {t("historyHelp.safariInstructions")}
          </p>

          <p className="text-white/60 text-xs pt-1">
            {t("historyHelp.safetyNote")}
          </p>
        </div>
      )}
    </div>
  );
}