import { locations } from '@/data/locations';
import { SITE_URL } from '@/lib/seoHelpers';

const MAJOR_CITIES = [
  'London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow', 'Liverpool', 
  'Newcastle', 'Sheffield', 'Bristol', 'Nottingham', 'Leicester', 'Edinburgh', 
  'Cardiff', 'Belfast', 'Coventry', 'Bradford', 'Hull', 'Stoke-on-Trent', 
  'Wolverhampton', 'Plymouth', 'Southampton', 'Portsmouth', 'Sunderland', 
  'Durham', 'York', 'Bath'
];

export const categorizeCitiesAndTowns = () => {
  const cities = [];
  const towns = [];

  // Filter only top-level parents
  const parents = locations.filter(loc => !loc.parentSlug);

  parents.forEach(parent => {
    // Check if it's a major city
    if (MAJOR_CITIES.includes(parent.name)) {
      cities.push(parent);
    } else {
      towns.push(parent);
    }
  });

  return { cities, towns };
};

export const getSitemapSlug = (location, type) => {
  return `sitemap-${type}-${location.slug}.xml`;
};

export const calculateSitemapStats = (sitemaps) => {
  return sitemaps.reduce((acc, map) => {
    acc.totalUrls += map.urlCount || 0;
    acc.count += 1;
    return acc;
  }, { totalUrls: 0, count: 0 });
};

// Returns sub-locations for a given parent slug
export const getSubLocationUrls = (parentSlug) => {
  const subs = locations.filter(loc => loc.parentSlug === parentSlug);
  return subs.map(sub => ({
    loc: `${SITE_URL}/locations/${sub.slug}`,
    priority: '0.6',
    changefreq: 'monthly'
  }));
};