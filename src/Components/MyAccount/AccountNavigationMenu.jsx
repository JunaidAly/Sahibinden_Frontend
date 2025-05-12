
import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const AccountNavigationMenu = ({ onSectionChange }) => {
  // Track which sections are expanded (dropdowns)
  const [expandedSections, setExpandedSections] = useState({
    accountInformation: true,  // Main account section starts expanded
    security: false,           // Security section starts collapsed
    permissions: false         // Permissions section starts collapsed
  });
  
  // Track the currently active section (for highlighting)
  const [activeSection, setActiveSection] = useState("personalInfo");
  
  // Track which parent section is active
  const [activeParentSection, setActiveParentSection] = useState("accountInformation");

  // Toggle a dropdown section open/closed
  const toggleSection = (section) => {
    // Set this section as the active parent
    setActiveParentSection(section);
    
    // Toggle the expanded state
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // REMOVED: onSectionChange callback for parent sections
    // This ensures parent sections only expand/collapse without triggering component changes
  };

  // Handle click on a menu item
  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    
    // Notify parent component about the selection
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  // Check if a section is the currently active one
  const isSectionActive = (sectionId) => {
    return activeSection === sectionId;
  };
  
  // Check if a parent section is active
  const isParentSectionActive = (sectionId) => {
    return activeParentSection === sectionId;
  };

  return (
    <div className="w-full h-max max-w-xs mx-auto border border-[#1544AB] font-poppins">
      {/* My Account Information - Always blue header */}
      <button 
        className={`w-full py-4 px-6 text-left flex justify-between items-center ${
          isParentSectionActive('accountInformation') ? 'bg-[#1544AB] text-white' : 'bg-white text-[text-2xl text-[#231E1C]'
        }`}
        onClick={() => toggleSection('accountInformation')}
      >
        <h2 className="text-xl  font-normal">My Account Information</h2>
        {expandedSections.accountInformation ? (
          <FaCaretUp size={24} className={isParentSectionActive('accountInformation') ? 'text-white' : 'text-[#1544AB]'} />
        ) : (
          <FaCaretDown size={24} className={isParentSectionActive('accountInformation') ? 'text-white' : 'text-[#1544AB]'} />
        )}
      </button>
      
      {/* Account Information Dropdown Items */}
      {expandedSections.accountInformation && (
        <>
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick('personalInfo')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('personalInfo') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>My Personal Information</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick('email')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('email') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Email</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick('mobilePhone')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('mobilePhone') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Mobile Phone</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick('passwordChange')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('passwordChange') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Password Change</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick('accountVerification')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('accountVerification') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Account Verification</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
            onClick={() => handleSectionClick('accountCancellation')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('accountCancellation') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Account Cancellation</span>
          </button>
        </>
      )}
      
      {/* Security Section - With Dropdown Icon */}
      <button 
        className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
          isParentSectionActive('security') ? 'bg-[#1544AB] text-white' : 'bg-white text-[#231E1C]'
        }`}
        onClick={() => toggleSection('security')}
      >
        <span className="text-xl  font-normal">Security</span>
        <FaCaretDown 
          className={`transform transition-transform duration-300 ${
            expandedSections.security ? 'rotate-180' : ''
          } ${
            isParentSectionActive('security') ? 'text-white' : 'text-[#1544AB]'
          }`} 
          size={24}
        />
      </button>
      
      {/* Security Dropdown Items */}
      {expandedSections.security && (
        <>
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick('twoStepVerification')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('twoStepVerification') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>2 Step Verification</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick('recoveryemail')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('recoveryemail') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Recovery Email</span>
          </button>

          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick('sessiondevices')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('sessiondevices') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Sessions & Devices</span>
          </button>
        </>
      )}
      
      {/* My Saved Cards */}
      <button 
        className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
        onClick={() => handleSectionClick('savedCards')}
      >
        <span className={`text-xl font-normal ${
          isSectionActive('savedCards') ? 'text-[#1544AB]' : 'text-[#231E1C]'
        }`}>My Saved Cards</span>
      </button>
      
      {/* My Account Activities */}
      <button 
        className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
        onClick={() => handleSectionClick('accountActivities')}
      >
        <span className={`text-xl font-normal ${
          isSectionActive('accountActivities') ? 'text-[#1544AB]' : 'text-[#231E1C]'
        }`}>My Account Activities</span>
      </button>
      
      {/* Account Holders / Blocked */}
      <button 
        className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white"
        onClick={() => handleSectionClick('accountHolders')}
      >
        <span className={`text-xl font-normal ${
          isSectionActive('accountHolders') ? 'text-[#1544AB]' : 'text-[#231E1C]'
        }`}>Account Holders / Blocked</span>
      </button>
      
      {/* My Permissions - With Dropdown Icon */}
      <button 
        className={`w-full py-4 px-6 text-left border-t border-[#1544AB] flex justify-between items-center ${
          isParentSectionActive('permissions') ? 'bg-[#1544AB] text-white' : 'bg-white text-[#231E1C]'
        }`}
        onClick={() => toggleSection('permissions')}
      >
        <span className="text-xl font-normal">My Permissions</span>
        <FaCaretDown 
          className={`transform transition-transform duration-300 ${
            expandedSections.permissions ? 'rotate-180' : ''
          } ${
            isParentSectionActive('permissions') ? 'text-white' : 'text-[#1544AB]'
          }`} 
          size={24}
        />
      </button>
      
      {/* Permissions Dropdown Items */}
      {expandedSections.permissions && (
        <>
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick('NotificationPreferences')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('NotificationPreferences') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Notification Preferences</span>
          </button>
          
          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick('ElectronicMessage')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('ElectronicMessage') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Electronic Message</span>
          </button>

          <button 
            className="w-full py-4 px-6 text-left border-t border-[#1544AB] bg-white pl-10"
            onClick={() => handleSectionClick('MessageReadInformation')}
          >
            <span className={`text-lg font-normal ${
              isSectionActive('MessageReadInformation') ? 'text-[#1544AB]' : 'text-[#231E1C]'
            }`}>Message Read Information</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AccountNavigationMenu;