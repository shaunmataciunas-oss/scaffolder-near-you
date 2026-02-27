import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import LocationPage from '@/pages/LocationPage';
import LocationsIndexPage from '@/pages/LocationsIndexPage';
import ServicesPage from '@/pages/ServicesPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import FAQPage from '@/pages/FAQPage';
import ShopPage from '@/pages/ShopPage';
import CategoryPage from '@/pages/CategoryPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';
import RegionalHubPage from '@/pages/RegionalHubPage';
import HtmlSitemapPage from '@/pages/HtmlSitemapPage';
import MaintenanceChecklist from '@/pages/MaintenanceChecklist';
import SitemapManagementPage from '@/pages/SitemapManagementPage';
import SitemapDownloadPage from '@/pages/SitemapDownloadPage';
import Preloader from '@/components/Preloader';
import CookieBanner from '@/components/CookieBanner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { CartProvider } from '@/hooks/useCart';

function App() {
  // Initialize Analytics
  useAnalytics();

  return (
    <CartProvider>
      <Preloader>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            
            {/* Shop Routes */}
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:categoryName" element={<CategoryPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/success" element={<SuccessPage />} />
            
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/faq" element={<FAQPage />} />
            
            {/* Location Routes */}
            <Route path="/locations" element={<LocationsIndexPage />} />
            {/* Both parent cities and sub-locations use this route via their unique slug */}
            <Route path="/locations/:slug" element={<LocationPage />} />
            <Route path="/location/:slug" element={<LocationPage />} /> 

            {/* Regional Hub Pages */}
            <Route path="/region/:regionSlug" element={<RegionalHubPage />} />

            {/* Admin Routes */}
            <Route 
              path="/maintenance" 
              element={
                <ProtectedRoute>
                  <MaintenanceChecklist />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/sitemap-management" 
              element={
                <ProtectedRoute>
                  <SitemapManagementPage />
                </ProtectedRoute>
              } 
            />

            {/* Public Sitemap Pages */}
            <Route path="/sitemaps" element={<SitemapDownloadPage />} />
            <Route path="/html-sitemap" element={<HtmlSitemapPage />} />

          </Routes>
        </Layout>
        <CookieBanner />
      </Preloader>
    </CartProvider>
  );
}

export default App;