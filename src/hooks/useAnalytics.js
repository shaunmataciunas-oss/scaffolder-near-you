import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
  const location = useLocation();
  const GA4_ID = import.meta.env.VITE_GA4_ID;

  // Track page views
  useEffect(() => {
    if (typeof window.gtag === 'function' && GA4_ID) {
      window.gtag('config', GA4_ID, {
        page_path: location.pathname + location.search
      });
    }
  }, [location, GA4_ID]);

  // Track custom events
  const trackEvent = (eventName, eventData = {}) => {
    if (typeof window.gtag === 'function' && GA4_ID) {
      window.gtag('event', eventName, eventData);
    } else {
      console.log('GA4 Event (Dev):', eventName, eventData);
    }
  };

  return { trackEvent };
};