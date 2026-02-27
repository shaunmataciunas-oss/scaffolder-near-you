import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const QuickQuoteForm = ({ prefilledLocation = '' }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: prefilledLocation,
    projectDetails: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
      quotes.push({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('quotes', JSON.stringify(quotes));

      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours.",
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        location: prefilledLocation,
        projectDetails: ''
      });
      setErrors({});
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-secondary rounded-xl shadow-lg p-8 border border-gray-800"
    >
      <h2 className="text-2xl font-bold mb-2 font-montserrat text-white">Get Your Free Quote</h2>
      <p className="text-gray-400 mb-6">Fill in the form and we'll get back to you within 24 hours</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-brand-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow text-white placeholder-gray-500 ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="John Smith"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-brand-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow text-white placeholder-gray-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="07123 456789"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-brand-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow text-white placeholder-gray-500 ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow text-white placeholder-gray-500"
            placeholder="Manchester"
          />
        </div>

        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-300 mb-1">
            Project Details *
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-brand-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow text-white placeholder-gray-500 ${
              errors.projectDetails ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="Describe your scaffolding requirements..."
          />
          {errors.projectDetails && <p className="text-red-500 text-sm mt-1">{errors.projectDetails}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black py-6 text-lg font-bold"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Get Free Quote
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default QuickQuoteForm;