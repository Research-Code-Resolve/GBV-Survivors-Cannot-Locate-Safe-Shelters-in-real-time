import React, { useState } from "react";
import { Shield, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const EXIT_URL = "https://www.weather.com";

export default function Header() {
  const [isExiting, setIsExiting] = useState(false);
  const { t } = useTranslation();

  function handleExitClick() {
    setIsExiting(true);
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace(EXIT_URL);
  }

  if (isExiting) {
    return <div className="fixed inset-0 bg-black z-9999" />;
  }

  return (
    <header
      style={{ background: "var(--card)" }}
      className="sticky top-0 z-40 border-b border-black/5 shadow-sm"
    >
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            style={{ background: "var(--primary)" }}
            className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center"
          >
            <Shield
              className="h-5 w-5 text-white"
              strokeWidth={2.5}
            />
          </div>

          <span
            className="font-display font-semibold text-[1.05rem] truncate"
            style={{ color: "var(--primary-dark)" }}
          >
            Safe Haven Malawi
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />

          <button
            onClick={handleExitClick}
            className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 py-2 rounded-md hover:opacity-90 active:scale-95 transition"
            style={{ background: "var(--error)" }}
            aria-label={t("header.quickExit")}
          >
            <X className="h-4 w-4" strokeWidth={3} />

            <span className="hidden sm:inline">
              {t("header.quickExit")}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}