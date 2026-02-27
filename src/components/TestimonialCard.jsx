import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { format } from 'date-fns';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl relative border border-gray-100 dark:border-gray-800 shadow-sm h-full flex flex-col"
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-yellow/20" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img 
            src={testimonial.imageUrl} 
            alt={testimonial.customerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow"
            loading="lazy"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.customerName}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-300 dark:text-gray-700'}`} 
          />
        ))}
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow italic">
        "{testimonial.reviewText}"
      </p>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto flex justify-between items-center text-xs">
         <span className="text-gray-400">
           {testimonial.date ? format(new Date(testimonial.date), 'MMM d, yyyy') : ''}
         </span>
         <span className="px-2 py-1 bg-white dark:bg-black rounded border border-gray-200 dark:border-gray-700 text-gray-500">
            {testimonial.projectType}
         </span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;