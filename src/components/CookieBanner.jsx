import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to prevent layout jump immediately on load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white dark:bg-zinc-900 border border-brand-yellow/30 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative">
              <button 
                onClick={handleReject} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="bg-brand-yellow/10 p-3 rounded-full flex-shrink-0">
                <Cookie className="w-6 h-6 text-brand-yellow" />
              </div>

              <div className="flex-grow pr-8">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">We value your privacy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  onClick={handleReject}
                  className="whitespace-nowrap border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Reject
                </Button>
                <Button 
                  onClick={handleAccept}
                  className="whitespace-nowrap bg-brand-yellow text-black hover:bg-brand-yellow/90 font-bold"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;