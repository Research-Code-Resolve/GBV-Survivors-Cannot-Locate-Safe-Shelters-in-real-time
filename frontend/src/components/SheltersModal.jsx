import { useState } from "react";
import { X, Phone, MapPin, Clock, AlertCircle } from "lucide-react";
import {
  getNearestShelters,
  formatPhone,
  isShelterOpen,
} from "../lib/shelterHelper";
import sheltersData from "../data/shelters.json";

export default function SheltersModal({ isOpen, onClose, district }) {
  const [shelters, setShelters] = useState([]);
  const [searched, setSearched] = useState(false);
  const [inputDistrict, setInputDistrict] = useState(district || "");

  const handleSearch = () => {
    if (!inputDistrict.trim()) return;
    const nearest = getNearestShelters(inputDistrict, sheltersData.shelters);
    setShelters(nearest);
    setSearched(true);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (lat, lng) => {
    const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
    window.open(mapsUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        style={{ background: "#FFFFFF" }}
        className="w-full max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{ background: "#6A1B9A" }}
          className="sticky top-0 flex items-center justify-between p-5 text-white"
        >
          <h2 className="font-['Lexend'] text-lg font-bold">
            Nearby Safe Shelters
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Search Input */}
          {!searched && (
            <div className="space-y-3">
              <p style={{ color: "#333333" }} className="text-sm">
                Enter your current district to find nearby shelters:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Lilongwe City Centre, Kauma, Area 36"
                  value={inputDistrict}
                  onChange={(e) => setInputDistrict(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": "#6A1B9A" }}
                />
                <button
                  onClick={handleSearch}
                  style={{ background: "#6A1B9A" }}
                  className="text-white px-4 rounded-xl font-semibold text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {searched && (
            <>
              <button
                onClick={() => setSearched(false)}
                style={{ color: "#6A1B9A" }}
                className="text-sm font-semibold"
              >
                ← Change district
              </button>

              {shelters.length === 0 ? (
                <p
                  style={{ color: "#333333" }}
                  className="text-sm text-center py-8"
                >
                  No shelters found. Please try a different district.
                </p>
              ) : (
                <ul className="space-y-3">
                  {shelters.map((shelter) => (
                    <li
                      key={shelter.id}
                      style={{ background: "#F9F5FF" }}
                      className="rounded-xl p-4 space-y-3"
                    >
                      {/* Shelter Name & Distance */}
                      <div>
                        <h3
                          style={{ color: "#4A1268" }}
                          className="font-semibold text-sm"
                        >
                          {shelter.name}
                        </h3>
                        <p
                          style={{ color: "#6b7280" }}
                          className="text-xs mt-0.5"
                        >
                          {shelter.distanceKm.toFixed(1)} km away •{" "}
                          {shelter.estimatedTime}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="flex gap-2 items-start">
                        <MapPin
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: "#6A1B9A" }}
                        />
                        <p style={{ color: "#333333" }} className="text-xs">
                          {shelter.address}
                        </p>
                      </div>

                      {/* Operating Hours */}
                      <div className="flex gap-2 items-start">
                        <Clock
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: "#6A1B9A" }}
                        />
                        <p style={{ color: "#333333" }} className="text-xs">
                          {shelter.operatingHours}
                        </p>
                      </div>

                      {/* Services */}
                      <div>
                        <p
                          style={{ color: "#6b7280" }}
                          className="text-xs font-medium mb-1.5"
                        >
                          Services:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {shelter.services.map((service, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: "#EDE7F6",
                                color: "#4A1268",
                              }}
                              className="text-xs px-2 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleCall(shelter.phone)}
                          style={{ background: "#2E7D32" }}
                          className="flex-1 text-white px-3 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
                        >
                          <Phone className="h-4 w-4" />
                          Call Now
                        </button>
                        <button
                          onClick={() =>
                            handleGetDirections(
                              shelter.coordinates.lat,
                              shelter.coordinates.lng,
                            )
                          }
                          style={{ background: "#6A1B9A" }}
                          className="flex-1 text-white px-3 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
                        >
                          <MapPin className="h-4 w-4" />
                          Directions
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Safety Note */}
          <div
            style={{ background: "#FEF2F2", borderLeft: "4px solid #D32F2F" }}
            className="p-3 rounded text-xs"
          >
            <p style={{ color: "#333333" }}>
              <strong>Safety note:</strong> Only contact shelters you feel
              comfortable with. If you're in immediate danger, call emergency
              services or a trusted person.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
