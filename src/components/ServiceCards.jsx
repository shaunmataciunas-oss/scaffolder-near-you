import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, ShieldCheck, Zap, Wrench, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceCards = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Scaffolding',
      description: 'Safe and reliable scaffolding solutions for home renovations, extensions, and repairs.',
      features: ['House Extensions', 'Roof Repairs', 'Painting & Decorating']
    },
    {
      icon: Building2,
      title: 'Commercial Projects',
      description: 'Large-scale scaffolding for commercial buildings, offices, and industrial sites.',
      features: ['Office Buildings', 'Warehouses', 'Retail Premises']
    },
    {
      icon: ShieldCheck,
      title: 'Safety Equipment',
      description: 'Full range of safety equipment and edge protection systems for maximum safety.',
      features: ['Edge Protection', 'Safety Netting', 'Harnesses & PPE']
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Emergency scaffolding services available 24/7 for urgent projects and repairs.',
      features: ['24/7 Availability', 'Same-Day Service', 'Emergency Response']
    },
    {
      icon: Wrench,
      title: 'Inspection & Maintenance',
      description: 'Regular scaffolding inspections and maintenance to ensure compliance and safety.',
      features: ['Weekly Inspections', 'Compliance Reports', 'Maintenance Service']
    },
    {
      icon: Users,
      title: 'Bespoke Solutions',
      description: 'Custom-designed scaffolding solutions tailored to your specific project needs.',
      features: ['Custom Design', 'Complex Structures', 'Specialist Access']
    }
  ];

  return (
    <section className="py-16 bg-brand-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-montserrat text-white">Our Services</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional scaffolding services for residential and commercial projects across Greater Manchester
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-brand-secondary rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 cursor-pointer border border-gray-800 hover:border-brand-yellow/50"
            >
              <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-brand-yellow" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 font-montserrat text-white">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" className="w-full">
                <Link to="/services">Learn More</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;