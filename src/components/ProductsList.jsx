import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories, formatCurrency } from '@/api/EcommerceApi';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const ProductsList = ({ category, limit, featured, showFilters = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch Products
        const productsResponse = await getProducts({ limit: limit ? String(limit * 2) : '100' });
        
        // Handle response structure (it returns { count, products: [...] })
        if (!productsResponse || !Array.isArray(productsResponse.products)) {
           throw new Error("Invalid API response format");
        }
        
        let fetchedProducts = productsResponse.products;

        // 2. Fetch Categories (Collections) to map IDs to Names
        // We need this because products have collection_id, but we want to filter by category slug/name
        const categoriesResponse = await getCategories();
        const categoriesMap = new Map();
        if (categoriesResponse && Array.isArray(categoriesResponse.categories)) {
          categoriesResponse.categories.forEach(cat => {
            categoriesMap.set(cat.id, cat.title.toLowerCase());
          });
        }

        // 3. Enrich products with category names
        fetchedProducts = fetchedProducts.map(p => {
            // Find the first collection that matches a known category
            let assignedCategory = 'uncategorized';
            if (p.collections && p.collections.length > 0) {
                for (const col of p.collections) {
                    const catName = categoriesMap.get(col.collection_id);
                    if (catName) {
                        assignedCategory = catName;
                        break;
                    }
                }
            }
            // Fallback: Check if type matches
            if (assignedCategory === 'uncategorized' && p.type && p.type.value) {
                 assignedCategory = p.type.value.toLowerCase();
            }

            return { ...p, category: assignedCategory };
        });

        // 4. Filter by Prop (if category prop is passed)
        if (category && category !== 'all') {
             fetchedProducts = fetchedProducts.filter(p => 
                 p.category.includes(category.toLowerCase()) || 
                 (p.title && p.title.toLowerCase().includes(category.toLowerCase()))
             );
        }

        // 5. Featured Logic (Mock: just take the first N)
        if (featured && limit) {
             fetchedProducts = fetchedProducts.slice(0, limit);
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products at this time.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category, limit, featured]);

  // Client-side filtering for the pill buttons
  const displayedProducts = showFilters && activeFilter !== 'all'
    ? products.filter(p => p.category.includes(activeFilter.toLowerCase()))
    : products;

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center text-brand-yellow">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-red-500 gap-2">
        <AlertCircle className="w-8 h-8" />
        <p>{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
            Retry
        </Button>
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        <p>No products found in this category.</p>
        <Button asChild variant="link" className="text-brand-yellow mt-2">
             <Link to="/shop">View All Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['all', 'tubes', 'boards', 'fittings', 'systems', 'safety'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                activeFilter === f 
                  ? 'bg-brand-yellow text-black border-brand-yellow' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col"
          >
            <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-white p-4">
              <img
                src={product.image || 'https://placehold.co/400x400?text=No+Image'}
                alt={product.title}
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              {/* Mock Low Stock Indicator if inventory is low */}
              {product.variants?.[0]?.inventory_quantity < 10 && product.variants?.[0]?.inventory_quantity > 0 && (
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  Low Stock
                </span>
              )}
            </Link>

            <div className="p-4 flex flex-col flex-grow bg-white dark:bg-zinc-900">
              <div className="mb-2">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider block mb-1">
                  {product.category !== 'uncategorized' ? product.category : 'Equipment'}
                </span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-yellow transition-colors line-clamp-2 min-h-[3rem]">
                    {product.title}
                  </h3>
                </Link>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                <span className="text-lg font-bold text-brand-black dark:text-white">
                  {formatCurrency(product.price_in_cents, product.currency ? { code: product.currency } : undefined)}
                </span>
                <Button
                  size="sm"
                  onClick={() => addToCart(product, product.variants[0], 1, product.variants[0]?.inventory_quantity || 100)}
                  className="bg-brand-yellow text-black hover:bg-brand-yellow/90 font-bold"
                  disabled={!product.purchasable}
                >
                  <ShoppingCart size={16} className="mr-1" /> Add
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;