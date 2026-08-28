// District center coordinates for Lilongwe
// Used to estimate distance when survivor types their district
const DISTRICT_COORDS = {
  "lilongwe city centre": { lat: -13.9834, lng: 33.7738 },
  "city centre": { lat: -13.9834, lng: 33.7738 },
  "kauma": { lat: -13.9920, lng: 33.7900 },
  "bwaila": { lat: -14.0050, lng: 33.7850 },
  "area 36": { lat: -14.0180, lng: 33.8050 },
  "area 3": { lat: -14.0100, lng: 33.7500 },
  "area 4": { lat: -14.0200, lng: 33.7600 },
  "chilomoni": { lat: -14.0300, lng: 33.8200 },
  "kamphoro": { lat: -13.9600, lng: 33.7400 },
  "lilongwe": { lat: -13.9834, lng: 33.7738 },
};

// Haversine formula: calculate distance between two lat/lng points
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimate travel time based on distance
// In Lilongwe, typical speed: taxi/car ~30-40 km/h in city, walking ~5 km/h
function estimateTravelTime(distanceKm) {
  // Conservative estimate: assume mix of walking and transport
  const avgSpeed = 10; // km/h (accounting for traffic, accessibility)
  const timeHours = distanceKm / avgSpeed;
  const minutes = Math.round(timeHours * 60);

  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return `${hours}h ${remainingMins}m`;
}

// Get nearby shelters sorted by distance
export function getNearestShelters(userDistrict, shelters) {
  const userCoords = DISTRICT_COORDS[userDistrict.toLowerCase()];

  if (!userCoords) {
    // If district not found, return all shelters sorted by random proximity
    return shelters.map((shelter) => ({
      ...shelter,
      distanceKm: Math.random() * 15 + 2, // 2-17 km random
      estimatedTime: "15-30 min",
    }));
  }

  // Calculate distance to each shelter
  return shelters
    .map((shelter) => {
      const distanceKm = haversineDistance(
        userCoords.lat,
        userCoords.lng,
        shelter.coordinates.lat,
        shelter.coordinates.lng
      );

      return {
        ...shelter,
        distanceKm: parseFloat(distanceKm.toFixed(1)),
        estimatedTime: estimateTravelTime(distanceKm),
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm); // Closest first
}

// Format phone number for display
export function formatPhone(phone) {
  return phone; // Already formatted in JSON
}

// Check if shelter is currently open (basic check)
export function isShelterOpen(operatingHours) {
  if (operatingHours === "24/7") return true;
  // For demo, assume all others are open
  // In production, check actual hours against current time
  return true;
}
