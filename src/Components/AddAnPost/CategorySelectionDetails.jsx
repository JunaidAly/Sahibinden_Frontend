

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import CommentForm from '../Home/CommentForm';
// import CategorySearch from './CategorySearch';

// // Import your new configuration system
// import { 
//   getCategoryConfig, 
//   getLevelOptions, 
//   isSelectionComplete, 
//   getSelectedLabels,
//   debugCategoryStructure,
//   getMaxLevel
// } from '../../config/categories';

// const CategorySelectionDetails = () => {
//   const { categorySlug } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Use object to manage all level selections
//   const [selections, setSelections] = useState({});
//   const [categoryData, setCategoryData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [maxLevel, setMaxLevel] = useState(1);
//   const scrollContainerRef = useRef(null);

//   // Load category configuration when component mounts or slug changes
//   useEffect(() => {
//     const loadCategoryData = () => {
//       setIsLoading(true);
      
//       try {
//         // Get category configuration using the new system
//         const config = getCategoryConfig(categorySlug);
//         setCategoryData(config);
        
//         // Get maximum available level for this category
//         const categoryMaxLevel = getMaxLevel(categorySlug);
//         setMaxLevel(categoryMaxLevel);
        
//         // Debug log (remove in production)
//         if (process.env.NODE_ENV === 'development') {
//           console.log('Loading category:', categorySlug);
//           console.log('Max level:', categoryMaxLevel);
//           console.log('Location state:', location.state);
//           debugCategoryStructure(categorySlug);
//         }
        
//         // Check if we have pre-filled selections from search
//         const prefilledSelections = location.state?.prefilledSelections;
        
//         if (prefilledSelections && Object.keys(prefilledSelections).length > 0) {
//           console.log('Setting prefilled selections:', prefilledSelections);
//           console.log('Category slug:', categorySlug);
//           console.log('Max level:', categoryMaxLevel);
          
//           // Directly set the selections
//           setSelections(prefilledSelections);
          
//           // Auto-scroll to the next level after the last selected level
//           setTimeout(() => {
//             const selectedLevels = Object.keys(prefilledSelections).map(key => 
//               parseInt(key.replace('level', ''))
//             );
//             if (selectedLevels.length > 0) {
//               const lastLevel = Math.max(...selectedLevels);
//               const nextLevel = Math.min(lastLevel + 1, categoryMaxLevel);
//               console.log('Scrolling to level:', nextLevel);
//               scrollToLevel(nextLevel);
//             }
//           }, 1000); // Increased delay to ensure everything is rendered
//         } else {
//           // Reset selections when category changes (normal navigation)
//           setSelections({});
//         }
        
//         // Reset scroll position if no pre-filled selections
//         if (!prefilledSelections && scrollContainerRef.current) {
//           scrollContainerRef.current.scrollTo({
//             left: 0,
//             behavior: 'smooth'
//           });
//         }
        
//       } catch (error) {
//         console.error('Error loading category configuration:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadCategoryData();
//   }, [categorySlug, location.state]);

//   // Watch for selection completion to auto-scroll to confirmation
//   useEffect(() => {
//     if (categoryData) {
//       const selectionComplete = isSelectionComplete(categorySlug, selections);
//       if (selectionComplete) {
//         setTimeout(() => {
//           scrollToConfirmation();
//         }, 200);
//       }
//     }
//   }, [selections, categorySlug, categoryData]);

//   // Function to scroll to confirmation panel
//   const scrollToConfirmation = () => {
//     if (scrollContainerRef.current) {
//       const columnWidth = 282;
//       const gap = 16;
//       const totalColumns = Object.keys(selections).length;
//       const scrollPosition = (columnWidth + gap) * totalColumns;
      
//       scrollContainerRef.current.scrollTo({
//         left: scrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Function to scroll to next level
//   const scrollToLevel = (level) => {
//     if (scrollContainerRef.current && level > 0) {
//       const columnWidth = 282; // Width of each column
//       const gap = 16; // Gap between columns (gap-4 = 16px)
//       const scrollPosition = (columnWidth + gap) * Math.max(0, level - 1);
      
//       scrollContainerRef.current.scrollTo({
//         left: scrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Generic event handler for any level selection
//   const handleLevelSelection = (level, optionId) => {
//     const newSelections = { ...selections };
    
//     // Set the selected option for this level
//     newSelections[`level${level}`] = optionId;
    
