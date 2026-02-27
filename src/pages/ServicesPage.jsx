import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Umbrella, ShieldCheck, ClipboardCheck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';

const ServicesPage = () => {
  const pageTitle = "Scaffolding Services - Professional Solutions for All Projects";
  const pageDescription = "Explore comprehensive scaffolding services including residential, commercial, industrial, and specialized solutions. Find local scaffolders.";
  const canonicalUrl = `${SITE_URL}/services`;

  const services = [
    {
      icon: Home,
      title: 'Residential Scaffolding',
      description: 'Complete scaffolding solutions for homeowners and residential projects.',
      features: [
        'House Extensions',
        'Roof Repairs & Maintenance',
        'Painting & Decorating Access',
        'Chimney Work',
        'Gutter Cleaning & Repairs',
        'Window Replacement'
      ],
      image: 'https://images.unsplash.com/photo-1568151769173-e7784208c098'
    },
    {
      icon: Building2,
      title: 'Commercial Scaffolding',
      description: 'Professional scaffolding for commercial buildings and business premises.',
      features: [
        'Office Buildings',
        'Retail Premises',
        'Hotels & Hospitality',
        'Educational Facilities',
        'Healthcare Buildings',
        'Public Buildings'
      ],
      image: 'https://images.unsplash.com/photo-1699625809637-31c6f327ac96'
    },
    {
      icon: Factory,
      title: 'Industrial Scaffolding',
      description: 'Heavy-duty scaffolding solutions for industrial and manufacturing sites.',
      features: [
        'Warehouses',
        'Manufacturing Plants',
        'Power Stations',
        'Refineries',
        'Chemical Plants',
        'Heavy Industry'
      ],
      image: 'https://images.unsplash.com/photo-1623951005959-b7eb46bffc40'
    },
    {
      icon: Umbrella,
      title: 'Temporary Roofing',
      description: 'Weather protection systems to keep your project running in all conditions.',
      features: [
        'Temporary Roof Systems',
        'Weather Protection',
        'Debris Netting',
        'Sheeting & Wrapping',
        'Hoarding Solutions',
        'Site Protection'
      ],
      image: 'https://images.unsplash.com/photo-1624211114565-f4b8e0b76261'
    },
    {
      icon: ShieldCheck,
      title: 'Safety Equipment',
      description: 'Comprehensive safety equipment and edge protection systems.',
      features: [
        'Edge Protection Systems',
        'Safety Netting',
        'Handrails & Toe Boards',
        'Safety Harnesses',
        'Hard Hats & PPE',
        'Ladder Access'
      ],
      image: 'https://images.unsplash.com/photo-1579444043299-5525bdea5c0c'
    },
    {
      icon: ClipboardCheck,
      title: 'Inspection & Maintenance',
      description: 'Regular inspections and maintenance to ensure compliance and safety.',
      features: [
        'Weekly Inspections',
        'Compliance Reports',
        'Safety Audits',
        'Maintenance Service',
        'Emergency Repairs',
        'Documentation'
      ],
      image: 'https://images.unsplash.com/photo-1568151769173-e7784208c098'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="residential scaffolding, commercial scaffolding, industrial scaffolding, temporary roofing, scaffold inspections, scaffolding safety, scaffold hire services" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-montserrat">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional scaffolding solutions for every project type. From residential work to large-scale commercial and industrial projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-brand-yellow" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 font-montserrat text-white">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full flex-shrink-0" />
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 font-bold" asChild>
                    <a href="/#quote">Get a Quote</a>
                  </Button>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-montserrat">
            Need Scaffolding Services?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote and site survey. Our expert team is ready to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 text-lg px-8 py-6 font-bold"
              asChild
            >
              <a href="/#quote">Request Quote</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-brand-black text-lg px-8 py-6 font-bold"
              asChild
            >
              <a href="tel:0800123456">
                <Phone className="mr-2 w-5 h-5" />
                0800 123 456
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;