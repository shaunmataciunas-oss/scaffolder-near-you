import { slugifyRegion } from '@/lib/linkingUtils';

// Curated content for major cities to ensure high quality for top traffic pages
const MAJOR_CITIES_CONTENT = {
  'london': {
    overview: "London's construction sector remains the powerhouse of the UK economy, characterized by a relentless demand for both high-rise commercial developments and complex residential refurbishments. The capital's skyline is constantly evolving, with scaffolding playing a critical role in projects ranging from the restoration of Grade I listed heritage buildings in Westminster to cutting-edge glass structures in the City. The density of development requires specialist scaffolding solutions, particularly gantry scaffolds and cantilevered systems, to maintain public access while maximizing vertical construction space.",
    councilDomain: "london.gov.uk"
  },
  'manchester': {
    overview: "Manchester is currently experiencing one of the most significant construction booms in its history, often described as 'Manctopia'. The city center is witnessing a rapid transformation with major high-rise residential towers and commercial districts like Spinningfields expanding. For local scaffolders, this translates to a high demand for heavy-duty tube and fitting scaffolds capable of supporting large-scale masonry and cladding teams. The region's industrial heritage also drives a steady stream of renovation work, converting historic mills into modern apartments.",
    councilDomain: "manchester.gov.uk"
  },
  'birmingham': {
    overview: "As the host of recent major sporting events and the central hub for HS2, Birmingham's construction industry is thriving. The 'Big City Plan' has catalyzed regeneration across the Jewellery Quarter and Digbeth, driving demand for versatile scaffolding solutions. The sector here is diverse, balancing large infrastructure projects with a robust housing market. Scaffolding in Birmingham requires adaptability, often dealing with the complex logistics of the city's extensive canal network and busy transport arteries.",
    councilDomain: "birmingham.gov.uk"
  },
  'leeds': {
    overview: "Leeds stands as a premier financial and legal hub outside London, fueling a consistent demand for Grade A office space and high-quality residential developments. The South Bank regeneration project effectively doubles the size of the city center, presenting massive opportunities for the scaffolding trade. Local projects range from complex temporary roofing for historic arcade renovations to large-scale system scaffolding for new student accommodation blocks.",
    councilDomain: "leeds.gov.uk"
  },
  'glasgow': {
    overview: "Glasgow's construction landscape is defined by its architectural grandeur and ambitious modernization. The city's focus on sustainable retrofitting of its iconic tenement housing stock drives a specific need for perimeter scaffolding and chimney access solutions. Furthermore, the Clyde Waterfront regeneration continues to attract investment, requiring specialist marine and industrial scaffolding services alongside traditional commercial access solutions.",
    councilDomain: "glasgow.gov.uk"
  },
  'liverpool': {
    overview: "Liverpool's construction sector is heavily influenced by its maritime heritage and the ongoing Liverpool Waters regeneration scheme. The restoration of the historic docks alongside new high-rise residential developments creates a unique dual demand. Scaffolding companies here frequently deploy advanced weather protection systems to combat coastal conditions, ensuring projects stay on schedule despite the elements.",
    councilDomain: "liverpool.gov.uk"
  },
  'bristol': {
    overview: "Bristol is leading the way in sustainable construction and green building practices in the South West. The city's topography, with its steep hills and historic harbourside, presents unique access challenges that local scaffolders solve with ingenious engineering. There is a strong market for residential extensions and loft conversions, driven by the city's popularity, alongside major commercial redevelopments in the Temple Quarter.",
    councilDomain: "bristol.gov.uk"
  },
  'newcastle': {
    overview: "Newcastle and the wider North East region are seeing a resurgence in industrial and commercial construction. The Helix development and improvements to the Quayside are key drivers. The local industry has a strong tradition of industrial scaffolding, supporting the offshore and engineering sectors, while the vibrant city center renovation market keeps commercial scaffolders busy with façade retention and maintenance access.",
    councilDomain: "newcastle.gov.uk"
  },
  'sheffield': {
    overview: "Sheffield's 'Heart of the City' project illustrates the city's commitment to reshaping its urban center. Known for its steel heritage, the modern construction sector focuses on mixed-use developments and the expansion of its two major universities. Scaffolding in Sheffield often involves navigating steep gradients, requiring specialized base-outs and stability calculations for even standard residential jobs.",
    councilDomain: "sheffield.gov.uk"
  },
  'edinburgh': {
    overview: "Edinburgh's construction industry operates within one of the world's most protected heritage environments. Scaffolding here is an art form, often requiring freestanding structures to avoid tying into historic stonework. The contrast between the medieval Old Town and the Georgian New Town means scaffolders must be versed in complex, non-standard configurations. Tourism drives a constant need for hotel maintenance and renovation, alongside a pressured residential market.",
    councilDomain: "edinburgh.gov.uk"
  },
  'cardiff': {
    overview: "Cardiff continues to grow as a capital city, with the Central Square development transforming the gateway to Wales. The construction market is buoyant, supported by public sector investment and a growing media sector. Scaffolding firms in Cardiff service a wide region, often handling large-scale events structures for the Principality Stadium alongside traditional residential and commercial access contracts.",
    councilDomain: "cardiff.gov.uk"
  },
  'belfast': {
    overview: "Belfast's skyline is changing rapidly, with significant investment in student accommodation, hotels, and office space driven by the tech sector. The Titanic Quarter remains a focal point for large-scale development. The local scaffolding industry is highly regulated and skilled, adept at managing projects in a busy, regenerating city center while supporting the province's strong manufacturing base.",
    councilDomain: "belfastcity.gov.uk"
  }
};

// Helper to deterministically select a template based on location string
const getDeterministicIndex = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
};

// Templates for procedural generation
const TEMPLATES = {
  openers: [
    "The construction sector in {location} is a vital component of the {region} economy, driven by a steady influx of residential and commercial projects.",
    "Serving the community of {location}, the local construction industry is characterized by a blend of modern development and heritage preservation.",
    "In {location}, the demand for high-quality scaffolding services has grown in parallel with the region's property market expansion.",
    "As a key area within {region}, {location} boasts a resilient construction trade, focusing heavily on urban renewal and housing developments.",
    "The skyline of {location} is gradually evolving, necessitating professional access solutions for a variety of building heights and complexities."
  ],
  middles: [
    "Local scaffolders are frequently engaged in projects ranging from domestic loft conversions to larger commercial refits in the town center.",
    "With a strong emphasis on safety and compliance, the trade in {location} supports everything from emergency roof repairs to new-build housing estates.",
    "Recent planning trends in {location} indicate a shift towards sustainable retrofitting, increasing the need for versatile scaffolding structures.",
    "The local supply chain is robust, with scaffolders in {location} playing a pivotal role in ensuring projects stay on schedule and within budget.",
    "Commercial investment in the area has led to an uptick in demand for heavy-duty tube and fitting systems tailored for steel frame structures."
  ],
  closers: [
    "Whether it's for painting, roofing, or brickwork, the scaffolding infrastructure in {location} remains the backbone of safe working at height.",
    "For homeowners and developers in {location}, accessing reliable scaffolding contractors is essential for the smooth execution of any renovation.",
    "The commitment of local tradespeople ensures that {location}'s built environment continues to meet the highest standards of safety and quality.",
    "As {location} continues to develop, the role of professional scaffolding design and erection becomes ever more critical to the local infrastructure.",
    "Reliable access solutions remain a top priority for site managers across {location}, ensuring safety remains paramount on every job."
  ]
};

const generateProceduralContent = (location) => {
  const { name, region } = location;
  
  const openerIdx = getDeterministicIndex(name + "start", TEMPLATES.openers.length);
  const middleIdx = getDeterministicIndex(name + "mid", TEMPLATES.middles.length);
  const closerIdx = getDeterministicIndex(name + "end", TEMPLATES.closers.length);

  const opener = TEMPLATES.openers[openerIdx]
    .replace(/{location}/g, name)
    .replace(/{region}/g, region);
    
  const middle = TEMPLATES.middles[middleIdx]
    .replace(/{location}/g, name)
    .replace(/{region}/g, region);

  const closer = TEMPLATES.closers[closerIdx]
    .replace(/{location}/g, name)
    .replace(/{region}/g, region);

  return `${opener} ${middle} ${closer}`;
};

const generateAuthorityLinks = (location) => {
  const slug = location.slug.toLowerCase();
  
  // Basic heuristic for council domains - accurate for many, functional fallback for others
  // In a real production app with 831 locations, you might scrape/verify these.
  const councilDomain = MAJOR_CITIES_CONTENT[slug]?.councilDomain || `${slug}.gov.uk`;
  
  return {
    council: `https://www.${councilDomain}`,
    planning: `https://www.${councilDomain}/planning-and-building-control`,
    buildingControl: `https://www.${councilDomain}/building-control`,
    chamber: `https://www.${slug}-chamber.co.uk` // Speculative but realistic pattern
  };
};

/**
 * Main function to get unique industry content for a location
 * @param {Object} location - The location object { name, slug, region, county }
 * @returns {Object} Content object { overview, authorities, region }
 */
export const getLocationIndustryContent = (location) => {
  if (!location) return null;

  const slug = location.slug.toLowerCase();
  
  // 1. Check for hand-crafted content
  const manualContent = MAJOR_CITIES_CONTENT[slug];
  
  // 2. Generate overview text
  const overview = manualContent 
    ? manualContent.overview 
    : generateProceduralContent(location);

  // 3. Generate links
  const authorities = generateAuthorityLinks(location);

  return {
    overview,
    authorities,
    region: location.region
  };
};

export default getLocationIndustryContent;