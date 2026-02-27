import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-brand-yellow text-black font-semibold px-0.5 rounded-sm">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const FAQItem = ({ item, searchTerm, isOpen, onToggle }) => {
  return (
    <motion.div 
      initial={false}
      className={`border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-4 bg-white dark:bg-zinc-900 transition-shadow duration-300 ${isOpen ? 'shadow-lg border-brand-yellow/50' : 'shadow-sm hover:shadow-md'}`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <div className="flex items-center gap-4 pr-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-yellow text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-brand-yellow/20'}`}>
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className={`font-montserrat font-bold text-lg transition-colors ${isOpen ? 'text-brand-black dark:text-brand-yellow' : 'text-gray-800 dark:text-white'}`}>
            <HighlightText text={item.question} highlight={searchTerm} />
          </h3>
        </div>
        
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-brand-yellow' : ''}`} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: 20 },
              collapsed: { opacity: 0, height: 0, marginBottom: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pl-[4.5rem] pr-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              <HighlightText text={item.answer} highlight={searchTerm} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQAccordion = ({ items, searchTerm }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
        <p className="text-gray-500">
          We couldn't find any answers matching "{searchTerm}".<br />
          Try checking for typos or searching for a different keyword.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          searchTerm={searchTerm}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;