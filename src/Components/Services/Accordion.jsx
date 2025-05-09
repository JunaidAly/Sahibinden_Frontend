import React, { useState } from 'react';

const Accordion = ({ onComponentChange }) => {
  const [activeSection, setActiveSection] = useState('auto360'); // Default to auto360

  const handleSectionClick = (section) => {
    // If the same section is clicked again, keep it active
    setActiveSection(section);
    onComponentChange(section);
  };

  return (
    <div className="w-full h-max font-poppins max-w-sm mx-auto border border-[#1E3A8A]">
      {/* Auto 360 Button */}
      <button 
        className={`w-full text-left p-3 text-2xl font-light ${
          activeSection === 'auto360' 
            ? 'bg-[#1E3A8A] text-white' 
            : 'bg-white text-[#1E3A8A]'
        } transition-colors duration-200`}
        onClick={() => handleSectionClick('auto360')}
      >
        Auto 360
      </button>
      
      {/* Real Estate 360 Button */}
      <button 
        className={`w-full text-left p-3 text-2xl font-light ${
          activeSection === 'realEstate360' 
            ? 'bg-[#1E3A8A] text-white' 
            : 'bg-white text-[#1E3A8A]'
        } transition-colors duration-200 border-t border-white/20`}
        onClick={() => handleSectionClick('realEstate360')}
      >
        Real Estate 360
      </button>
    </div>
  );
};

export default Accordion;