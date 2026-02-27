import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, MessageCircle, CheckCircle, ArrowRight, MapPin, HardHat, Hammer, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_URL, DEFAULT_IMAGE, generateLocalBusinessSchema } from '@/lib/seoHelpers';

// Data for the FAQ sections
const faqSections = [
  {
    id: "service-areas",
    icon: MapPin,
    title: "📍 Service Areas – 831 UK Coverage",
    questions: [
      {
        q: "Which areas do you cover across the UK?",
        a: "We cover 831 unique locations across the United Kingdom, including all major cities like London, Manchester, Birmingham, Glasgow, and Cardiff, as well as smaller towns and rural areas. Check our <a href='/locations' class='text-brand-yellow hover:underline font-medium'>Service Areas</a> page for a full directory."
      },
      {
        q: "How do I check if you have scaffolders near me?",
        a: "Simply enter your postcode or town name in our search bar on the homepage. Our system instantly matches you with verified scaffolders in your specific area from our network of over 800 locations."
      },
      {
        q: "Do you cover residential and commercial projects?",
        a: "Yes, our network includes scaffolders specialized in both residential projects (extensions, repairs, painting) and large-scale commercial industrial works."
      }
    ]
  },
  {
    id: "for-customers",
    icon: HardHat,
    title: "👷 For Customers – How It Works",
    questions: [
      {
        q: "Is this service really free for customers?",
        a: "Yes! It is 100% free for homeowners and businesses to request quotes. You simply post your job details, and we connect you with local scaffolders. You only pay the scaffolder you choose to hire for the actual work."
      },
      {
        q: "How does the quote process work?",
        a: "1. Fill out our <a href='/get-quotes' class='text-brand-yellow hover:underline font-medium'>Get Quotes</a> form.<br/>2. We send your request to local scaffolders.<br/>3. Up to 3 scaffolders will contact you with their best prices.<br/>4. You compare and hire the best one."
      },
      {
        q: "Are the scaffolders vetted?",
        a: "We perform checks on all scaffolders joining our network to ensure they are legitimate businesses. However, we always recommend customers ask for insurance certificates and check recent references before hiring."
      },
      {
        q: "How quickly will I receive quotes?",
        a: "Most customers receive their first contact within minutes during business hours. We aim to get you up to 3 quotes within 24 hours so you can move forward with your project."
      },
      {
        q: "What if I'm not happy with the quotes?",
        a: "There is no obligation to hire. If none of the quotes meet your needs, you are free to look elsewhere. We strive to provide competitive pricing through our network."
      }
    ]
  },
  {
    id: "for-scaffolders",
    icon: Hammer,
    title: "🔧 For Scaffolders – Join & Pricing",
    questions: [
      {
        q: "How much do leads cost?",
        a: "We charge a simple, flat fee of <strong>£5 per lead</strong>. There are no signup fees, no monthly subscriptions, and no hidden charges. You only pay for the leads you want."
      },
      {
        q: "How do I join the network?",
        a: "Visit our <a href='/scaffolder-signup' class='text-brand-yellow hover:underline font-medium'>Scaffolder Signup</a> page, enter your business details and coverage area. Once verified, you can start receiving leads immediately."
      },
      {
        q: "Are the leads exclusive?",
        a: "We limit each lead to a maximum of 3 scaffolders. This ensures you have a high chance of winning the job while giving the customer a fair choice."
      },
      {
        q: "Is there a long-term contract?",
        a: "No. Our service is pay-as-you-go. You can stop purchasing leads at any time without penalty. We believe our quality leads will keep you staying with us."
      },
      {
        q: "What if I get a bad lead?",
        a: "We have a quality guarantee. If a lead has invalid contact details, simply report it within 48 hours via your dashboard, and we will credit your account."
      }
    ]
  },
  {
    id: "competitive-pricing",
    icon: Coins,
    title: "💸 Competitive Pricing – Why Choose Us?",
    questions: [
      {
        q: "How do you compare to Checkatrade or Bark?",
        a: "Unlike competitors who often charge high monthly subscriptions plus expensive lead fees (often £20-£50+), we charge <strong>zero subscription fees</strong> and just <strong>£5 per lead</strong>. We are built to maximize ROI for scaffolders."
      },
      {
        q: "Why are your leads so affordable?",
        a: "We use automated technology to verify and distribute leads efficiently, cutting out overhead costs. We pass these savings directly to our scaffolders."
      },
      {
        q: "What is the typical ROI?",
        a: "With a £5 lead cost, securing just one small residential job (e.g., £500) can pay for 100 leads. The return on investment is typically extremely high compared to traditional advertising."
      },
      {
        q: "Are there any hidden fees?",
        a: "Absolutely none. We pride ourselves on transparency. See our <a href='/pricing' class='text-brand-yellow hover:underline font-medium'>Pricing Page</a> for full details."
      }
    ]
  }
];

