import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, Tag, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { SITE_URL, truncateText } from '@/lib/seoHelpers';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Sort posts by date for correct navigation
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  const post = sortedPosts.find(p => p.slug === slug);
  const currentIndex = sortedPosts.findIndex(p => p.slug === slug);
  
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null; // Newer post
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null; // Older post
  
  const relatedPosts = blogPosts
    .filter(p => p.id !== post?.id)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button asChild className="bg-brand-yellow text-brand-black">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const pageTitle = `${post.title} - Scaffolding Industry Insights`;
  const pageDescription = truncateText(post.metaDescription || post.excerpt, 160);
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`scaffolding, ${post.category.toLowerCase()}, scaffolding news, construction blog, ${post.title.toLowerCase().split(' ').join(', ')}`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
      </Helmet>

      <article className="min-h-screen bg-white dark:bg-brand-black text-gray-900 dark:text-white pb-20">
        {/* Post Header / Hero */}
        <div className="relative h-[60vh] min-h-[500px]">
          <div className="absolute inset-0">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <Link 
              to="/blog" 
              className="absolute top-8 left-4 md:left-8 inline-flex items-center text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all text-sm font-medium z-10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-montserrat leading-tight drop-shadow-lg">
                {post.title}
              </h1>
              
              {post.subtitle && (
                <h2 className="text-xl md:text-2xl text-gray-200 mb-6 font-medium italic">
                  {post.subtitle}
                </h2>
              )}
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base border-t border-gray-600 pt-6 mt-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-yellow" />
                  <span className="font-medium text-white">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-yellow" />
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Post Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
            
            {/* Main Content */}
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-brand-black dark:prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-brand-yellow prose-h3:text-xl
                  prose-a:text-brand-yellow prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-brand-black dark:prose-strong:text-white 
                  prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-li:text-gray-600 dark:prose-li:text-gray-300
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:max-w-full"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Navigation Links */}
              <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  {prevPost ? (
                    <Link 
                      to={`/blog/${prevPost.slug}`}
                      className="group flex flex-col items-start text-left max-w-xs"
                    >
                      <span className="text-sm text-gray-400 mb-1 flex items-center group-hover:text-brand-yellow transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous Article
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white group-hover:underline line-clamp-2">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div /> 
                  )}
                  
                  {nextPost ? (
                    <Link 
                      to={`/blog/${nextPost.slug}`}
                      className="group flex flex-col items-end text-right max-w-xs"
                    >
                      <span className="text-sm text-gray-400 mb-1 flex items-center group-hover:text-brand-yellow transition-colors">
                        Next Article <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white group-hover:underline line-clamp-2">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                     <div />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar / Share */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Share this post</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-colors">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    {/* Placeholder buttons for social share */}
                  </div>
                </div>

                <div className="bg-brand-secondary p-6 rounded-xl border border-brand-yellow/30 text-white">
                  <h3 className="text-xl font-bold mb-3 font-montserrat">Need Scaffolding?</h3>
                  <p className="text-sm text-gray-300 mb-6">
                    Get a free, no-obligation quote for your residential or commercial project in Bolton & Manchester.
                  </p>
                  <Button asChild className="w-full bg-brand-yellow text-brand-black hover:bg-white hover:text-brand-black font-bold">
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-brand-black py-16 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
             <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-montserrat">
                  Ready to Start Your Project?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Whether it's a small repair or a major construction, our team is ready to provide safe, reliable scaffolding solutions tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-brand-yellow text-brand-black hover:bg-white hover:text-brand-black font-bold px-8 text-lg h-14">
                    <Link to="/contact">Get Your Free Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-black font-bold px-8 text-lg h-14">
                    <a href="tel:01204123456">Call 01204 123 456</a>
                  </Button>
                </div>
             </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 font-montserrat text-center">
              More from the Blog
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={relatedPost.featuredImage} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-yellow text-brand-black px-2 py-1 rounded text-xs font-bold uppercase shadow-sm">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-brand-yellow text-sm font-bold mt-auto">
                      Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="border-brand-black dark:border-white text-brand-black dark:text-white hover:bg-brand-yellow hover:text-black hover:border-brand-yellow px-8">
                <Link to="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default BlogPostPage;