//     // Clear all dependent levels (higher levels)
//     for (let i = level + 1; i <= 9; i++) {
//       delete newSelections[`level${i}`];
//     }
    
//     setSelections(newSelections);
    
//     // Scroll to show the next level (if it exists)
//     const nextLevel = level + 1;
//     setTimeout(() => {
//       scrollToLevel(nextLevel);
//     }, 100); // Small delay to ensure state update
    
//     console.log(`Level ${level} selected:`, optionId);
//     console.log('Current selections:', newSelections);
//   };

//   // Handle continue button click
//   const handleContinue = () => {
//     const selectedLabels = getSelectedLabels(categorySlug, selections);
    
//     const selectionData = {
//       category: categorySlug,
//       categoryTitle: categoryData?.title,
//       selections: selections,
//       labels: selectedLabels,
//       maxLevel: maxLevel
//     };
    
//     console.log('Category selection complete:', selectionData);
    
//     // Navigate to post-details route with selection data
//     navigate('/post-details', { state: selectionData });
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg">Loading category...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (!categoryData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg text-red-600">Category not found</div>
//         </div>
//       </div>
//     );
//   }

//   // Get current level options using utility function
//   const levelOptions = getLevelOptions(categorySlug, selections);
  
//   // Debug log for level options
//   if (process.env.NODE_ENV === 'development') {
//     console.log('Current selections:', selections);
//     console.log('Level options:', levelOptions);
//   }
  
//   // Check if selection is complete
//   const selectionComplete = categoryData ? isSelectionComplete(categorySlug, selections) : false;
  
//   // Get selected labels for breadcrumb
//   const selectedLabels = categoryData ? getSelectedLabels(categorySlug, selections) : {};

//   // Create columns for all available levels
//   const renderLevelColumns = () => {
//     const columns = [];
    
//     for (let level = 1; level <= maxLevel; level++) {
//       const levelKey = `level${level}`;
//       const options = levelOptions[levelKey] || [];
//       const selectedOption = selections[levelKey];
      
//       // Show column if it's level 1, or if previous level is selected
//       const isVisible = level === 1 || (level > 1 && selections[`level${level - 1}`]);
      
//       // Only render if there are options or it's level 1
//       if (isVisible && (options.length > 0 || level === 1)) {
//         columns.push(
//           <CategoryColumn
//             key={level}
//             level={level}
//             title={`Level ${level} Selection`}
//             options={options}
//             selectedOption={selectedOption}
//             onOptionClick={(optionId) => handleLevelSelection(level, optionId)}
//             isVisible={isVisible}
//           />
//         );
//       }
//     }
    
//     return columns;
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
      
//       <div className="max-w-[1300px] mx-auto p-8 mt-10 font-poppins bg-white rounded-xl shadow-custom">
//         <h1 className="text-2xl font-[500] text-black mb-4">Step by Step Select Category</h1>
//         <h2 className="text-xl text-[#888F9F] text-[20px] font-[500] mb-6">{categoryData.title}</h2>
        
//         {/* Dynamic Breadcrumb Navigation */}
//         <div className="mb-6 text-sm text-gray-600">
//           <span className="font-medium">{categoryData.title}</span>
//           {Object.keys(selections).map((levelKey, index) => {
//             const level = parseInt(levelKey.replace('level', ''));
//             const label = selectedLabels[levelKey];
            
//             if (label) {
//               return (
//                 <React.Fragment key={levelKey}>
//                   <span className="mx-2">→</span>
//                   <span 
//                     className="text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors"
//                     onClick={() => scrollToLevel(level)}
//                     title={`Go to Level ${level}`}
//                   >
//                     {label}
//                   </span>
//                 </React.Fragment>
//               );
//             }
//             return null;
//           })}
//         </div>
        
//         <div className="flex items-start">
//           {/* Dynamic Category Columns with Confirmation Panel */}
//           <div 
//             ref={scrollContainerRef}
//             className="flex gap-4 overflow-x-auto pb-4 w-full"
//             style={{
//               scrollbarWidth: 'thin',
//               scrollbarColor: '#CBD5E0 #F7FAFC'
//             }}
//           >
//             {renderLevelColumns()}
            
//             {/* Confirmation Section - Inside scrollable area */}
//             {selectionComplete && (
//               <div className="w-[300px] flex-shrink-0">
//                 <ConfirmationPanel 
//                   onContinue={handleContinue}
//                   categoryTitle={categoryData.title}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <CategorySearch/>
//       <CommentForm/>
//       <Footer/>
//     </div>
//   );
// };

