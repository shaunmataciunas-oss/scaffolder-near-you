import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Award, Shield, Users, Clock } from 'lucide-react';

const TrustSignals = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Ancoats, Manchester',
      rating: 5,
      text: 'Absolutely brilliant service! The team were professional, punctual, and the scaffolding was erected perfectly. Would highly recommend to anyone in Manchester.',
      project: 'Residential Extension'
    },
    {
      name: 'Mark Thompson',
      location: 'Deansgate, Manchester',
      rating: 5,
      text: 'Used them for our commercial building renovation. Excellent communication throughout, competitive pricing, and the quality of work was outstanding.',
      project: 'Commercial Renovation'
    },
    {
      name: 'Emma Davies',
      location: 'Eccles',
      rating: 5,
      text: 'Quick response time and very helpful staff. They explained everything clearly and completed the job ahead of schedule. Very impressed!',
      project: 'Roof Repairs'
    },
    {
      name: 'David Wilson',
      location: 'Bolton',
      rating: 5,
      text: 'Safety-first approach and incredibly reliable. The team went above and beyond to ensure our project ran smoothly. Can\'t fault them at all.',
      project: 'House Extension'
    }
  ];

  const projectImages = [
    {
      url: 'https://images.unsplash.com/photo-1699625809637-31c6f327ac96',
      title: 'Commercial Building Project'
    },
    {
      url: 'https://images.unsplash.com/photo-1623951005959-b7eb46bffc40',
      title: 'Residential Scaffolding'
    },
    {
      url: 'https://images.unsplash.com/photo-1624211114565-f4b8e0b76261',
      title: 'High-Rise Construction'
    },
    {
      url: 'https://images.unsplash.com/photo-1579444043299-5525bdea5c0c',
      title: 'Industrial Project'
    }
  ];

  const accreditations = [
    { icon: Award, title: 'NASC Certified', description: 'National Access & Scaffolding Confederation' },
    { icon: Shield, title: 'ISO 45001', description: 'Health & Safety Management' },
    { icon: Users, title: '£10M Insured', description: 'Public Liability Coverage' },
    { icon: Clock, title: '15+ Years', description: 'Industry Experience' }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-brand-black">
      <div className="container mx-auto px-4">
        {/* Accreditations */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 font-montserrat text-white">
            Certified & Trusted
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {accreditations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-brand-secondary hover:bg-brand-secondary/80 transition-colors border border-gray-800"
              >
                <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-montserrat text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 font-montserrat text-white">
            What Our Clients Say
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-brand-secondary rounded-xl p-8 md:p-12 border border-gray-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div>
                    <p className="font-bold text-white font-montserrat">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].project}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-brand-black border border-gray-700 hover:border-brand-yellow transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-brand-yellow" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-brand-black border border-gray-700 hover:border-brand-yellow transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-brand-yellow" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12 font-montserrat text-white">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectImages.map((image, index) => (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer border border-gray-800"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{image.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;