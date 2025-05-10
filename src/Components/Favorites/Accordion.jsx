import React, { useState } from 'react';

const Accordion = ({ onComponentChange }) => {
  const [activeSection, setActiveSection] = useState('listing'); // Default to auto360

  const handleSectionClick = (section) => {
    // If the same section is clicked again, keep it active
    setActiveSection(section);
    onComponentChange(section);
  };

  return (
    <div className="w-full h-max font-poppins max-w-sm mx-auto border border-[#1E3A8A]">
      {/*  Favorites Listing Button */}
      <button 
        className={`w-full text-left p-3 border border-b-[#1E3A8A] text-2xl font-light ${
          activeSection === 'listing' 
            ? 'bg-[#1E3A8A] text-white' 
            : 'bg-white text-[#1E3A8A]'
        } transition-colors duration-200`}
        onClick={() => handleSectionClick('listing')}
      >
        Favorites Listing
      </button>
      
      {/* Favorite Searches Button */}
      <button 
        className={`w-full text-left p-3 border border-b-[#1E3A8A] text-2xl font-light ${
          activeSection === 'searches' 
            ? 'bg-[#1E3A8A] text-white' 
            : 'bg-white text-[#1E3A8A]'
        } transition-colors duration-200 border-t border-white/20`}
        onClick={() => handleSectionClick('searches')}
      >
        Favorite Searches
      </button>

      {/*  Favorite Sellers Button */}
      <button 
        className={`w-full text-left p-3 text-2xl font-light ${
          activeSection === 'sellers' 
            ? 'bg-[#1E3A8A] text-white' 
            : 'bg-white text-[#1E3A8A]'
        } transition-colors duration-200 border-t border-white/20`}
        onClick={() => handleSectionClick('sellers')}
      >
        Favorite Sellers
      </button>
    </div>
  );
};

export default Accordion;