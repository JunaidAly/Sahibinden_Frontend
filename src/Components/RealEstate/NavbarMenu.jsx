import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

function NavbarMenu() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = Object.values(dropdownRefs.current).every(
        ref => ref && !ref.contains(event.target)
      );
      
      if (isOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { name: "While Buying", path: "/", hasDropdown: true, id: "buying" },
    { name: "When Selling", path: "/", hasDropdown: true, id: "selling" },
    { name: "When Renting", path: "/" , hasDropdown: true, id: "renting" },
    { name: "Credit", path: "/credit-estate" },
  ];
  
  const dropdownContents = {
    buying: [
      { name: 'Real Estate Expertise', path: '/real-estate-expertise' },
      { name: 'Real Estate Index', path: '/real-estate-index' },
      { name: 'Credit', path: '/credit-estate' },
      { name: 'Property Buying Guide', path: '/property-buying-guide' },
      { name: 'Real Estate Dictionary', path: '/real-estate-dictionary' },
    ],
    selling: [
      { name: 'Real Estate Index', path: '/real-estate-index' },
      { name: 'Real Estate Sales Guide', path: '/selling-guides-page' },
      { name: 'Real Estate Dictionary', path: '/real-estate-dictionary' },
    ],
    renting: [
      { name: 'Real Estate Index', path: '/real-estate-index' },
      { name: 'Property Rental Guide', path: '/property-rental-guide' },
      { name: 'Real Estate Dictionary', path: '/real-estate-dictionary' },
    ]
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Check if a dropdown link should be active (either main link or any dropdown item matches current path)
  const isDropdownLinkActive = (link) => {
    if (location.pathname === link.path) return true;
    
    if (link.hasDropdown && dropdownContents[link.id]) {
      return dropdownContents[link.id].some(item => location.pathname === item.path);
    }
    
    return false;
  };

  return (
    <div className="flex items-center h-[70px] justify-center w-full max-w-7xl mx-auto">
      <div className="flex gap-8 cursor-pointer">
        {links.map((link, index) => 
          link.hasDropdown ? (
            <div 
              key={index} 
              className="relative" 
              ref={el => dropdownRefs.current[link.id] = el}
            >
              <div
                onClick={() => toggleDropdown(link.id)}
                className={`text-[16px] font-[400] font-poppins flex items-center gap-1 ${
                  isDropdownLinkActive(link) ? "text-[#1544AB]" : "text-[#231E1C]"
                }`}
              >
                {link.name}
                <svg 
                  className={`w-4 h-4 transition-transform ${openDropdown === link.id ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {openDropdown === link.id && (
                <div className="absolute top-full left-0 mt-2 w-max bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {dropdownContents[link.id].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className={`block px-4 py-3 text-sm font-[400] font-poppins hover:bg-gray-50 hover:text-[#1544AB] ${
                        location.pathname === item.path ? "text-[#1544AB] bg-gray-50" : "text-[#231E1C]"
                      }`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={index}
              to={link.path}
              className={`text-[16px] font-[400] font-poppins ${
                location.pathname === link.path ? "text-[#1544AB]" : "text-[#231E1C]"
              }`}
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default NavbarMenu;