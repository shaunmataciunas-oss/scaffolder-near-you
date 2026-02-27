import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Layers, Box, Wrench, Hammer, Construction, Ruler, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuickQuoteForm from '@/components/QuickQuoteForm';
import ServiceCards from '@/components/ServiceCards';
import TrustSignals from '@/components/TrustSignals';
import LocationGrid from '@/components/LocationGrid';
import { generateOrganizationSchema } from '@/lib/schemaHelpers';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';
import { useAnalytics } from '@/hooks/useAnalytics';

const HomePage = () => {
  const { trackEvent } = useAnalytics();
  const schemaData = generateOrganizationSchema();
  const pageTitle = "National Scaffolding Database - Find Local Scaffolders & Get Leads";
  const pageDescription = "Connect with local scaffolders or find scaffolding services near you. National database for scaffolding leads and professional scaffolders.";

  const categories = [
    { id: 'tubes', name: 'Tubes', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'boards', name: 'Boards', icon: Box, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'fittings', name: 'Fittings', icon: Wrench, color: 'text-green-400', bg: 'bg-green-400/10' },
    { id: 'systems', name: 'Systems', icon: Construction, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  const handleCTAClick = (type) => {
    trackEvent('click_get_quotes', {
      source: 'homepage_hero',
      type: type
    });
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="scaffolding, scaffolder, local scaffolder, scaffolding services, scaffolding database, find scaffolder, scaffolding leads" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={DEFAULT_IMAGE} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568151769173-e7784208c098"
            alt="Professional scaffolding installation"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black/90 to-brand-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-montserrat leading-tight">
                Professional
                <br />
                <span className="text-brand-yellow">Scaffolding</span>
                <br />
                Services
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Serving all Areas of the United Kingdom with safe, reliable scaffolding solutions for residential and commercial projects. Find NASC certified and fully insured scaffolders
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black text-lg px-8 py-6 font-bold"
                  asChild
                  onClick={() => handleCTAClick('hero_button')}
                >
                  <a href="#quote">
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-black text-lg px-8 py-6 font-bold"
                  asChild
                >
                  <a href="tel:07749309223">
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-yellow font-montserrat">15+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-yellow font-montserrat">2000+</p>
                  <p className="text-sm text-gray-400">Projects Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-yellow font-montserrat">100%</p>
                  <p className="text-sm text-gray-400">Safety Record</p>
                </div>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div
              id="quote"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <QuickQuoteForm />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-brand-yellow rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-brand-yellow rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Browse By Category Section */}
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
                    Browse by <span className="text-brand-yellow">Category</span>
                </h2>
                <p className="text-gray-400">Find exactly what you need for your next project.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                  <Link to={`/shop/${cat.id}`} key={cat.id} className="group">
                    <div className="bg-brand-secondary border border-gray-800 rounded-xl p-6 text-center hover:border-brand-yellow/50 transition-all hover:-translate-y-1 h-full flex flex-col items-center justify-center">
                        <div className={`p-4 rounded-full ${cat.bg} mb-4 group-hover:scale-110 transition-transform`}>
                            <cat.icon className={`w-8 h-8 ${cat.color}`} />
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-yellow">{cat.name}</h3>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-8">
                 <Button variant="link" asChild className="text-brand-yellow hover:text-white">
                    <Link to="/shop">View All Categories</Link>
                 </Button>
            </div>
        </div>
      </section>

      {/* Service Cards */}
      <ServiceCards />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Location Grid */}
      <LocationGrid />
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-brand-secondary border border-gray-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">Looking for a specific area?</h3>
          <p className="text-gray-300 mb-6">We cover over 800 locations across the UK. Browse our full directory to find scaffolders near you.</p>
          <Button 
            asChild 
            className="bg-brand-yellow text-brand-black hover:bg-white hover:text-brand-black font-bold"
            onClick={() => trackEvent('location_search', { source: 'homepage_bottom_cta' })}
          >
            <Link to="/locations">
               <Search className="w-4 h-4 mr-2" />
               View All 831 Locations
            </Link>
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-brand-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-montserrat">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Get in touch today for a free, no-obligation quote. Our expert team is ready to help with your scaffolding needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 text-lg px-8 py-6 font-bold"
              asChild
              onClick={() => handleCTAClick('footer_cta')}
            >
              <a href="#quote">Request Quote</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-brand-black text-lg px-8 py-6 font-bold"
              asChild
            >
              <a href="tel:07749309223">
                <Phone className="mr-2 w-5 h-5" />
                07749 309 223
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;