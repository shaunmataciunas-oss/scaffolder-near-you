import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {project.scaffoldingType}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-gray-500 mb-2 gap-2">
           <span className="flex items-center gap-1 text-brand-yellow font-semibold uppercase tracking-wider">
             <MapPin className="w-3 h-3" /> {project.locationSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
           </span>
           <span>•</span>
           <span>{project.projectType}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-montserrat leading-tight group-hover:text-brand-yellow transition-colors">
          {project.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="mt-auto">
           <div className="space-y-2 mb-4">
              {project.highlights && project.highlights.slice(0, 3).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                   <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                   <span>{highlight}</span>
                </div>
              ))}
           </div>
           
           <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Completed: {project.completionDate ? format(new Date(project.completionDate), 'MMM yyyy') : 'Recently'}
              </span>
              <span>{project.duration}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;