const FAQPage = () => {
  // State for accordion functionality
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSections.flatMap(section => 
      section.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a.replace(/<[^>]*>?/gm, '') // Strip HTML tags for schema text
        }
      }))
    )
  };

  const pageTitle = "Scaffolding FAQs - Common Questions About Scaffolding Services";
  const pageDescription = "Find answers to common questions about scaffolding services, costs, safety, and finding local scaffolders. Expert answers to your scaffolding questions.";
  const canonicalUrl = `${SITE_URL}/faq`;

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="scaffolding questions, scaffolding costs, scaffolding safety, hiring scaffolders faq, scaffolding permit questions" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black z-0" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6"
            >
              <Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">FAQ</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-montserrat">
                Scaffolding Near You <br />
                <span className="text-brand-yellow">National Lead Generation FAQ</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                Your guide to the UK's most affordable and extensive scaffolding network. Covering 831 locations with premium leads for just £5.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Takeaway Box */}
      <section className="bg-gray-50 dark:bg-zinc-900 pt-12 pb-6 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg border-l-4 border-brand-yellow p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="text-brand-yellow w-6 h-6" />
              Key Takeaways
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
              <div className="flex flex-col gap-2">
                <span className="text-brand-black dark:text-brand-yellow font-bold text-lg">831 Locations</span>
                <p className="text-sm">We provide truly national coverage across every region of the UK.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-brand-black dark:text-brand-yellow font-bold text-lg">Free for Customers</span>
                <p className="text-sm">Homeowners and businesses request quotes at absolutely zero cost.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-brand-black dark:text-brand-yellow font-bold text-lg">£5 Per Lead</span>
                <p className="text-sm">Scaffolders pay a flat, fair rate with no hidden subscription fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 dark:bg-zinc-900 sticky top-0 z-30 shadow-sm border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex flex-nowrap md:justify-center gap-4 min-w-max">
            {faqSections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-yellow hover:border-brand-yellow transition-all flex items-center gap-2"
              >
                <section.icon className="w-4 h-4" />
                {section.title.split('–')[0]}
              </a>
            ))}
            <a 
              href="#cta"
              className="px-4 py-2 rounded-full bg-brand-yellow text-brand-black border border-brand-yellow text-sm font-bold hover:bg-yellow-400 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <div className="bg-gray-50 dark:bg-zinc-900 pb-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-16">
          
          {faqSections.map((section, sIdx) => (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="p-3 bg-brand-yellow/10 rounded-lg">
                  <section.icon className="w-8 h-8 text-brand-yellow" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.questions.map((item, qIdx) => {
                  const isOpen = openItems[`${sIdx}-${qIdx}`];
                  return (
                    <motion.div 
                      key={qIdx}
                      initial={false}
                      className={`rounded-xl border transition-all duration-200 ${
                        isOpen 
                          ? 'bg-white dark:bg-zinc-800 border-brand-yellow shadow-md' 
                          : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(sIdx, qIdx)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-gray-900 dark:text-white text-lg pr-4">
                          {item.q}
                        </span>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180 text-brand-yellow' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/50 pt-4 mt-1">
                              <div 
                                dangerouslySetInnerHTML={{ __html: item.a }} 
                                className="prose dark:prose-invert max-w-none text-base"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-brand-secondary border-t border-gray-800 scroll-mt-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-brand-black p-10 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -mr-8 -mt-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-tr-full -ml-8 -mb-8" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-brand-black" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
                🚀 Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                Whether you're looking to hire or looking for work, we have the perfect solution for you.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-zinc-900/80 p-6 rounded-xl border border-gray-700 flex flex-col items-center hover:border-brand-yellow transition-colors group">
                  <h3 className="text-xl font-bold text-white mb-2">For Customers</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">Get free, no-obligation quotes from local experts.</p>
                  <Button 
                    size="lg" 
                    className="w-full bg-brand-yellow text-brand-black hover:bg-white hover:text-brand-black font-bold"
                    asChild
                  >
                    <Link to="/get-quotes">
                      Get Quotes Free <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="bg-zinc-900/80 p-6 rounded-xl border border-gray-700 flex flex-col items-center hover:border-blue-500 transition-colors group">
                  <h3 className="text-xl font-bold text-white mb-2">For Scaffolders</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">Start getting leads today for just £5 per lead.</p>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full border-2 border-white text-white hover:bg-white hover:text-brand-black font-bold"
                    asChild
                  >
                    <Link to="/scaffolder-signup">
                      Join Network <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Need more help? Visit our <Link to="/contact" className="text-brand-yellow hover:underline">Contact Page</Link> or check our <Link to="/scaffolder-tips" className="text-brand-yellow hover:underline">Scaffolder Tips</Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;