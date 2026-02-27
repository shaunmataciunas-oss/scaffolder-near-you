export const SITE_URL = 'https://scaffoldersnearyou.co.uk';
export const SITE_NAME = 'Scaffolders Near You';
export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1568151769173-e7784208c098';

/**
 * Truncates text to a specified length ensuring it doesn't cut words in half if possible.
 */
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};

/**
 * Generates standardized LocalBusiness Schema.org JSON-LD
 */
export const generateLocalBusinessSchema = ({
  name = SITE_NAME,
  description = "Professional scaffolding services in Greater Manchester.",
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  telephone = "07749 309 223",
  address = {
    streetAddress: "34 Hazelwood Road",
    addressLocality: "Bolton",
    postalCode: "BL1 6ER",
    addressCountry: "UK"
  },
  geo = {
    latitude: 53.5765,
    longitude: -2.4289
  },
  priceRange = "££",
  areaServed = ["Bolton", "Greater Manchester"]
} = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "image": image,
    "description": description,
    "telephone": telephone,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "priceRange": priceRange
  };
};

/**
 * Generates Service Schema.org JSON-LD
 */
export const generateServiceSchema = (serviceName, description, providerName = SITE_NAME) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": providerName
    }
  };
};

/**
 * Generates location-specific meta tags
 */
export const generateLocationMeta = (locationName) => {
  const title = `${locationName} Scaffolding Hire | ${SITE_NAME}`;
  const description = `Professional scaffolding hire in ${locationName}. Get reliable local scaffolders, competitive rates, and free quotes. Serving ${locationName} and surrounding areas.`;
  
  return {
    title: truncateText(title, 60),
    description: truncateText(description, 160)
  };
};