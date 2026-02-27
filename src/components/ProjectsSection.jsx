import React from 'react';
import { motion } from 'framer-motion';
import { HardHat } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const ProjectsSection = ({ locationSlug, locationName }) => {
  // Filter projects by exact slug first, then maybe fallback to region or show generics if needed
  // For this strict implementation, we match slug or 'general' if none found to ensure UI isn't empty
  const locationProjects = projects.filter(p => p.locationSlug === locationSlug);
  
  // Fallback logic: if no specific projects, check if we have parent matches or use generics
  // Simplified: If < 2 projects, add some generic ones to fill the grid
  const displayProjects = [...locationProjects];
  
  if (displayProjects.length < 3) {
      const genericProjects = projects.filter(p => p.locationSlug === 'general');
      displayProjects.push(...genericProjects);
  }
  
  // Limit to 3-4
  const finalProjects = displayProjects.slice(0, 3);

  if (finalProjects.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-brand-yellow/10 rounded-full mb-4">
            <HardHat className="w-6 h-6 text-brand-yellow" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-montserrat">
            Recent Projects in <span className="text-brand-yellow">{locationName}</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Take a look at some of our recent scaffolding work completed for satisfied clients in {locationName} and the surrounding areas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;