// // Category Column Component
// const CategoryColumn = ({ 
//   level, 
//   title, 
//   options, 
//   selectedOption, 
//   onOptionClick, 
//   isVisible
// }) => {
//   if (!isVisible || options.length === 0) return null;

//   // Debug log for category column
//   if (process.env.NODE_ENV === 'development') {
//     console.log(`Level ${level} - Options:`, options.length, 'Selected:', selectedOption);
//   }

//   return (
//     <div className="w-[282px] p-2 flex-shrink-0">
//       <div className="bg-white rounded-lg shadow-custom">
//         <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
//           {options.map((option) => {
//             const isSelected = selectedOption === option.id;
            
//             return (
//               <div 
//                 key={option.id} 
//                 className="flex items-center cursor-pointer py-2 px-2 rounded transition-colors hover:bg-gray-50"
//                 onClick={() => onOptionClick(option.id)}
//               >
//                 {isSelected ? (
//                   <div className="text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center bg-[#1544AB]">
//                     {option.label}
//                   </div>
//                 ) : (
//                   <div className="text-sm font-medium w-full transition-colors text-black hover:text-[#1544AB]">
//                     {option.label}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Confirmation Panel Component
// const ConfirmationPanel = ({ onContinue, categoryTitle }) => (
//   <div className="p-2 mt-2 flex flex-col items-center justify-center shadow-custom w-[280px] h-[280px] rounded-lg bg-white">
//     <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 bg-[#1544AB]">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//       </svg>
//     </div>
    
//     <p className="text-center text-black font-medium mb-2 w-[164px] text-sm">
//       {categoryTitle} Selection Complete
//     </p>
    
//     <button 
//       className="bg-[#1544AB] hover:bg-blue-700 hover:scale-105 text-white py-3 px-6 rounded-md font-medium w-[148px] transition-all duration-200"
//       onClick={onContinue}
//     >
//       Continue
//     </button>
//   </div>
// );

// export default CategorySelectionDetails;





import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';
import CategorySearch from './CategorySearch';

// Import your new configuration system
import { 
  getCategoryConfig, 
  getLevelOptions, 
  isSelectionComplete, 
  getSelectedLabels,
  debugCategoryStructure,
  getMaxLevel
} from '../../config/categories';

// Function to generate vehicle data based on selections
const generateVehicleData = (categorySlug, selections, selectedLabels) => {
  if (categorySlug !== 'vehicles' && categorySlug !== 'vehicle') {
    return [];
  }

  // Extract selected values from the labels
  const brand = selectedLabels.level1 || 'Unknown Brand';
  const model = selectedLabels.level2 || 'Unknown Model';
  const year = selectedLabels.level3 || '2024';
  const bodyType = selectedLabels.level4 || 'Sedan';
  const engine = selectedLabels.level5 || '2.0L';

  // Generate realistic vehicle variants based on selections
  const vehicles = [];
  
  // Generate different engine variants
  const engineVariants = [
    { power: '190 HP', displacement: '1984 cm3', fuel: 'Gasoline', gear: 'Manual' },
    { power: '245 HP', displacement: '1984 cm3', fuel: 'Gasoline', gear: 'Automatic' },
    { power: '310 HP', displacement: '1984 cm3', fuel: 'Gasoline', gear: 'Automatic' },
  ];

  // Add diesel variants if applicable
  if (engine.includes('TDI') || engine.includes('Diesel')) {
    engineVariants.push(
      { power: '150 HP', displacement: '1968 cm3', fuel: 'Diesel', gear: 'Manual' },
      { power: '190 HP', displacement: '1968 cm3', fuel: 'Diesel', gear: 'Automatic' }
    );
  }

  engineVariants.forEach((variant, index) => {
    vehicles.push({
      subModel: `${model} ${variant.power.split(' ')[0]}${variant.fuel === 'Diesel' ? ' TDI' : ' TFSI'}`,
      fuel: variant.fuel,
      caseType: `${bodyType} ${bodyType.toLowerCase().includes('suv') ? '5' : '4'} doors`,
      enginePower: variant.power,
      engineDisplacement: variant.displacement,
      gear: variant.gear,
      yearsOfProduction: `${year} - ${parseInt(year) + 1}`
    });
  });

  return vehicles;
};

