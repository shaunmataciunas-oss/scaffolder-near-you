import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, Phone, Info, Shield, Truck } from 'lucide-react';
import { getProduct } from '@/api/EcommerceApi';
import { SITE_URL } from '@/lib/seoHelpers';

const placeholderImage = "https://placehold.co/600x600?text=No+Image+Available";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from API instead of local data to ensure IDs match
        const fetchedProduct = await getProduct(id);
        
        if (!fetchedProduct) throw new Error('Product not found');

        setProduct(fetchedProduct);
        if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
            setSelectedVariant(fetchedProduct.variants[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        fetchProductData();
    }
  }, [id]);

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
        if (selectedVariant.price_in_cents === 0) {
            navigate('/contact');
            return;
        }
      const availableQuantity = selectedVariant.inventory_quantity ?? 999; // Default if not tracked
      
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Added to Cart! 🛒",
          description: `${quantity} x ${product.title} added.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Cannot add to cart",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast, navigate]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        return newQuantity < 1 ? 1 : newQuantity;
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] bg-brand-black">
        <Loader2 className="h-16 w-16 text-brand-yellow animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-black p-8 text-center flex items-center justify-center">
        <div className="max-w-md w-full bg-brand-secondary border border-gray-800 rounded-xl p-8">
            <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
            <p className="text-gray-400 mb-6">The product you are looking for may have been removed or unavailable.</p>
            <Button asChild className="bg-brand-yellow text-brand-black hover:bg-white font-bold w-full">
                <Link to="/shop">Return to Shop</Link>
            </Button>
        </div>
      </div>
    );
  }

  const isQuoteOnly = selectedVariant?.price_in_cents === 0;
  const priceFormatted = selectedVariant?.sale_price_formatted || selectedVariant?.price_formatted || "Contact for Price";
  const availableStock = selectedVariant?.inventory_quantity ?? 10;
  const canAddToCart = !isQuoteOnly && availableStock > 0 && product.purchasable;
  
  const pageTitle = `${product.title} - Scaffolding Equipment & Supplies`;
  const pageDescription = product.description ? product.description.replace(/<[^>]*>/g, '').substring(0, 160) : `Buy ${product.title} online. Professional scaffolding equipment.`;
  const canonicalUrl = `${SITE_URL}/product/${id}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={product.image || placeholderImage} />
      </Helmet>
      
      <div className="bg-brand-black min-h-screen pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-6xl">
            {/* Breadcrumb / Back Link */}
            <div className="mb-8">
                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors mb-4">
                  <ArrowLeft size={16} /> Back to Shop
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Image Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-8 h-fit flex items-center justify-center"
                >
                    <div className="relative aspect-square w-full flex items-center justify-center">
                        <img
                            src={product.image || placeholderImage}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </motion.div>

                {/* Details Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-montserrat">{product.title}</h1>
                    <div className="text-sm text-gray-500 mb-6">SKU: {selectedVariant?.sku || product.id.substring(0, 8)}</div>

                    <div className="flex items-baseline gap-4 mb-8">
                        <span className={`text-4xl font-bold ${isQuoteOnly ? 'text-brand-yellow text-2xl' : 'text-white'}`}>
                            {priceFormatted}
                        </span>
                        {!isQuoteOnly && availableStock > 0 && (
                            <span className="text-green-500 flex items-center gap-1 text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                <CheckCircle size={14} /> In Stock
                            </span>
                        )}
                    </div>

                    <div 
                        className="prose prose-invert prose-lg text-gray-300 mb-8 border-b border-gray-800 pb-8"
                        dangerouslySetInnerHTML={{ __html: product.description }} 
                    />

                    {/* Additional Info / Specs if available */}
                    {product.additional_info && product.additional_info.length > 0 && (
                        <div className="mb-8 bg-brand-secondary/50 rounded-xl p-6 border border-gray-800">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Info size={18} className="text-brand-yellow" /> Specifications
                            </h3>
                            <div className="space-y-4">
                                {product.additional_info.map((info) => (
                                    <div key={info.id}>
                                        <h4 className="text-gray-400 text-sm font-bold">{info.title}</h4>
                                        <div className="text-white text-sm" dangerouslySetInnerHTML={{ __html: info.description }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-brand-secondary rounded-xl p-6 border border-gray-800">
                        {isQuoteOnly ? (
                            <div className="space-y-4">
                                <p className="text-gray-300 text-sm mb-2">This item requires a custom quote due to size or configuration.</p>
                                <Button size="lg" className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-bold h-14 text-lg" onClick={() => navigate('/contact')}>
                                    <Phone className="mr-2 h-5 w-5" /> Request Quote
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center bg-brand-black border border-gray-700 rounded-lg">
                                        <button 
                                            onClick={() => handleQuantityChange(-1)} 
                                            className="w-12 h-12 flex items-center justify-center text-white hover:text-brand-yellow transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-12 text-center text-xl font-bold text-white">{quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(1)} 
                                            className="w-12 h-12 flex items-center justify-center text-white hover:text-brand-yellow transition-colors"
                                            disabled={quantity >= availableStock}
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Total: <span className="text-white font-bold ml-1">
                                            {selectedVariant && `£${((selectedVariant.price_in_cents * quantity) / 100).toFixed(2)}`}
                                        </span>
                                    </span>
                                </div>
                                <Button 
                                    onClick={handleAddToCart} 
                                    size="lg" 
                                    className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-bold h-14 text-lg"
                                    disabled={!canAddToCart}
                                >
                                    {canAddToCart ? (
                                        <>
                                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                                        </>
                                    ) : (
                                        "Out of Stock"
                                    )}
                                </Button>
                            </>
                        )}
                        
                        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Shield size={12} /> Secure Checkout</span>
                            <span className="flex items-center gap-1"><Truck size={12} /> Fast Delivery</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;