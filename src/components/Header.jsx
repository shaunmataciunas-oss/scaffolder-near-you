import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, ChevronDown, MapPin, Globe, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import LocationSelector from '@/components/LocationSelector';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Header = ({ onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const shopCategories = [
    { name: 'Tubes', path: '/shop/tubes' },
    { name: 'Boards', path: '/shop/boards' },
    { name: 'Fittings', path: '/shop/fittings' },
    { name: 'Systems', path: '/shop/systems' },
    { name: 'Towers', path: '/shop/towers' },
    { name: 'Ladders', path: '/shop/ladders' },
    { name: 'Accessories', path: '/shop/accessories' },
    { name: 'Safety', path: '/shop/safety' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Locations', path: '/locations' }, 
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-black border-b border-gray-800 shadow-xl backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link to="/" className="text-white hover:text-brand-yellow transition-colors font-medium text-sm tracking-wide">Home</Link>
              <Link to="/services" className="text-white hover:text-brand-yellow transition-colors font-medium text-sm tracking-wide">Services</Link>
              <Link to="/locations" className="text-white hover:text-brand-yellow transition-colors font-medium text-sm tracking-wide">Locations</Link>
              
              {/* Shop Dropdown */}
              <div 
                  className="relative group"
                  onMouseEnter={() => setShopMenuOpen(true)}
                  onMouseLeave={() => setShopMenuOpen(false)}
              >
                  <Link to="/shop" className="text-white hover:text-brand-yellow transition-colors font-medium text-sm tracking-wide flex items-center gap-1 py-4">
                      Shop <ChevronDown size={14} />
                  </Link>
                  
                  <AnimatePresence>
                      {shopMenuOpen && (
                          <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 w-56 bg-brand-secondary border border-gray-800 rounded-xl shadow-2xl overflow-hidden py-2"
                          >
                              <Link to="/shop" className="block px-4 py-3 text-sm text-brand-yellow font-bold hover:bg-gray-800 border-b border-gray-700">
                                  Visit Shop Home
                              </Link>
                              {shopCategories.map(cat => (
                                  <Link 
                                      key={cat.path} 
                                      to={cat.path}
                                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                  >
                                      {cat.name}
                                  </Link>
                              ))}
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>

              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white hover:text-brand-yellow transition-colors font-medium text-sm tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pl-4 border-l border-gray-700 flex items-center gap-4">
                <button 
                  onClick={onOpenCart}
                  className="relative p-2 text-white hover:text-brand-yellow transition-colors group"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                
                <LocationSelector />
                
                <Button asChild className="bg-brand-yellow text-brand-black hover:bg-white hover:text-brand-black font-bold shadow-[0_0_15px_rgba(255,204,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all">
                  <a href="tel:07749309223">
                    <Phone className="w-4 h-4 mr-2" />
                    07749 309 223
                  </a>
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button & Cart */}
            <div className="flex items-center gap-4 lg:hidden">
              <button 
                onClick={onOpenCart}
                className="relative p-2 text-white hover:text-brand-yellow transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-white hover:text-brand-yellow transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (Slide from Left) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-brand-black border-r border-gray-800 z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-grow space-y-2">
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/locations" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-brand-yellow" />
                    All Locations
                  </Link>
                  <Link 
                    to="/shop" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-brand-yellow" />
                    Shop
                  </Link>
                  
                  {/* Shop Section in Mobile */}
                  <div className="py-2 my-2 border-y border-gray-800 bg-white/5 rounded-lg">
                    <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Shop Categories</p>
                    {shopCategories.slice(0, 5).map(cat => (
                      <Link 
                        key={cat.path} 
                        to={cat.path} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white pl-8"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link 
                      to="/shop" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-brand-yellow font-bold pl-8 mt-1"
                    >
                      View All Products
                    </Link>
                  </div>

                  {navLinks.slice(3).map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link 
                    to="/html-sitemap" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4 text-brand-yellow" />
                    Sitemap
                  </Link>
                </nav>

                <div className="pt-6 mt-6 border-t border-gray-800">
                  <div className="mb-4">
                    <LocationSelector />
                  </div>
                  <Button asChild className="w-full bg-brand-yellow text-brand-black font-bold py-6 hover:bg-white">
                    <a href="tel:07749309223">
                      <Phone className="w-5 h-5 mr-2" />
                      Call: 07749 309 223
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;