const CategorySelectionDetails = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use object to manage all level selections
  const [selections, setSelections] = useState({});
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [maxLevel, setMaxLevel] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const scrollContainerRef = useRef(null);

  // Load category configuration when component mounts or slug changes
  useEffect(() => {
    const loadCategoryData = () => {
      setIsLoading(true);
      
      try {
        // Get category configuration using the new system
        const config = getCategoryConfig(categorySlug);
        setCategoryData(config);
        
        // Get maximum available level for this category
        const categoryMaxLevel = getMaxLevel(categorySlug);
        setMaxLevel(categoryMaxLevel);
        
        // Debug log (remove in production)
        if (process.env.NODE_ENV === 'development') {
          console.log('Loading category:', categorySlug);
          console.log('Max level:', categoryMaxLevel);
          console.log('Location state:', location.state);
          debugCategoryStructure(categorySlug);
        }
        
        // Check if we have pre-filled selections from search
        const prefilledSelections = location.state?.prefilledSelections;
        
        if (prefilledSelections && Object.keys(prefilledSelections).length > 0) {
          console.log('Setting prefilled selections:', prefilledSelections);
          console.log('Category slug:', categorySlug);
          console.log('Max level:', categoryMaxLevel);
          
          // Directly set the selections
          setSelections(prefilledSelections);
          
          // Auto-scroll to the next level after the last selected level
          setTimeout(() => {
            const selectedLevels = Object.keys(prefilledSelections).map(key => 
              parseInt(key.replace('level', ''))
            );
            if (selectedLevels.length > 0) {
              const lastLevel = Math.max(...selectedLevels);
              const nextLevel = Math.min(lastLevel + 1, categoryMaxLevel);
              console.log('Scrolling to level:', nextLevel);
              scrollToLevel(nextLevel);
            }
          }, 1000); // Increased delay to ensure everything is rendered
        } else {
          // Reset selections when category changes (normal navigation)
          setSelections({});
        }
        
        // Reset scroll position if no pre-filled selections
        if (!prefilledSelections && scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        }
        
      } catch (error) {
        console.error('Error loading category configuration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [categorySlug, location.state]);

  // Watch for selection completion to auto-scroll
  useEffect(() => {
    if (categoryData) {
      const selectionComplete = isSelectionComplete(categorySlug, selections);
      if (selectionComplete) {
        setTimeout(() => {
          // For vehicle category, scroll to vehicle table
          if (categorySlug === 'vehicles' || categorySlug === 'vehicle') {
            scrollToVehicleTable();
          } else {
            scrollToConfirmation();
          }
        }, 200);
      }
    }
  }, [selections, categorySlug, categoryData]);

  // Function to scroll to confirmation panel
  const scrollToConfirmation = () => {
    if (scrollContainerRef.current) {
      const columnWidth = 282;
      const gap = 16;
      const totalColumns = Object.keys(selections).length;
      const scrollPosition = (columnWidth + gap) * totalColumns;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll to vehicle table
  const scrollToVehicleTable = () => {
    if (scrollContainerRef.current) {
      const columnWidth = 282;
      const gap = 16;
      const totalColumns = Object.keys(selections).length;
      const scrollPosition = (columnWidth + gap) * totalColumns;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll to vehicle confirmation
  const scrollToVehicleConfirmation = () => {
    if (scrollContainerRef.current) {
      const columnWidth = 282;
      const gap = 16;
      const totalColumns = Object.keys(selections).length + 1; // +1 for vehicle table
      const scrollPosition = (columnWidth + gap) * totalColumns;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll to next level
  const scrollToLevel = (level) => {
    if (scrollContainerRef.current && level > 0) {
      const columnWidth = 282; // Width of each column
      const gap = 16; // Gap between columns (gap-4 = 16px)
      const scrollPosition = (columnWidth + gap) * Math.max(0, level - 1);
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Generic event handler for any level selection
  const handleLevelSelection = (level, optionId) => {
    const newSelections = { ...selections };
    
    // Set the selected option for this level
    newSelections[`level${level}`] = optionId;
    
    // Clear all dependent levels (higher levels)
    for (let i = level + 1; i <= 9; i++) {
      delete newSelections[`level${i}`];
    }
    
    setSelections(newSelections);
    
    // Reset selected vehicle when making new selections
    setSelectedVehicle(null);
    
    // Scroll to show the next level (if it exists)
    const nextLevel = level + 1;
    setTimeout(() => {
      scrollToLevel(nextLevel);
    }, 100); // Small delay to ensure state update
    
    console.log(`Level ${level} selected:`, optionId);
    console.log('Current selections:', newSelections);
  };

  // Handle continue button click
  const handleContinue = () => {
    const selectedLabels = getSelectedLabels(categorySlug, selections);
    
    const selectionData = {
      category: categorySlug,
      categoryTitle: categoryData?.title,
      selections: selections,
      labels: selectedLabels,
      maxLevel: maxLevel,
      selectedVehicle: selectedVehicle
    };
    
    console.log('Category selection complete:', selectionData);
    
    // Navigate to post-details route with selection data
    navigate('/post-details', { state: selectionData });
  };

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    console.log('Vehicle selected:', vehicle);
    
    // Scroll to vehicle confirmation
    setTimeout(() => {
      scrollToVehicleConfirmation();
    }, 200);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading category...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Category not found</div>
        </div>
      </div>
    );
  }

  // Get current level options using utility function
  const levelOptions = getLevelOptions(categorySlug, selections);
  
  // Debug log for level options
  if (process.env.NODE_ENV === 'development') {
    console.log('Current selections:', selections);
    console.log('Level options:', levelOptions);
  }
  
  // Check if selection is complete
  const selectionComplete = categoryData ? isSelectionComplete(categorySlug, selections) : false;
  
  // Get selected labels for breadcrumb
  const selectedLabels = categoryData ? getSelectedLabels(categorySlug, selections) : {};

  // Generate vehicle data based on selections for vehicles category
  const vehicleData = (categorySlug === 'vehicles' || categorySlug === 'vehicle') && selectionComplete 
    ? generateVehicleData(categorySlug, selections, selectedLabels) 
    : [];

  // Create columns for all available levels
  const renderLevelColumns = () => {
    const columns = [];
    
    for (let level = 1; level <= maxLevel; level++) {
      const levelKey = `level${level}`;
      const options = levelOptions[levelKey] || [];
      const selectedOption = selections[levelKey];
      
      // Show column if it's level 1, or if previous level is selected
      const isVisible = level === 1 || (level > 1 && selections[`level${level - 1}`]);
      
      // Only render if there are options or it's level 1
      if (isVisible && (options.length > 0 || level === 1)) {
        columns.push(
          <CategoryColumn
            key={level}
            level={level}
            title={`Level ${level} Selection`}
            options={options}
            selectedOption={selectedOption}
            onOptionClick={(optionId) => handleLevelSelection(level, optionId)}
            isVisible={isVisible}
          />
        );
      }
    }
    
    return columns;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1300px] mx-auto p-8 mt-10 font-poppins bg-white rounded-xl shadow-custom">
        <h1 className="text-2xl font-[500] text-black mb-4">Step by Step Select Category</h1>
        <h2 className="text-xl text-[#888F9F] text-[20px] font-[500] mb-6">{categoryData.title}</h2>
        
        {/* Dynamic Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="font-medium">{categoryData.title}</span>
          {Object.keys(selections).map((levelKey, index) => {
            const level = parseInt(levelKey.replace('level', ''));
            const label = selectedLabels[levelKey];
            
            if (label) {
              return (
                <React.Fragment key={levelKey}>
                  <span className="mx-2">→</span>
                  <span 
                    className="text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors"
                    onClick={() => {
                      scrollToLevel(level);
                      setSelectedVehicle(null);
                    }}
                    title={`Go to Level ${level}`}
                  >
                    {label}
                  </span>
                </React.Fragment>
              );
            }
            return null;
          })}
        </div>
        
        <div className="flex items-start">
          {/* Dynamic Category Columns with Vehicle Table and Confirmation Panel */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 w-full"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E0 #F7FAFC'
            }}
          >
            {renderLevelColumns()}
            
            {/* Vehicle Table - Inside scrollable area for vehicle categories */}
            {selectionComplete && (categorySlug === 'vehicles' || categorySlug === 'vehicle') && (
              <div className="w-[600px] flex-shrink-0">
                <VehicleTable 
                  vehicles={vehicleData} 
                  onVehicleSelect={handleVehicleSelect}
                  selectedLabels={selectedLabels}
                  selectedVehicle={selectedVehicle}
                />
              </div>
            )}
            
            {/* Vehicle Selection Confirmation Panel */}
            {selectedVehicle && (categorySlug === 'vehicles' || categorySlug === 'vehicle') && (
              <div className="w-[300px] flex-shrink-0">
                <VehicleConfirmationPanel 
                  onContinue={handleContinue}
                  selectedVehicle={selectedVehicle}
                />
              </div>
            )}
            
            {/* Regular Confirmation Panel - For non-vehicle categories */}
            {selectionComplete && categorySlug !== 'vehicles' && categorySlug !== 'vehicle' && (
              <div className="w-[300px] flex-shrink-0">
                <ConfirmationPanel 
                  onContinue={handleContinue}
                  categoryTitle={categoryData.title}
                  isVehicleCategory={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CategorySearch/>
      <CommentForm/>
      <Footer/>
    </div>
  );
};

// Category Column Component
const CategoryColumn = ({ 
  level, 
  title, 
  options, 
  selectedOption, 
  onOptionClick, 
  isVisible
}) => {
  if (!isVisible || options.length === 0) return null;

  // Debug log for category column
  if (process.env.NODE_ENV === 'development') {
    console.log(`Level ${level} - Options:`, options.length, 'Selected:', selectedOption);
  }

  return (
    <div className="w-[282px] p-2 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-custom">
        <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
          {options.map((option) => {
            const isSelected = selectedOption === option.id;
            
            return (
              <div 
                key={option.id} 
                className="flex items-center cursor-pointer py-2 px-2 rounded transition-colors hover:bg-gray-50"
                onClick={() => onOptionClick(option.id)}
              >
                {isSelected ? (
                  <div className="text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center bg-[#1544AB]">
                    {option.label}
                  </div>
                ) : (
                  <div className="text-sm font-medium w-full transition-colors text-black hover:text-[#1544AB]">
                    {option.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Confirmation Panel Component
const ConfirmationPanel = ({ onContinue, categoryTitle, isVehicleCategory }) => (
  <div className="p-2 mt-2 flex flex-col items-center justify-center shadow-custom w-[280px] h-[280px] rounded-lg bg-white">
    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 bg-[#1544AB]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    
    <p className="text-center text-black font-medium mb-2 w-[164px] text-sm">
      {categoryTitle} Selection Complete
    </p>
    
    <button 
      className="bg-[#1544AB] hover:bg-blue-700 hover:scale-105 text-white py-3 px-6 rounded-md font-medium w-[148px] transition-all duration-200"
      onClick={onContinue}
    >
      Continue
    </button>
  </div>
);

// Vehicle Confirmation Panel Component
const VehicleConfirmationPanel = ({ onContinue, selectedVehicle }) => (
  <div className="p-2 mt-2 flex flex-col items-center justify-center shadow-custom w-[280px] h-[280px] rounded-lg bg-white">
    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 bg-[#1544AB]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    
    <p className="text-center text-black font-medium mb-2 w-[164px] text-sm">
      Vehicle Selection Complete
    </p>
    
    <p className="text-center text-gray-600 text-xs mb-4 w-[200px]">
      {selectedVehicle?.subModel}
    </p>
    
    <button 
      className="bg-[#1544AB] hover:bg-blue-700 hover:scale-105 text-white py-3 px-6 rounded-md font-medium w-[148px] transition-all duration-200"
      onClick={onContinue}
    >
      Continue
    </button>
  </div>
);

// Vehicle Table Component
const VehicleTable = ({ vehicles, onVehicleSelect, selectedLabels, selectedVehicle }) => {
  return (
    <div className="w-full">

      {/* Vehicle table */}
      <div className="bg-white max-w-7xl rounded-lg shadow-custom overflow-hidden mt-2">
        <div className=" w-full max-h-[400px] overflow-y-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engine Power
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gear
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => {
                  const isSelected = selectedVehicle && selectedVehicle.subModel === vehicle.subModel;
                  
                  return (
                    <tr 
                      key={index} 
                      className={`transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 border-l-4 border-[#1544AB]' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => onVehicleSelect(vehicle)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vehicle.subModel}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.fuel}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.caseType}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.enginePower}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.gear}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onVehicleSelect(vehicle);
                          }}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            isSelected
                              ? 'bg-[#1544AB] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-[#1544AB] hover:text-white'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                    No vehicles found for your selection
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* "I couldn't find my vehicle on the list" link */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button className="text-[#1544AB] hover:text-blue-700 text-sm font-medium transition-colors">
            I couldn't find my vehicle on the list
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionDetails;