import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {/* Custom Scaffolding Icon */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform group-hover:scale-105"
        >
          {/* Vertical Poles */}
          <rect x="10" y="2" width="4" height="36" rx="1" fill="#F6E71D" />
          <rect x="26" y="2" width="4" height="36" rx="1" fill="#F6E71D" />
          
          {/* Horizontal Bars */}
          <rect x="6" y="12" width="28" height="4" rx="1" fill="#F6E71D" />
          <rect x="6" y="24" width="28" height="4" rx="1" fill="#F6E71D" />
          
          {/* Couplers/Joints (Black to provide industrial detail/contrast) */}
          <rect x="9" y="12" width="6" height="4" rx="1" fill="#181818" />
          <rect x="25" y="12" width="6" height="4" rx="1" fill="#181818" />
          <rect x="9" y="24" width="6" height="4" rx="1" fill="#181818" />
          <rect x="25" y="24" width="6" height="4" rx="1" fill="#181818" />

          {/* Diagonal Brace */}
          <path d="M14 14L26 26" stroke="#F6E71D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Horizontal Text */}
      <span className="text-xl font-bold font-montserrat tracking-tight whitespace-nowrap">
        <span className="text-white">Scaffolders</span>{' '}
        <span className="text-brand-yellow">near you</span>
      </span>
    </Link>
  );
};

export default Logo;