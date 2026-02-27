import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import ProductsList from '@/components/ProductsList';
import LocationLinksSection from '@/components/LocationLinksSection';
import { SITE_URL, DEFAULT_IMAGE, generateLocalBusinessSchema } from '@/lib/seoHelpers';
import { Layers, Box, Wrench, Hammer, Triangle, Construction, ShieldCheck, Ruler, Search, ArrowRight, Truck, CheckCircle, Headphones, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const ShopPage = () => {
  const pageTitle = "Scaffolding Equipment & Supplies - Buy Online";
  const pageDescription = "Marketplace for professional scaffolding products and equipment. Buy tubes, boards, fittings, and safety gear online. National delivery available.";
  const canonicalUrl = `${SITE_URL}/shop`;
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'tubes', name: 'Tubes', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-400/10', count: products.filter(p => p.category === 'tubes').length },
    { id: 'boards', name: 'Boards', icon: Box, color: 'text-yellow-400', bg: 'bg-yellow-400/10', count: products.filter(p => p.category === 'boards').length },
    { id: 'fittings', name: 'Fittings', icon: Wrench, color: 'text-green-400', bg: 'bg-green-400/10', count: products.filter(p => p.category === 'fittings').length },
    { id: 'systems', name: 'Systems', icon: Construction, color: 'text-orange-400', bg: 'bg-orange-400/10', count: products.filter(p => p.category === 'systems').length },
    { id: 'towers', name: 'Towers', icon: Triangle, color: 'text-red-400', bg: 'bg-red-400/10', count: products.filter(p => p.category === 'towers').length },
    { id: 'ladders', name: 'Ladders', icon: Ruler, color: 'text-cyan-400', bg: 'bg-cyan-400/10', count: products.filter(p => p.category === 'ladders').length },
    { id: 'accessories', name: 'Accessories', icon: Hammer, color: 'text-purple-400', bg: 'bg-purple-400/10', count: products.filter(p => p.category === 'accessories').length },
    { id: 'safety', name: 'Safety', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10', count: products.filter(p => p.category === 'safety').length },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Quality Assurance",
      description: "All equipment meets strict NASC and British Safety Standards for your peace of mind."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Nationwide delivery available with next-day options for urgent project requirements."
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Our team of experienced scaffolders is on hand to provide technical advice and support."
    },
    {
      icon: CheckCircle,
      title: "Professional Standards",
      description: "We only stock professional-grade equipment suitable for commercial and industrial use."
    }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="scaffolding equipment, scaffolding supplies, buy scaffolding, scaffold tubes, scaffold boards, scaffold fittings, scaffolding shop" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </Helmet>

      <div className="bg-brand-black min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-brand-yellow/5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb items={[{ label: 'Shop', href: '/shop' }]} />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8 max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat leading-tight">
                Professional Scaffolding <span className="text-brand-yellow">Equipment & Tools</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                Premium quality, NASC-compliant scaffolding supplies delivered nationwide. 
                From heavy-duty tubes and boards to essential safety gear, we equip your projects for success with reliable, professional-grade tools.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button className="w-full sm:w-auto bg-brand-yellow text-brand-black hover:bg-white font-bold text-lg px-8 py-6 h-auto" onClick={() => document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })}>
                  Browse Our Shop
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 h-auto" onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}>
                  View Categories
                </Button>
              </div>

              {/* Search Bar - Visual only for now, could be hooked up later */}
              <div className="max-w-xl mx-auto relative opacity-90 group">
                  <div className="absolute inset-0 bg-brand-yellow/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <input 
                    type="text" 
                    placeholder="Search for tubes, clips, boards..." 
                    className="w-full relative bg-brand-secondary border border-gray-700 rounded-full py-4 px-6 pl-12 text-white focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 bg-zinc-900 border-y border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-brand-black p-6 rounded-xl border border-gray-800 hover:border-brand-yellow/30 transition-all group"
                >
                  <div className="bg-zinc-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                    <benefit.icon className="w-6 h-6 text-brand-yellow group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">Shop by Category</h2>
              <p className="text-gray-400">Find exactly what you need for your next job</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link to={`/shop/${cat.id}`} className="block h-full group">
                    <div className={`h-full p-6 rounded-2xl border border-gray-800 hover:border-brand-yellow/50 bg-brand-secondary/50 backdrop-blur-sm transition-all hover:-translate-y-1 flex flex-col items-center text-center shadow-lg hover:shadow-brand-yellow/10`}>
                      <div className={`w-16 h-16 rounded-full ${cat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <cat.icon className={`w-8 h-8 ${cat.color}`} />
                      </div>
                      <h3 className="font-bold text-white text-lg group-hover:text-brand-yellow mb-2">{cat.name}</h3>
                      <p className="text-xs font-medium text-gray-500 bg-gray-900 px-3 py-1 rounded-full">{cat.count > 0 ? `${cat.count} Products` : 'Browse'}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories Preview */}
        {categories.slice(0, 3).map((category, index) => (
            <section key={category.id} className={`py-12 ${index % 2 === 0 ? 'bg-zinc-900/50' : ''}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${category.bg}`}>
                                <category.icon className={`w-6 h-6 ${category.color}`} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                        </div>
                        <Button variant="ghost" asChild className="text-brand-yellow hover:text-white hover:bg-transparent p-0 group">
                            <Link to={`/shop/${category.id}`} className="flex items-center gap-2">
                                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                    <ProductsList category={category.id} limit={4} />
                </div>
            </section>
        ))}

        {/* All Products */}
        <section id="products-grid" className="py-20 border-t border-gray-800 bg-brand-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">All Products</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Browse our complete catalogue of high-quality scaffolding equipment available for immediate delivery.</p>
            </div>
            <ProductsList showFilters={true} />
          </div>
        </section>

        {/* Location Links Section */}
        <LocationLinksSection />
      </div>
    </>
  );
};

export default ShopPage;