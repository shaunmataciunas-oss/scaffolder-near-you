import React from 'react';
import { MessageSquare } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/data/testimonials';

const TestimonialsSection = ({ locationSlug, locationName }) => {
  const locationTestimonials = testimonials.filter(t => t.locationSlug === locationSlug);
  
  // Fallback to generic if < 2
  const displayTestimonials = [...locationTestimonials];
  if (displayTestimonials.length < 2) {
      const generic = testimonials.filter(t => t.locationSlug === 'general');
      displayTestimonials.push(...generic);
  }
  
  const finalTestimonials = displayTestimonials.slice(0, 3);

  if (finalTestimonials.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2 text-brand-yellow font-bold uppercase tracking-wider text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span>Client Reviews</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-montserrat">
                    What Our Clients Say in <span className="text-brand-yellow">{locationName}</span>
                </h2>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;