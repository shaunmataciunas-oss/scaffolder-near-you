import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/components/ui/use-toast';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Add some products to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      // Note: In a real app, you might wait for webhook confirmation before clearing,
      // but for this flow we clear on successful redirect initiation or handle it on success page.
      // We'll keep the cart for now until success page clears it or we redirect.
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Checkout Error',
        description: 'There was a problem initializing checkout. Please try again.',
        variant: 'destructive',
      });
    }
  }, [cartItems, toast]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-black border-l border-gray-800 shadow-2xl z-[101] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white font-montserrat flex items-center gap-2">
                <ShoppingCartIcon className="text-brand-yellow" />
                Your Cart
              </h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <X />
              </Button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCartIcon size={40} className="opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                  <p className="max-w-xs mx-auto">Looks like you haven't added any scaffolding equipment yet.</p>
                  <Button 
                    onClick={() => setIsCartOpen(false)} 
                    className="mt-8 bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 font-bold"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div 
                    layout
                    key={item.variant.id} 
                    className="flex gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800"
                  >
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-white truncate">{item.product.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{item.variant.title}</p>
                      <p className="text-brand-yellow font-bold">
                        {item.variant.sale_price_formatted || item.variant.price_formatted}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button onClick={() => removeFromCart(item.variant.id)} size="icon" variant="ghost" className="h-6 w-6 text-gray-500 hover:text-red-500">
                        <Trash2 size={14} />
                      </Button>
                      <div className="flex items-center bg-gray-800 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-gray-900/30">
                <div className="flex justify-between items-center mb-6 text-white">
                  <span className="text-lg font-medium text-gray-400">Total</span>
                  <span className="text-3xl font-bold font-montserrat">{getCartTotal()}</span>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-bold py-6 text-lg shadow-lg hover:shadow-brand-yellow/20 transition-all rounded-xl"
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;