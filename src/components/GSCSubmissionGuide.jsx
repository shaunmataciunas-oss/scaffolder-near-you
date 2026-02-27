import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

const GuideStep = ({ number, title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left"
      >
        <span className="font-bold flex items-center gap-3 text-gray-900 dark:text-white">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-yellow text-brand-black text-sm">
            {number}
          </span>
          {title}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      
      {isOpen && (
        <div className="p-4 bg-white dark:bg-black text-gray-600 dark:text-gray-300 text-sm space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

const GSCSubmissionGuide = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex gap-3">
        <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1">Why Submit to Google Search Console?</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Submitting your sitemap tells Google exactly which pages exist on your site, helping them index your content faster and more accurately. This is crucial for SEO performance.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-montserrat">
          Step-by-Step Submission Guide
        </h2>

        <GuideStep number="1" title="Access Google Search Console">
          <p>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline inline-flex items-center gap-1">Google Search Console <ExternalLink className="w-3 h-3"/></a> and sign in with your Google account.</p>
        </GuideStep>

        <GuideStep number="2" title="Select Your Property">
          <p>In the top-left dropdown menu, select the property (domain) for <strong>scaffoldersnearyou.co.uk</strong>. If you haven't added it yet, click "Add property" and follow the domain verification steps.</p>
        </GuideStep>

        <GuideStep number="3" title="Navigate to Sitemaps">
          <p>In the left-hand sidebar menu, under the "Indexing" section, click on <strong>Sitemaps</strong>.</p>
        </GuideStep>

        <GuideStep number="4" title="Enter Sitemap URL">
          <p>In the "Add a new sitemap" field, enter your sitemap index URL:</p>
          <div className="bg-gray-100 dark:bg-zinc-800 p-2 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs select-all mt-2">
            sitemap_index.xml
          </div>
          <p className="mt-2 text-xs text-gray-500">Note: You usually only need to submit the index file. Google will automatically discover the sub-sitemaps.</p>
        </GuideStep>

        <GuideStep number="5" title="Submit">
          <p>Click the <strong>SUBMIT</strong> button. Google will process the file immediately.</p>
        </GuideStep>

        <GuideStep number="6" title="Verify Status">
          <p>Look at the "Submitted sitemaps" table below. You should see "Success" in the Status column.</p>
          <p className="mt-1">If you see "Couldn't fetch", wait 10 minutes and try again, or check your robots.txt file.</p>
        </GuideStep>

        <GuideStep number="7" title="Monitor Coverage">
          <p>Over the next few days, check the "Page indexing" report to see how many of your submitted pages have been successfully indexed.</p>
        </GuideStep>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Verification Checklist
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5" />
            <span>Robots.txt file exists and allows crawling</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5" />
            <span>Sitemap index URL is accessible publicly</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5" />
            <span>Sitemaps contain valid XML syntax (checked automatically)</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5" />
            <span>URLs in sitemap match your canonical domain (https)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GSCSubmissionGuide;