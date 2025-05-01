
// import React, { useState } from 'react';
// import { Link } from 'react-router';
// const Accordion = () => {
//   const [openSections, setOpenSections] = useState({
//     advertisements: false,
//     autoExpertise: true
//   });

//   // Track active items by section
//   const [activeItems, setActiveItems] = useState({
//     advertisements: null, // 'onAir' or 'notOnAir'
//     autoExpertise: null, // 'buyNow', 'myTransactions' or 'myExpertReports'
//   });

//   const toggleSection = (section) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const setActiveItem = (section, item) => {
//     setActiveItems(prev => ({
//       ...prev,
//       // If clicking the same item that's already active, deactivate it
//       [section]: prev[section] === item ? null : item
//     }));
//   };

//   // Determine if any section is open
//   const isAnySectionOpen = openSections.advertisements || openSections.autoExpertise;

//   return (
//     <div className="w-[300px] max-h-[400px] mt-5 h-full mx-auto border border-[#1544AB] rounded-sm overflow-hidden shadow-md">
//       {/* Summary header - changes background based on if a section is open */}
//       <div className={`${isAnySectionOpen ? 'bg-white text-gray-900' : 'bg-[#1544AB] text-white'} py-2 px-2`}>
//         <h2 className="text-xl font-light">Summary</h2>
//       </div>
      
//       {/* Advertisements section */}
//       <div className={`border-t border-[#1544AB] ${openSections.advertisements ? 'bg-[#1544AB] text-white' : 'bg-white text-gray-900'}`}>
//         <button 
//           className="w-full flex justify-between items-center py-2 px-2 text-left"
//           onClick={() => toggleSection('advertisements')}
//         >
//           <h3 className="text-xl font-light">Advertisements</h3>
//           <div className="w-10 h-10 flex items-center justify-center">
//             <svg 
//               className={`w-10 h-10 ${openSections.advertisements ? 'text-white' : 'text-[#1544AB]'} fill-current`}
//               viewBox="0 0 24 24"
//             >
//               <path d={openSections.advertisements ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"} />
//             </svg>
//           </div>
//         </button>
//       </div>
      
//       {/* On Air & Not On Air sections - displayed when Advertisements is open */}
//       {openSections.advertisements && (
//         <>
//           <div 
//             className={`border-t border-[#1544AB] ${activeItems.advertisements === 'onAir' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
//             onClick={() => setActiveItem('advertisements', 'onAir')}
//           >
//             <div className="py-2 px-2">
//               <h3 className={`text-xl font-light ${activeItems.advertisements === 'onAir' ? 'text-[#1544AB]' : 'bg-white'}`}>On Air</h3>
//             </div>
//           </div>
          
//           <div 
//             className={`border-t border-[#1544AB] ${activeItems.advertisements === 'notOnAir' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
//             onClick={() => setActiveItem('advertisements', 'notOnAir')}
//           >
//             <div className="py-2 px-2">
//               <h3 className={`text-xl font-light ${activeItems.advertisements === 'notOnAir' ? 'text-[#1544AB]' : 'bg-white'}`}>Not On Air</h3>
//             </div>
//           </div>
//         </>
//       )}
      
//       {/* Auto Expertise section */}
//       <div className={`border-t border-[#1544AB] ${openSections.autoExpertise ? 'bg-[#1544AB] text-white' : 'bg-white text-gray-900'}`}>
//         <button 
//           className="w-full flex justify-between items-center py-2 px-2 text-left"
//           onClick={() => toggleSection('autoExpertise')}
//         >
//           <h3 className="text-xl font-light">Auto Expertise</h3>
//           <div className="w-10 h-10 flex items-center justify-center">
//             <svg 
//               className={`w-10 h-10 ${openSections.autoExpertise ? 'text-white' : 'text-[#1544AB]'} fill-current`}
//               viewBox="0 0 24 24"
//             >
//               <path d={openSections.autoExpertise ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"} />
//             </svg>
//           </div>
//         </button>
//       </div>
      
//       {/* Buy Now, My Transactions & My Expert Reports - displayed when Auto Expertise is open */}
//       {openSections.autoExpertise && (
//         <>
//           <div 
//             className={`border-t border-[#1544AB] ${activeItems.autoExpertise === 'buyNow' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
//             onClick={() => setActiveItem('autoExpertise', 'buyNow')}
//           >
//             <Link to={"/buy-now"}>
//             <div className="py-2 px-2">
//             <h3 className={`text-xl font-light ${activeItems.autoExpertise === 'buyNow' ? 'text-[#1544AB]' : 'text-gray-900'}`}>Buy Now</h3>
//             </div>
//             </Link> 
//           </div>
          
//           <div 
//             className={`border-t border-[#1544AB] ${activeItems.autoExpertise === 'myTransactions' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
//             onClick={() => setActiveItem('autoExpertise', 'myTransactions')}
//           >
//             <div className="py-2 px-2">
//               <h3 className={`text-xl font-light ${activeItems.autoExpertise === 'myTransactions' ? 'text-[#1544AB]' : 'bg-white'}`}>My Transactions</h3>
//             </div>
//           </div>
          
//           <div 
//             className={`border-t border-[#1544AB] ${activeItems.autoExpertise === 'myExpertReports' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
//             onClick={() => setActiveItem('autoExpertise', 'myExpertReports')}
//           >
//             <div className="py-2 px-2">
//               <h3 className={`text-xl font-light ${activeItems.autoExpertise === 'myExpertReports' ? 'text-[#1544AB]' : 'bg-white'}`}>My Expert Reports</h3>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Accordion;




