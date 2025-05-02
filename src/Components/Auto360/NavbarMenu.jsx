

import React, { useState, useRef, useEffect } from 'react';

function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { name: "While Buying", path: "/", hasDropdown: true },
    { name: "While Selling", path: "/ad-management" },
    { name: "Maintenance & Repair", path: "/" },
    { name: "Credit", path: "/" },
    { name: "Zero Vehicle World", path: "/" },
  ];

  const dropdownItems = [
    { name: 'Vehicle Comparison', path: '/vehicle-comparison' },
    { name: 'Vehicle Valuation', path: '/vehicle-valuation' },
    { name: 'Vehicle Damage Inquiry', path: '/vehicle-damage-inquiry' },
    { name: 'Auto Expertise', path: '/auto-expertise' },
    { name: 'Vehicle Buying Guide', path: '/vehicle-buying-guide' },
    { name: 'Auto Dictionary', path: '/auto-dictionary' }
  ];

  return (
    <div className="flex items-center h-[70px] justify-center w-full max-w-7xl mx-auto">
      <div className="flex gap-8 cursor-pointer">
        {links.map((link, index) => 
          link.hasDropdown ? (
            <div key={index} className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`text-[16px] font-[400] font-poppins flex items-center gap-1 ${
                  link.active ? "text-[#1544AB]" : "text-[#231E1C]"
                }`}
              >
                {link.name}
                <svg 
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {dropdownItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.path}
                      className="block px-4 py-3 text-sm font-[400] font-poppins text-[#231E1C] hover:bg-gray-50 hover:text-[#1544AB]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <a
              key={index}
              href={link.path}
              className={`text-[16px] font-[400] font-poppins ${
                link.active ? "text-[#1544AB]" : "text-[#231E1C]"
              }`}
            >
              {link.name}
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default NavbarMenu;