import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ProductsList from '@/components/ProductsList';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL } from '@/lib/seoHelpers';
import { Layers, Box, Wrench, Hammer, Triangle, Construction, ShieldCheck, Ruler, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryConfig = {
    tubes: { icon: Layers, description: "High-yield galvanised steel and aluminium scaffolding tubes in various lengths.", title: "Scaffolding Tubes" },
    boards: { icon: Box, description: "BS 2482 compliant scaffolding boards, fire retardant options and plastic supadeck.", title: "Scaffold Boards" },
    fittings: { icon: Wrench, description: "Drop forged and pressed steel couplers, clamps and fittings.", title: "Fittings & Couplers" },
    systems: { icon: Construction, description: "Modular scaffolding systems including Cuplock and Ringlock components.", title: "System Scaffolding" },
    towers: { icon: Triangle, description: "Aluminium access towers, stairway towers and folding units.", title: "Access Towers" },
    ladders: { icon: Ruler, description: "Industrial pole ladders, extension ladders and steps.", title: "Ladders & Access" },
    accessories: { icon: Hammer, description: "Essential tools, sheeting, netting, brickguards and site protection.", title: "Accessories" },
    safety: { icon: ShieldCheck, description: "PPE, harnesses, helmets, and safety equipment for working at height.", title: "Safety & PPE" },
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const safeCategoryName = categoryName || 'all';
  
  const config = categoryConfig[safeCategoryName] || { 
    icon: Layers, 
    description: "Quality scaffolding equipment for professional use.", 
    title: safeCategoryName.charAt(0).toUpperCase() + safeCategoryName.slice(1) 
  };
  
  const Icon = config.icon;
  
  const pageTitle = `${config.title} - Scaffolding Equipment & Supplies`;
  const pageDescription = `Buy ${config.title.toLowerCase()} online. ${config.description} Professional scaffolding equipment for sale with UK delivery.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${config.title.toLowerCase()}, buy scaffolding, scaffolding shop, construction equipment`} />
        <link rel="canonical" href={`${SITE_URL}/shop/${safeCategoryName}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/shop/${safeCategoryName}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>

      <section className="bg-brand-black min-h-screen py-12 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <Breadcrumb items={[
              { label: 'Shop', href: '/shop' },
              { label: config.title }
            ]} />
             <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white hidden md:flex">
                <Link to="/shop"><ArrowLeft size={16} className="mr-2" /> Back to All Categories</Link>
             </Button>
          </div>

          <div className="bg-brand-secondary border border-gray-800 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="p-6 bg-brand-yellow/10 rounded-full text-brand-yellow">
                <Icon size={48} />
            </div>
            <div>
                <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-bold text-white mb-2 font-montserrat"
                >
                {config.title}
                </motion.h1>
                <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-400 max-w-2xl"
                >
                {config.description}
                </motion.p>
            </div>
          </div>

          <ProductsList category={safeCategoryName} />
          
          <div className="mt-16 text-center">
             <Link to="/shop" className="text-brand-yellow hover:text-white transition-colors underline underline-offset-4">
                View all other categories
             </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;