// Accordion.jsx
import React, { useState } from 'react';
import BuyNow from './BuyNow';
import { Link } from 'react-router-dom'

const Accordion = ({ onComponentChange }) => {
  const [openSections, setOpenSections] = useState({
    advertisements: false,
    autoExpertise: true
  });

  // Track active items by section
  const [activeItems, setActiveItems] = useState({
    advertisements: null, // 'onAir' or 'notOnAir'
    autoExpertise: null, // 'buyNow', 'myTransactions' or 'myExpertReports'
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const setActiveItem = (section, item) => {
    // Update local state
    setActiveItems(prev => ({
      ...prev,
      // If clicking the same item that's already active, deactivate it
      [section]: prev[section] === item ? null : item
    }));
    
    // Notify parent component to change the displayed component
    if (onComponentChange) {
      // If clicking the same item that's already active, return to dashboard
      if (activeItems[section] === item) {
        onComponentChange('dashboard');
      } else {
        onComponentChange(item);
      }
    }
  };

  // Determine if any section is open
  const isAnySectionOpen = openSections.advertisements || openSections.autoExpertise;

  return (
    <div className="w-[300px] max-h-[400px] mt-5 h-full mx-auto border border-[#1544AB] rounded-sm overflow-hidden shadow-md">
      {/* Summary header - changes background based on if a section is open */}
      <div className={`${isAnySectionOpen ? 'bg-white text-gray-900' : 'bg-[#1544AB] text-white'} py-2 px-2`}>
        <h2 className="text-xl font-light">Summary</h2>
      </div>
      
      {/* Advertisements section */}
      <div className={`border-t border-[#1544AB] ${openSections.advertisements ? 'bg-[#1544AB] text-white' : 'bg-white text-gray-900'}`}>
        <button 
          className="w-full flex justify-between items-center py-2 px-2 text-left"
          onClick={() => toggleSection('advertisements')}
        >
          <h3 className="text-xl font-light">Advertisements</h3>
          <div className="w-10 h-10 flex items-center justify-center">
            <svg 
              className={`w-10 h-10 ${openSections.advertisements ? 'text-white' : 'text-[#1544AB]'} fill-current`}
              viewBox="0 0 24 24"
            >
              <path d={openSections.advertisements ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"} />
            </svg>
          </div>
        </button>
      </div>
      
      {/* On Air & Not On Air sections - displayed when Advertisements is open */}
      {openSections.advertisements && (
        <>
          <div 
            className={`border-t border-[#1544AB] ${activeItems.advertisements === 'onAir' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
            onClick={() => setActiveItem('advertisements', 'onAir')}
          >
            <div className="py-2 px-2">
              <h3 className={`text-xl font-light ${activeItems.advertisements === 'onAir' ? 'text-[#1544AB]' : 'bg-white'}`}>On Air</h3>
            </div>
          </div>
          
          <div 
            className={`border-t border-[#1544AB] ${activeItems.advertisements === 'notOnAir' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
            onClick={() => setActiveItem('advertisements', 'notOnAir')}
          >
            <div className="py-2 px-2">
              <h3 className={`text-xl font-light ${activeItems.advertisements === 'notOnAir' ? 'text-[#1544AB]' : 'bg-white'}`}>Not On Air</h3>
            </div>
          </div>
        </>
      )}
      
      {/* Auto Expertise section */}
      <div className={`border-t border-[#1544AB] ${openSections.autoExpertise ? 'bg-[#1544AB] text-white' : 'bg-white text-gray-900'}`}>
        <button 
          className="w-full flex justify-between items-center py-2 px-2 text-left"
          onClick={() => toggleSection('autoExpertise')}
        >
          <h3 className="text-xl font-light">Auto Expertise</h3>
          <div className="w-10 h-10 flex items-center justify-center">
            <svg 
              className={`w-10 h-10 ${openSections.autoExpertise ? 'text-white' : 'text-[#1544AB]'} fill-current`}
              viewBox="0 0 24 24"
            >
              <path d={openSections.autoExpertise ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"} />
            </svg>
          </div>
        </button>
      </div>
      
      {/* Buy Now, My Transactions & My Expert Reports - displayed when Auto Expertise is open */}
      {openSections.autoExpertise && (
        <>
          <div 
            className={`border-t border-[#1544AB] ${activeItems.autoExpertise === 'buyNow' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
            onClick={() => setActiveItem('autoExpertise', 'buyNow')}
          >
            <Link to={"/buy-now"}>
            <div className="py-2 px-2">
              <h3 className={`text-xl font-light ${activeItems.autoExpertise === 'buyNow' ? 'text-[#1544AB]' : 'text-gray-900'}`}>Buy Now</h3>
            </div>
            </Link>
          </div>
          
          <div 
            className={`border-t border-[#1544AB] ${activeItems.autoExpertise === 'myTransactions' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
            onClick={() => setActiveItem('autoExpertise', 'myTransactions')}
          >
            <div className="py-2 px-2">
              <h3 className={`text-xl font-light ${activeItems.autoExpertise === 'myTransactions' ? 'text-[#1544AB]' : 'bg-white'}`}>My Transactions</h3>
            </div>
          </div>
          
          <div 
            className={`border-t border-[#1544AB] ${activeItems.autoExpertise === 'myExpertReports' ? 'text-[#1544AB]' : 'bg-white'} cursor-pointer`}
            onClick={() => setActiveItem('autoExpertise', 'myExpertReports')}
          >
            <div className="py-2 px-2">
              <h3 className={`text-xl font-light ${activeItems.autoExpertise === 'myExpertReports' ? 'text-[#1544AB]' : 'bg-white'}`}>My Expert Reports</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Accordion;