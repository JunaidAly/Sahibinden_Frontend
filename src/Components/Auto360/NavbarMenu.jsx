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
    { name: "While Selling", path: "/ad-management", hasDropdown: true, id: "selling" },
    { name: "Maintenance & Repair", path: "/maintenance-and-repair" },
    { name: "Credit", path: "/credit" },
    { name: "Zero Vehicle World", path: "/" , hasDropdown: true, id: "zerovehicleworld" },
  ];
  
  const dropdownContents = {
    buying: [
      { name: 'Vehicle Comparison', path: '/vehicle-comparison' },
      { name: 'Vehicle Valuation', path: '/vehicle-valuation' },
      { name: 'Vehicle Damage Inquiry', path: '/vehicle-damage-inquiry' },
      { name: 'Auto Expertise', path: '/auto-expertise' },
      { name: 'Vehicle Buying Guide', path: '/vehicle-buying-guide' },
      { name: 'Auto Dictionary', path: '/auto-dictionary' }
    ],
    selling: [
      { name: 'Vehicle Valuation', path: '/vehicle-valuation' },
      { name: 'Auto Expertise', path: '/auto-expertise' },
      { name: 'Vehicle Sales Guide', path: '/vehicle-selling-guide' },
      { name: 'Auto Dictionary', path: '/auto-dictionary' }
    ],
    zerovehicleworld: [
      { name: 'Search for new Vehicle', path: '/zero-vehicle-world' },
      { name: 'Compare new vehicle', path: '/compare-new-vehicle' },
      { name: 'Zero Vehicle Launch Schedule', path: '/zero-vehicle-launch-schedule' },
      { name: 'Campaign Vehicles', path: '/campaign-vehicles' },
      { name: 'Find an Authorized Dealer', path: '/authorized-dealer' },
      { name: 'Electric Vehicle Charging Station', path: '/electric-vehicle' },
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