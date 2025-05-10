
import { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";

const NavigationMenu = ({ onSectionChange }) => {
  const [activeSection, setActiveSection] = useState("messages"); // Default to messages
  const [isProductOffersExpanded, setIsProductOffersExpanded] = useState(false);
  const [clickedDropdownItem, setClickedDropdownItem] = useState("seller"); // Default to seller

  const handleSectionClick = (sectionId) => {
    if (sectionId === 'messages' || sectionId === 'informations') {
      // Toggle active section - if already active, deactivate it
      setActiveSection(activeSection === sectionId ? null : sectionId);
      setIsProductOffersExpanded(false); // Close product offers dropdown
    } 
    else if (sectionId === 'productOffers') {
      // If another section is active, deactivate it
      if (activeSection) {
        setActiveSection(null);
      }
      
      setIsProductOffersExpanded(!isProductOffersExpanded);
      
      // When clicking "My Product Offers", automatically select "seller" by default
      // but only do this if we're opening the dropdown, not closing it
      if (!isProductOffersExpanded) {
        setClickedDropdownItem('seller');
        // Notify parent component to render seller component
        if (onSectionChange) {
          onSectionChange('seller');
        }
      }
    } 
    else if (sectionId === 'seller' || sectionId === 'buyer') {
      // Track which dropdown item was clicked
      setClickedDropdownItem(sectionId);
      
      // Handle dropdown option clicks
      if (onSectionChange) {
        onSectionChange(sectionId);
      }
    }
    
    // Notify parent component for main sections
    if (sectionId !== 'seller' && sectionId !== 'buyer' && sectionId !== 'productOffers' && onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  // Check if a section should display as active (blue background)
  const isSectionActive = (sectionId) => {
    // Only one section can be active at a time
    return activeSection === sectionId;
  };

  return (
    <div className="w-full h-max max-w-xs mx-auto border border-[#1544AB] font-poppins">
      {/* My Messages */}
      <div className="border-b border-[#1544AB]">
        <button 
          className={`w-full py-3 px-3 text-left transition-colors duration-200 ${
            isSectionActive('messages') 
              ? 'bg-[#1544AB] text-white' 
              : 'bg-white text-black'
          }`}
          onClick={() => handleSectionClick('messages')}
        >
          <h2 className="text-xl font-normal">My Messages</h2>
        </button>
      </div>

      {/* Informations */}
      <div className="border-b border-[#1544AB]">
        <button 
          className={`w-full py-3 px-3 text-left transition-colors duration-200 ${
            isSectionActive('informations') 
              ? 'bg-[#1544AB] text-white' 
              : 'bg-white text-black'
          }`}
          onClick={() => handleSectionClick('informations')}
        >
          <h2 className="text-xl font-normal">Informations</h2>
        </button>
      </div>

      {/* My Product Offers */}
      <div className={isProductOffersExpanded ? 'border-b-0' : ' border-[#1544AB]'}>
        <button 
          className={`w-full py-3 px-3 text-left transition-colors duration-200 flex gap-5 items-center ${
            !activeSection 
              ? 'bg-[#1544AB] text-white' 
              : 'bg-white text-black'
          }`}
          onClick={() => handleSectionClick('productOffers')}
        >
          <h2 className="text-xl font-normal">My Product Offers</h2>
          <FaCaretDown 
            className={`transform transition-transform duration-300 ${
              isProductOffersExpanded ? 'rotate-180' : 'rotate-0'
            } ${
              !activeSection ? 'text-white' : 'text-[#1544AB]'
            }`} 
            size={24}
          />
        </button>
      </div>
      
      {/* Dropdown Items - Only visible when expanded */}
      {isProductOffersExpanded && (
        <>
          {/* I Am Seller */}
          <div className="border-b border-[#1544AB]">
            <button 
              className={`w-full py-3 px-3 text-left transition-colors duration-200 ${
                clickedDropdownItem === 'seller' ? '' : 'bg-white'
              }`}
              onClick={() => handleSectionClick('seller')}
            >
              <h2 className={`text-xl font-normal ${
                clickedDropdownItem === 'seller' ? 'text-[#1544AB]' : 'text-black'
              }`}>I Am Seller</h2>
            </button>
          </div>

          {/* I Am Buyer */}
          <div className="">
            <button 
              className={`w-full py-3 px-3 text-left transition-colors duration-200 ${
                clickedDropdownItem === 'buyer' ? '' : 'bg-white'
              }`}
              onClick={() => handleSectionClick('buyer')}
            >
              <h2 className={`text-xl font-normal ${
                clickedDropdownItem === 'buyer' ? 'text-[#1544AB]' : 'text-black'
              }`}>I Am Buyer</h2>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationMenu;