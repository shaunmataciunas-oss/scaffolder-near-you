import React, { useEffect, Suspense, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Home, Building2, Wrench, ShieldCheck, ArrowRight, Loader2, Navigation, Layers, ChevronDown, CheckCircle2, Hammer, Map, ClipboardCheck } from 'lucide-react';
import { locations, getLocationBySlug, getSubLocations, getParentLocation, getSiblingLocations } from '@/data/locations';
import { getLocationIndustryContent } from '@/data/locationIndustryContent';
import { getPopulationStatistics } from '@/data/populationStatistics';
import { getNearestLocations, getRandomLocations, slugifyRegion, getLocationBreadcrumb } from '@/lib/linkingUtils';
import { generateLocalBusinessSchema } from '@/lib/schemaHelpers';
import QuickQuoteForm from '@/components/QuickQuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import LocalConstructionIndustry from '@/components/LocalConstructionIndustry';
import RegionalConstructionStatistics from '@/components/RegionalConstructionStatistics';
import PopulationDemographics from '@/components/PopulationDemographics';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { SITE_URL } from '@/lib/seoHelpers';
import { useAnalytics } from '@/hooks/useAnalytics';
import { supabase } from '@/lib/customSupabaseClient';
import { format } from 'date-fns';

// Lazy load the map component
const LocationMap = React.lazy(() => import('@/components/LocationMap'));

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:text-brand-yellow transition-colors"
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LocationPage = () => {
  const { slug } = useParams();
  const location = getLocationBySlug(slug);
  const { trackEvent } = useAnalytics();
  const [lastAuditDate, setLastAuditDate] = useState(null);

  // Parent/Sibling Logic
  const parentLocation = useMemo(() => location ? getParentLocation(location.slug) : null, [location]);
  const subLocations = useMemo(() => location ? getSubLocations(location.slug) : [], [location]);
  const siblingLocations = useMemo(() => location ? getSiblingLocations(location.slug) : [], [location]);

  // Memoize linking calculations
  const nearestLocations = useMemo(() => 
    location ? getNearestLocations(location, locations, 4) : [], 
  [location]);

  const relatedLocations = useMemo(() => 
    location ? getRandomLocations(location, locations, 8, true) : [], 
  [location]);

  const industryContent = useMemo(() => 
    location ? getLocationIndustryContent(location) : null,
  [location]);

  const populationData = useMemo(() =>
    location ? getPopulationStatistics(location.populationDataId || location.slug) : null,
  [location]);

  const breadcrumbs = useMemo(() => 
    location ? getLocationBreadcrumb(location) : [], 
  [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location) {
      trackEvent('view_location_page', {
        location_name: location.name,
        region: location.region
      });
      fetchAuditDate();
    }
  }, [slug, location]);

  const fetchAuditDate = async () => {
    // In a real scenario, you'd match by location_slug. 
    // Here we just fetch the latest log for demo purposes or matching slug if available.
    const { data } = await supabase
      .from('maintenance_tasks')
      .select('last_completed')
      .eq('location_slug', slug)
      .not('last_completed', 'is', null)
      .order('last_completed', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setLastAuditDate(data[0].last_completed);
    }
  };

  if (!location) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Location Not Found</h1>
        <p className="text-gray-400 mb-8">Sorry, we couldn't find the location you're looking for.</p>
        <div className="flex gap-4">
            <Button asChild className="bg-brand-yellow text-brand-black font-bold hover:bg-brand-yellow/90">
                <Link to="/locations">Browse Locations</Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Link to="/">Return Home</Link>
            </Button>
        </div>
      </div>
    );
  }

  // Generate SEO Data
  const isSubLocation = !!location.parentSlug;
  const pageTitle = isSubLocation 
    ? `${location.name} Scaffolders - Local Scaffolding Services & Database in ${location.county}`
    : `${location.name} Scaffolders - Local Scaffolding Services & Database`;
    
  const metaDescription = `Find professional scaffolders in ${location.name}. Browse verified scaffolding services, get quotes, or list your scaffolding business. Serving residential and commercial projects in ${location.region}.`;

  const canonicalUrl = `${SITE_URL}/locations/${slug}`;
  
  const schemaData = generateLocalBusinessSchema(
    location.name,
    {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": location.region,
      "addressCountry": "UK"
    },
    "07749 309 223",
    location.region
  );

  if (location.latitude && location.longitude) {
    schemaData.geo = {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    };
  }

  const services = [
    { icon: Home, title: "Residential Scaffolding", desc: "Extensions, roofing, and renovations" },
    { icon: Building2, title: "Commercial Projects", desc: "Office blocks, retail, and public buildings" },
    { icon: Wrench, title: "Temporary Roofs", desc: "Weather protection for ongoing works" },
    { icon: ShieldCheck, title: "Safety Inspections", desc: "Weekly checks and safety compliance" }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`scaffolders ${location.name}, scaffolding ${location.name}, scaffolding services ${location.name}, ${location.name} scaffolding companies, residential scaffolding ${location.name}, commercial scaffolding ${location.name}`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-brand-black overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt={`Scaffolding services in ${location.name}`}
            className="w-full h-full object-cover opacity-30"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8">
            <Breadcrumb items={breadcrumbs} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" />
              Serving {location.name}, {parentLocation ? parentLocation.name : location.county}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-montserrat tracking-tight leading-tight">
              {isSubLocation ? (
                 <>
                   Serving <span className="text-brand-yellow">{location.name}</span> <br/>
                   in {parentLocation?.name || location.county}
                 </>
              ) : (
                 <>
                    Scaffolding Services in <br />
                    <span className="text-brand-yellow">{location.name}</span>
                 </>
              )}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Professional, reliable, and affordable scaffolding solutions. We are your local experts for all residential and commercial projects in {location.name} and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-yellow text-brand-black hover:bg-white font-bold h-14 text-lg px-8" asChild>
                <a href="#quote">Get Free Quote</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-black font-bold h-14 text-lg px-8" asChild>
                <Link to="/shop">
                  Browse Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUB-LOCATION SPECIFIC: Parent Link */}
      {isSubLocation && parentLocation && (
        <section className="bg-brand-secondary py-6 border-b border-gray-800">
           <div className="container mx-auto px-4 flex items-center gap-3 text-white">
              <ArrowRight className="w-5 h-5 text-brand-yellow rotate-180" />
              <span>
                 Part of our wider coverage in {parentLocation.name}. 
                 <Link to={`/locations/${parentLocation.slug}`} className="ml-2 text-brand-yellow hover:underline font-bold">
                    View main {parentLocation.name} page
                 </Link>
              </span>
           </div>
        </section>
      )}

      {/* Audit Status / Admin Link */}
      <section className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 py-3">
         <div className="container mx-auto px-4 flex justify-between items-center text-xs text-gray-400">
            <div className="flex items-center gap-2">
               <ClipboardCheck className="w-4 h-4" />
               <span>
                  Last Site Audit: {lastAuditDate ? format(new Date(lastAuditDate), 'MMM d, yyyy') : 'Pending'}
               </span>
            </div>
            <Link to="/maintenance" className="hover:text-brand-yellow transition-colors">Admin Login</Link>
         </div>
      </section>

      {/* Nearest Scaffolders Section */}
      <section className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-5 h-5 text-brand-yellow" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Nearest Scaffolding Branches</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nearestLocations.map(loc => (
                    <Link 
                        key={loc.id} 
                        to={`/locations/${loc.slug}`}
                        className="flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-brand-yellow/10 transition-colors group"
                    >
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand-yellow">Scaffolders in {loc.name}</span>
                        <span className="text-xs text-gray-400">{loc.distance}km away</span>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Local Industry Content Section */}
      <LocalConstructionIndustry content={industryContent} locationName={location.name} />
      
      {/* Regional Statistics Section */}
      <RegionalConstructionStatistics regionName={location.region} />

      {/* Population Demographics Section */}
      <PopulationDemographics data={populationData} locationName={location.name} />

      {/* NEW SECTIONS ADDED HERE */}
      <ProjectsSection locationSlug={location.slug} locationName={location.name} />
      
      <TestimonialsSection locationSlug={location.slug} locationName={location.name} />

      {/* Content continues... Same as before */}
      <div className="bg-gray-50 dark:bg-zinc-900 py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Introduction */}
              <section className="bg-white dark:bg-black p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white">
                  Local Scaffolding Company in {location.name}
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p className="text-lg leading-relaxed mb-4">
                    Looking for reliable scaffolders in {location.name}? We provide high-quality scaffolding services tailored to the specific needs of properties in {location.name} and across {location.region}.
                  </p>
                  <p className="mb-4">
                    Whether you are planning a small home renovation, roofing repairs, or a large-scale commercial construction project, our NASC-certified team ensures safety and efficiency.
                  </p>
                  <p className="mb-6">
                    We offer competitive rates for both short and long-term hire. From traditional tube and fitting scaffolds to modern system scaffolding, we have the equipment to handle any job in {location.name}.
                  </p>

                  <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow rounded-r-lg">
                      <p className="font-bold text-gray-800 dark:text-white mb-2">Service Area Coverage</p>
                      <Link 
                        to={`/region/${slugifyRegion(location.region)}`} 
                        className="inline-flex items-center text-brand-black dark:text-white font-bold hover:text-brand-yellow hover:underline transition-colors"
                      >
                          View all scaffolders in {location.region}
                          <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                  </div>
                </div>
              </section>

              {/* PARENT CITY SPECIFIC: Sub-Locations List */}
              {subLocations.length > 0 && (
                <section>
                   <h3 className="text-2xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                    <Map className="text-brand-yellow w-6 h-6" />
                    Areas We Serve in {location.name}
                   </h3>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {subLocations.map(sub => (
                        <Link 
                            key={sub.id} 
                            to={`/locations/${sub.slug}`}
                            className="block p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all hover:shadow-md group"
                        >
                            <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-yellow">{sub.name}</span>
                            <span className="block text-xs text-gray-500 mt-1">View Services</span>
                        </Link>
                      ))}
                   </div>
                </section>
              )}

              {/* SUB-LOCATION SPECIFIC: Sibling Locations */}
              {isSubLocation && parentLocation && siblingLocations.length > 0 && (
                <section>
                   <h3 className="text-2xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin className="text-brand-yellow w-6 h-6" />
                    Other Areas in {parentLocation.name}
                   </h3>
                   <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {siblingLocations.map((sib, idx) => (
                          <Link 
                             key={idx} 
                             to={`/locations/${sib.slug}`}
                             className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm hover:bg-brand-yellow hover:text-black transition-colors"
                          >
                            {sib.name}
                          </Link>
                        ))}
                        <Link 
                            to={`/locations/${parentLocation.slug}`}
                            className="px-3 py-1.5 border border-brand-yellow text-brand-yellow rounded-full text-sm hover:bg-brand-yellow hover:text-black transition-colors"
                        >
                            View All {parentLocation.name} Areas
                        </Link>
                      </div>
                   </div>
                </section>
              )}

              {/* Typical Work */}
              {location.typicalWork && location.typicalWork.length > 0 && (
                <section>
                   <h3 className="text-2xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                    <Hammer className="text-brand-yellow w-6 h-6" />
                    Typical Scaffolding Work in {location.name}
                   </h3>
                   <div className="grid gap-4">
                      {location.typicalWork.map((work, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{work}</span>
                        </div>
                      ))}
                   </div>
                </section>
              )}

              {/* Services Grid */}
              <section>
                <h2 className="text-3xl font-bold mb-8 font-montserrat text-gray-900 dark:text-white">
                  Our Services in {location.name}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {services.map((service, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="p-6 bg-white dark:bg-brand-secondary rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
                    >
                      <div className="w-12 h-12 bg-brand-yellow/10 rounded-lg flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-brand-yellow" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{service.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Local FAQs */}
              {location.localFaqs && location.localFaqs.length > 0 && (
                <section>
                  <h3 className="text-2xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white">
                    Local FAQs About Scaffolding in {location.name}
                  </h3>
                  <div className="bg-white dark:bg-black rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-2 md:p-6">
                    {location.localFaqs.map((faq, idx) => (
                      <FAQAccordion key={idx} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </section>
              )}

              {/* Lazy Loaded Map Section */}
              <section>
                <h2 className="text-3xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white">
                  We Cover {location.name} & Surrounding Areas
                </h2>
                <div className="h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 relative z-0 bg-gray-100 dark:bg-gray-800">
                  <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                      <Loader2 className="w-10 h-10 animate-spin text-brand-yellow" />
                      <p className="text-gray-500 text-sm">Loading map...</p>
                    </div>
                  }>
                    <LocationMap 
                      coordinates={[location.latitude, location.longitude]} 
                      name={location.name} 
                    />
                  </Suspense>
                </div>
              </section>

              {/* Related Locations Section */}
              <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-6">
                      <Layers className="w-6 h-6 text-brand-yellow" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Locations</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {relatedLocations.map(loc => (
                          <motion.div whileHover={{ x: 5 }} key={loc.id}>
                            <Link 
                                to={`/locations/${loc.slug}`}
                                className="block text-gray-600 dark:text-gray-400 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors text-sm"
                            >
                                Scaffolding Services in {loc.name}
                            </Link>
                          </motion.div>
                      ))}
                  </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Quote Form - Sticky */}
              <div id="quote" className="sticky top-24">
                <div className="mb-8">
                  <QuickQuoteForm prefilledLocation={location.name} />
                </div>

                {/* Local Contact Info */}
                <div className="bg-white dark:bg-brand-secondary p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold mb-6 font-montserrat text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                    Contact Details
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Area</span>
                        <span className="text-gray-900 dark:text-gray-300 font-medium">{location.name}, {parentLocation ? parentLocation.name : location.county}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Phone</span>
                        <a href="tel:07749309223" className="text-gray-900 dark:text-white font-bold hover:text-brand-yellow transition-colors">
                          07749 309 223
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Hours</span>
                        <span className="text-gray-900 dark:text-gray-300 text-sm">
                          Mon-Fri: 7am-6pm<br/>
                          Sat: 8am-2pm
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-brand-yellow hover:text-black dark:hover:bg-brand-yellow dark:hover:text-black font-bold" asChild>
                      <Link to="/contact">Contact Support</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPage;