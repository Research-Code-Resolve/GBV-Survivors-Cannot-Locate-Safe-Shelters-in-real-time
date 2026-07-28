import React, { useState, useEffect } from "react";
import "../index.css";

import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import EmergencyContacts from "../components/EmergencyContacts";
import RightsSection from "../components/RightsSection";
import TrustedPartners from "../components/TrustedPartners";
import Footer from "../components/Footer";

export default function LandingPage() {
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState(1); // 1 = normal, 1.15 = large, 1.3 = x-large
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const cycleTextScale = () => {
    setTextScale((s) => (s === 1 ? 1.15 : s === 1.15 ? 1.3 : 1));
  };

  const vars = {
    "--primary": "#6A1B9A",
    "--primary-dark": "#4A1268",
    "--secondary": "#EDE7F6",
    "--accent": "#00897B",
    "--bg": highContrast ? "#FFFFFF" : "#FAFAFA",
    "--card": "#FFFFFF",
    "--text": highContrast ? "#000000" : "#333333",
    "--success": "#2E7D32",
    "--error": "#D32F2F",
  };

  return (
    <div
      style={{ ...vars, fontSize: `${textScale * 100}%` }}
      className={`min-h-screen w-full font-sans antialiased ${highContrast ? "contrast-mode" : ""}`}
    >
      {isLoading && <LoadingScreen />}

      <div
        style={{ background: "var(--bg)", color: "var(--text)" }}
        className="min-h-screen"
      >
        <Header />

        <main>
          <Hero />
          <ServicesGrid />
          <EmergencyContacts />
          <RightsSection />
          <TrustedPartners />
        </main>

        <Footer
          textScale={textScale}
          onCycleTextScale={cycleTextScale}
          highContrast={highContrast}
          onToggleContrast={() => setHighContrast((high) => !high)}
        />
      </div>
    </div>
  );
}
