import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import QuickQuoteForm from '@/components/QuickQuoteForm';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';

// Fix for Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ContactPage = () => {
  const position = [53.5765, -2.4289]; // 34 Hazelwood Road, Bolton
  const pageTitle = "Contact Scaffolders Near You - Get Scaffolding Quotes";
  const pageDescription = "Contact local scaffolders for quotes and services. Submit your scaffolding project details and connect with professionals in your area.";
  const canonicalUrl = `${SITE_URL}/contact`;

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61565657128286", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/scaffoldingmcr", label: "Twitter" },
    { icon: MapPin, href: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x487ba70aaf25d7bf:0x5cf0453be74b56ff!12e1?source=g.page.m._&laa=merchant-review-solicitation", label: "Google Maps" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/scaffolders-near-you", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@Scaffoldersnearyou", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/scaffoldersnearyou", label: "Instagram" }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="contact scaffolders, scaffolding quote, scaffolding contact number, emergency scaffolding contact, hire scaffolders, scaffolding support" />
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
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300">
              Contact us today for a free quote and consultation. We're here to help with all your scaffolding needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 bg-brand-black">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <QuickQuoteForm />
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 font-montserrat text-white">
                Contact Information
              </h2>
              <p className="text-gray-400 mb-8">
                Get in touch with us through any of the following methods. Our team is ready to assist you with your scaffolding requirements.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-brand-secondary rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Phone</h3>
                  <a href="tel:07749309223" className="text-brand-yellow hover:underline text-lg">
                    07749 309 223
                  </a>
                  <p className="text-sm text-gray-400 mt-1">24/7 Emergency Line</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-brand-secondary rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <a href="mailto:shaun@scaffoldersnearyou.co.uk" className="text-brand-yellow hover:underline break-all">
                    shaun@scaffoldersnearyou.co.uk
                  </a>
                  <p className="text-sm text-gray-400 mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-brand-secondary rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Address</h3>
                  <p className="text-gray-400">
                    34 Hazelwood Road,<br />
                    Bolton, BL1 6ER
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-brand-secondary rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Opening Hours</h3>
                  <div className="text-gray-400">
                    <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                    <p>Saturday: 8:00 AM - 2:00 PM</p>
                    <p>Sunday: Emergency Callouts Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-montserrat text-white">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center hover:bg-white hover:text-brand-black transition-colors text-brand-yellow border border-gray-800 hover:border-white"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-brand-secondary border border-brand-yellow text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 font-montserrat text-brand-yellow">Emergency Service Available</h3>
              <p className="mb-4 text-gray-300">
                Need urgent scaffolding? We offer 24/7 emergency callout service for urgent projects and safety issues.
              </p>
              <a 
                href="tel:07749309223" 
                className="inline-block bg-brand-yellow text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-yellow/90 transition-colors"
              >
                Call Emergency Line
              </a>
            </div>
          </motion.div>
        </div>

        {/* Full Width Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-96 rounded-xl overflow-hidden border border-gray-800 shadow-xl relative z-0"
        >
          <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <strong>ScaffoldersNearYou</strong><br />
                34 Hazelwood Road,<br />
                Bolton, BL1 6ER
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;