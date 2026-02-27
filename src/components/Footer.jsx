import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, ShoppingBag, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Logo from '@/components/Logo';
import { locations } from '@/data/locations';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Get Quote', path: '/contact' },
    { name: 'All Locations', path: '/locations' }, 
    { name: 'Blog', path: '/blog' },
    { name: 'HTML Sitemap', path: '/html-sitemap' },
    { name: 'XML Sitemap', path: '/sitemap_index.xml' }, 
  ];

  const shopLinks = [
    { name: 'Shop Home', path: '/shop' },
    { name: 'Scaffolding Tubes', path: '/shop/tubes' },
    { name: 'Boards', path: '/shop/boards' },
    { name: 'Fittings & Couplers', path: '/shop/fittings' },
    { name: 'Systems', path: '/shop/systems' },
    { name: 'Access Towers', path: '/shop/towers' },
    { name: 'Safety & PPE', path: '/shop/safety' },
  ];

  // Prioritize parent locations (cities) for the footer
  const featuredLocations = locations
    .filter(l => !l.parentSlug) // Only show main locations
    .slice(0, 10);
    
  const position = [53.5765, -2.4289]; // 34 Hazelwood Road, Bolton coordinates

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/scaffolders-near-you", label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61565657128286", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/scaffoldingmcr", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/scaffoldersnearyou", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@Scaffoldersnearyou", label: "YouTube" }
  ];

  return (
    <footer className="bg-brand-black text-white py-16 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Logo />
            <p className="mt-6 text-gray-400 text-sm leading-relaxed">
              Scaffolders Near You connects you with professional, NASC-certified scaffolding services across Greater Manchester and the UK. Safe, reliable, and efficient solutions for every project.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-brand-yellow p-2 rounded-full text-white hover:text-black transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:block lg:space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-montserrat text-white">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    {link.path.endsWith('.xml') ? (
                       <a href={link.path} className="text-gray-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2">
                         <Globe size={14} /> {link.name}
                       </a>
                    ) : (
                      <Link to={link.path} className="text-gray-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2">
                         <ArrowRight size={14} className="text-gray-600" /> {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 font-montserrat text-white flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-yellow" /> Shop
              </h3>
              <ul className="space-y-2">
                {shopLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-brand-yellow transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Featured Locations */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-montserrat text-white">Major Service Areas</h3>
            <ul className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-2">
              {featuredLocations.map((location) => (
                <li key={location.slug}>
                  <Link 
                    to={`/locations/${location.slug}`} 
                    className="text-gray-400 hover:text-brand-yellow transition-colors text-sm"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/locations" className="text-brand-yellow hover:underline text-sm font-semibold mt-2 block">
                  View All Locations...
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-montserrat text-white">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                  <a href="tel:07749309223" className="text-white hover:text-brand-yellow transition-colors font-bold">
                    07749 309 223
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <a href="mailto:shaun@scaffoldersnearyou.co.uk" className="text-white hover:text-brand-yellow transition-colors break-all">
                    shaun@scaffoldersnearyou.co.uk
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Head Office</p>
                  <p className="text-white">34 Hazelwood Road,<br />Bolton, BL1 6ER</p>
                  {/* Company Details */}
                  <p className="text-xs text-gray-500 mt-2">Auto Trading Machine Ltd</p>
                  <p className="text-xs text-gray-500">Company Number: 15143462</p>
                </div>
              </li>
            </ul>

            <div className="border border-gray-800 rounded-lg overflow-hidden h-40 w-full relative z-0 shadow-lg grayscale hover:grayscale-0 transition-all">
              <MapContainer 
                center={position} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Partner Companies Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
             Partner Companies
          </h3>
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-12 gap-y-4">
            <a 
              href="https://www.wundercoat.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-all"
            >
              <ExternalLink size={16} className="text-gray-600 group-hover:text-brand-yellow transition-colors" />
              <span className="group-hover:translate-x-1 transition-transform inline-block">Need a spraying company?</span>
            </a>
            <a 
              href="https://www.ukcommercialflooring.co.uk"
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-all"
            >
              <ExternalLink size={16} className="text-gray-600 group-hover:text-brand-yellow transition-colors" />
              <span className="group-hover:translate-x-1 transition-transform inline-block">Need a flooring company?</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Scaffolders Near You. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <a
                href="https://www.getfoundnow.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-yellow transition-colors"
            >
                Site by Get Found Now
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;