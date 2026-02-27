import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';

const SuccessPage = () => {
  const { clearCart } = useCart();
  const { width, height } = useWindowSize();

  const pageTitle = "Order Confirmed - Scaffolding Supplies";
  const pageDescription = "Your scaffolding equipment order has been confirmed. Track your delivery and manage your purchase.";

  useEffect(() => {
    // Clear the cart when landing on success page
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/success`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>
      
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-black relative overflow-hidden py-20 px-4">
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          colors={['#FFD700', '#FFFFFF', '#333333']}
        />
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-brand-secondary border border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Thank you for your purchase. Your order has been received and is being processed by our team.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-3 text-brand-yellow">
                <ShoppingBag size={20} />
              </div>
              <h3 className="font-bold text-white mb-1">Confirmation Email</h3>
              <p className="text-sm text-gray-400">Sent to your inbox</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-3 text-brand-yellow">
                <Truck size={20} />
              </div>
              <h3 className="font-bold text-white mb-1">Estimated Delivery</h3>
              <p className="text-sm text-gray-400">3-5 Business Days</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-bold h-14 px-8 text-lg"
            >
              <Link to="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-gray-700 text-white hover:bg-gray-800 h-14 px-8 text-lg"
            >
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;