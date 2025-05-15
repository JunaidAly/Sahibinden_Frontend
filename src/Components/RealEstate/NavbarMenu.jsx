


import React, { useState, useRef, useEffect } from 'react';

function NavbarMenu() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

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
      { name: 'Real Estate Dictionary', path: '/vehicle-buying-guide' },
    ],
    selling: [
      { name: 'Real Estate Index', path: '/vehicle-valuation' },
      { name: 'Real Estate Sales Guide', path: '/auto-expertise' },
      { name: 'Real Estate Dictionary', path: '/vehicle-selling-guide' },
    ],
    renting: [
      { name: 'Real Estate Index', path: '/zero-vehicle-world' },
      { name: 'Property Rental Guide', path: '/compare-new-vehicle' },
      { name: 'Real Estate Dictionary', path: '/zero-vehicle-launch-schedule' },
    ]
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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
                  link.active ? "text-[#1544AB]" : "text-[#231E1C]"
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
                    <a
                      key={idx}
                      href={item.path}
                      className="block px-4 py-3 text-sm font-[400] font-poppins text-[#231E1C] hover:bg-gray-50 hover:text-[#1544AB]"
                      onClick={() => setOpenDropdown(null)}
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