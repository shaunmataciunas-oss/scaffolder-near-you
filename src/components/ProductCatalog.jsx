import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Feature flag to hide product catalog
const SHOW_PRODUCT_CATALOG = false;

const ProductCatalog = () => {
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: 'Standard Scaffold Tower',
      image: 'https://images.unsplash.com/photo-1699625809637-31c6f327ac96',
      description: 'Versatile scaffold tower suitable for heights up to 8m',
      price: '£450',
      priceUnit: 'per week'
    },
    {
      id: 2,
      name: 'Safety Guardrails',
      image: 'https://images.unsplash.com/photo-1623951005959-b7eb46bffc40',
      description: 'Complete edge protection system with toe boards',
      price: '£85',
      priceUnit: 'per week'
    },
    {
      id: 3,
      name: 'Scaffold Boards',
      image: 'https://images.unsplash.com/photo-1624211114565-f4b8e0b76261',
      description: 'Heavy-duty scaffold boards, 3.9m length',
      price: '£12',
      priceUnit: 'per board/week'
    },
    {
      id: 4,
      name: 'Mobile Scaffold Tower',
      image: 'https://images.unsplash.com/photo-1579444043299-5525bdea5c0c',
      description: 'Wheeled tower for easy repositioning',
      price: '£550',
      priceUnit: 'per week'
    }
  ];

  const handleAddToCart = (productName) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "The shopping cart functionality will be available soon. Please contact us for orders.",
    });
  };

  // Don't render if feature flag is false
  if (!SHOW_PRODUCT_CATALOG) {
    return null;
  }

  return (
    <section className="py-16 bg-brand-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-montserrat text-white">
            Equipment Hire
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Quality scaffolding equipment available for hire at competitive rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-secondary rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-800"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 font-montserrat text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-2xl font-bold text-brand-yellow">{product.price}</p>
                  <p className="text-xs text-gray-500">{product.priceUnit}</p>
                </div>

                <Button
                  onClick={() => handleAddToCart(product.name)}
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-bold"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;