import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Scaffolders Near You",
    "url": SITE_URL,
    "logo": "https://scaffoldersnearyou.co.uk/favicon.svg",
    "description": "Professional scaffolding services connecting you with trusted local scaffolders across the UK.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-7749-309-223",
      "contactType": "customer service",
      "areaServed": "GB",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.linkedin.com/in/scaffolders-near-you",
      "https://www.facebook.com/profile.php?id=61565657128286",
      "https://x.com/scaffoldingmcr",
      "https://www.instagram.com/scaffoldersnearyou",
      "https://www.youtube.com/@Scaffoldersnearyou"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "34 Hazelwood Road",
      "addressLocality": "Bolton",
      "postalCode": "BL1 6ER",
      "addressCountry": "UK"
    }
  };
};

export const generateLocalBusinessSchema = (locationName, address, phone = "07749 309 223", region) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Scaffolders Near You - ${locationName}`,
    "image": DEFAULT_IMAGE,
    "url": `${SITE_URL}/locations/${locationName.toLowerCase().replace(/\s+/g, '-')}`,
    "telephone": phone,
    "address": address || {
      "@type": "PostalAddress",
      "addressLocality": locationName,
      "addressRegion": region,
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.5765, // Default fallback, should be overridden by actual coords
      "longitude": -2.4289
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
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "££"
  };
};