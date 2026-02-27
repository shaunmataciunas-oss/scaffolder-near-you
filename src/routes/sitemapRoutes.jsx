import React, { useEffect, useState } from 'react';
import { 
  getSitemapData, 
  generateSitemapXml, 
  generateSitemapIndex 
} from '@/utils/sitemapGenerator';
import { SITE_URL } from '@/lib/seoHelpers';

// Wrapper to render raw XML in the browser
const XmlRenderer = ({ content }) => {
  return (
    <pre style={{ 
      wordWrap: 'break-word', 
      whiteSpace: 'pre-wrap', 
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      color: '#333'
    }}>
      {content}
    </pre>
  );
};

export const SitemapIndexRoute = () => {
  const [xml, setXml] = useState('');

  useEffect(() => {
    const sitemaps = [
      `${SITE_URL}/sitemap-main.xml`,
      `${SITE_URL}/sitemap-locations.xml`,
      `${SITE_URL}/sitemap-sub-locations.xml`,
      `${SITE_URL}/sitemap-blog.xml`
    ];
    setXml(generateSitemapIndex(sitemaps));
  }, []);

  return <XmlRenderer content={xml} />;
};

export const SitemapMainRoute = () => {
  const [xml, setXml] = useState('');
  useEffect(() => {
    const { main } = getSitemapData();
    setXml(generateSitemapXml(main));
  }, []);
  return <XmlRenderer content={xml} />;
};

export const SitemapLocationsRoute = () => {
  const [xml, setXml] = useState('');
  useEffect(() => {
    const { locations } = getSitemapData();
    setXml(generateSitemapXml(locations));
  }, []);
  return <XmlRenderer content={xml} />;
};

export const SitemapSubLocationsRoute = () => {
  const [xml, setXml] = useState('');
  useEffect(() => {
    const { subLocations } = getSitemapData();
    setXml(generateSitemapXml(subLocations));
  }, []);
  return <XmlRenderer content={xml} />;
};

export const SitemapBlogRoute = () => {
  const [xml, setXml] = useState('');
  useEffect(() => {
    const { blog } = getSitemapData();
    setXml(generateSitemapXml(blog));
  }, []);
  return <XmlRenderer content={xml} />;
};