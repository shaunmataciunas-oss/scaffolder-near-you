import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { SITE_URL, DEFAULT_IMAGE } from '@/lib/seoHelpers';

const BlogPage = () => {
  const pageTitle = "Scaffolding Industry Insights & News | ScaffoldersNearYou";
  const pageDescription = "Read the latest scaffolding industry insights, safety tips, and news. Expert advice for scaffolders and customers. Stay informed with our scaffolding blog.";
  const canonicalUrl = `${SITE_URL}/blog`;

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="scaffolding news, scaffolding blog, scaffolding safety tips, construction industry insights, scaffolding regulations, scaffolder advice" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black z-0" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-montserrat">
              Our <span className="text-brand-yellow">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest scaffolding safety tips, industry news, and company updates from Greater Manchester's leading scaffolding experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-800"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/10 transition-colors z-10" />
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative bg-brand-secondary/5 dark:bg-brand-black/90">
                  <div className="flex items-center text-xs text-gray-500 mb-4 gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-yellow" />
                      {post.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-brand-yellow" />
                      {post.author}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-montserrat line-clamp-2 group-hover:text-brand-yellow transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-bold text-brand-black dark:text-white hover:text-brand-yellow transition-colors"
                    >
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;