import { locations, getParentLocation, getSubLocations } from '@/data/locations';

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(1)); // Return rounded to 1 decimal place
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Returns the nearest locations to a specific point.
 */
export const getNearestLocations = (targetLocation, allLocations, count = 5) => {
  if (!targetLocation || !allLocations) return [];

  return allLocations
    .filter(loc => loc.id !== targetLocation.id) // Exclude self
    .map(loc => ({
      ...loc,
      distance: calculateDistance(
        targetLocation.latitude,
        targetLocation.longitude,
        loc.latitude,
        loc.longitude
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
};

/**
 * Returns random locations excluding the nearest ones.
 * Enhanced to prefer parent locations for "related" links to improve site structure.
 */
export const getRandomLocations = (targetLocation, allLocations, count = 8, excludeNearest = true) => {
  if (!targetLocation || !allLocations) return [];

  // Filter to prefer main locations (no parentSlug) to avoid linking deep to other sub-pages randomly
  let candidates = allLocations.filter(loc => loc.id !== targetLocation.id && !loc.parentSlug);

  if (excludeNearest) {
    const withDistances = candidates.map(loc => ({
      ...loc,
      distance: calculateDistance(
        targetLocation.latitude,
        targetLocation.longitude,
        loc.latitude,
        loc.longitude
      )
    })).sort((a, b) => a.distance - b.distance);

    const threshold = Math.min(10, Math.floor(candidates.length / 4));
    candidates = withDistances.slice(threshold);
  }

  // Fisher-Yates shuffle
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return candidates.slice(0, count);
};

export const getLocationsByRegion = (region, allLocations) => {
  if (!region || !allLocations) return [];
  return allLocations.filter(loc => loc.region.toLowerCase() === region.toLowerCase());
};

export const getAllRegions = (allLocations) => {
  const regions = new Set(allLocations.map(loc => loc.region));
  return Array.from(regions).sort();
};

export const slugifyRegion = (regionName) => {
  return regionName.toLowerCase().replace(/\s+/g, '-');
};

export const deslugifyRegion = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// --- NEW HIERARCHY HELPERS ---

/**
 * Generates breadcrumb items for a location, handling hierarchy.
 */
export const getLocationBreadcrumb = (location) => {
  const items = [{ label: 'Locations', href: '/locations' }];
  
  if (location.parentSlug) {
    const parent = getParentLocation(location.slug);
    if (parent) {
      items.push({ label: parent.name, href: `/locations/${parent.slug}` });
    }
  }
  
  items.push({ label: location.name });
  return items;
};

/**
 * Organizes a flat list of locations into a hierarchical structure by region > parent > child.
 */
export const formatLocationHierarchy = (allLocations) => {
  const hierarchy = {};

  // 1. Initialize regions
  allLocations.forEach(loc => {
    if (!hierarchy[loc.region]) {
      hierarchy[loc.region] = [];
    }
  });

  // 2. Add main locations (parents or orphans)
  allLocations.filter(l => !l.parentSlug).forEach(parent => {
    hierarchy[parent.region].push({
      ...parent,
      children: getSubLocations(parent.slug) || []
    });
  });

  return hierarchy;
};