

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

// Function to generate vehicle data based on selections from category system
const generateVehicleDataFromSelections = (categorySlug, selections, categoryConfig) => {
  if (categorySlug !== 'vehicles' && categorySlug !== 'vehicle') {
    return [];
  }

  // Check if selection is complete
  if (!isSelectionComplete(categorySlug, selections)) {
    return [];
  }

  // Get selected labels for each level
  const selectedLabels = getSelectedLabels(categorySlug, selections);
  
  // Get the current level options to check for next level options
  const levelOptions = getLevelOptions(categorySlug, selections);
  
  // Map data from specific levels:
  // sub model = level8 + level9 (combine if both exist)
  // fuel = level5
  // case type = level6  
  // gear = level7
  // year of production = level2
  
  const yearOfProduction = selectedLabels.level2 || '2024';
  const fuel = selectedLabels.level5 || 'Gasoline';
  const caseType = selectedLabels.level6 || 'Sedan';
  const gear = selectedLabels.level7 || 'Automatic';
  const level8Data = selectedLabels.level8 || '';
  const level9Data = selectedLabels.level9 || '';
  
  // Combine level8 and level9 for sub model
  let subModel = level8Data;
  if (level9Data) {
    subModel = level8Data ? `${level8Data} ${level9Data}` : level9Data;
  }
  
  // If we don't have level8/level9 data yet, check if there are options for the next level
  const nextLevelAfterCurrent = Math.max(...Object.keys(selections).map(key => parseInt(key.replace('level', '')))) + 1;
  const nextLevelOptions = levelOptions[`level${nextLevelAfterCurrent}`] || [];
  
  // If we have complete selection up to level 9, create single vehicle entry
  if (subModel) {
    return [{
      id: 'selected-vehicle',
      subModel: subModel,
      fuel: fuel,
      caseType: caseType,
      enginePower: generateEnginePower(fuel, caseType),
      engineDisplacement: generateEngineDisplacement(fuel, caseType),
      gear: gear,
      yearsOfProduction: formatYearOfProduction(yearOfProduction)
    }];
  }
  
  // If we have next level options (level8 or level9 variants), create multiple entries
  if (nextLevelOptions.length > 0) {
    return nextLevelOptions.map((option, index) => ({
      id: option.id || `vehicle-${index}`,
      subModel: option.label || option.name || `Variant ${index + 1}`,
      fuel: fuel,
      caseType: caseType,
      enginePower: generateEnginePower(fuel, caseType, option.label),
      engineDisplacement: generateEngineDisplacement(fuel, caseType, option.label),
      gear: gear,
      yearsOfProduction: formatYearOfProduction(yearOfProduction)
    }));
  }
  
  // Fallback: Generate basic variants based on current selections
  return generateFallbackVehicleData(selectedLabels, fuel, caseType, gear, yearOfProduction);
};

// Helper functions to generate custom values according to car type
const generateEnginePower = (fuel, caseType, subModel = '') => {
  // Base power values by fuel type
  const basePowerByFuel = {
    'Gasoline': 180,
    'Diesel': 150,
    'Hybrid': 200,
    'Electric': 250,
    'Petrol': 180
  };
  
  // Multipliers by case type
  const caseTypeMultiplier = {
    'Sedan': 1.0,
    'SUV': 1.3,
    'Coupe': 1.1,
    'Hatchback': 0.9,
    'Wagon': 1.1,
    'Convertible': 1.2,
    'Pickup': 1.4,
    'Van': 1.2
  };
  
  let basePower = basePowerByFuel[fuel] || 180;
  
  // Detect case type from caseType string
  let multiplier = 1.0;
  Object.keys(caseTypeMultiplier).forEach(type => {
    if (caseType.toLowerCase().includes(type.toLowerCase())) {
      multiplier = caseTypeMultiplier[type];
    }
  });
  
  // Additional variations based on sub model keywords
  if (subModel) {
    if (subModel.toLowerCase().includes('sport') || subModel.toLowerCase().includes('s-line')) {
      multiplier *= 1.3;
    } else if (subModel.toLowerCase().includes('eco') || subModel.toLowerCase().includes('base')) {
      multiplier *= 0.8;
    } else if (subModel.toLowerCase().includes('turbo') || subModel.toLowerCase().includes('charged')) {
      multiplier *= 1.4;
    }
  }
  
  const finalPower = Math.round(basePower * multiplier);
  return `${finalPower} HP`;
};

const generateEngineDisplacement = (fuel, caseType, subModel = '') => {
  // Base displacement values by fuel type (in cm3)
  const baseDisplacementByFuel = {
    'Gasoline': 2000,
    'Diesel': 2000,
    'Hybrid': 1800,
    'Electric': 0, // Electric motors don't have displacement
    'Petrol': 2000
  };
  
  // Multipliers by case type
  const caseTypeMultiplier = {
    'Sedan': 1.0,
    'SUV': 1.5,
    'Coupe': 1.2,
    'Hatchback': 0.8,
    'Wagon': 1.1,
    'Convertible': 1.3,
    'Pickup': 1.8,
    'Van': 1.4
  };
  
  let baseDisplacement = baseDisplacementByFuel[fuel] || 2000;
  
  // For electric vehicles, return N/A or 0
  if (fuel === 'Electric') {
    return 'Electric Motor';
  }
  
  // Detect case type from caseType string
  let multiplier = 1.0;
  Object.keys(caseTypeMultiplier).forEach(type => {
    if (caseType.toLowerCase().includes(type.toLowerCase())) {
      multiplier = caseTypeMultiplier[type];
    }
  });
  
  // Additional variations based on sub model keywords
  if (subModel) {
    if (subModel.toLowerCase().includes('sport') || subModel.toLowerCase().includes('s-line')) {
      multiplier *= 1.2;
    } else if (subModel.toLowerCase().includes('eco') || subModel.toLowerCase().includes('base')) {
      multiplier *= 0.7;
    } else if (subModel.toLowerCase().includes('turbo') || subModel.toLowerCase().includes('charged')) {
      multiplier *= 1.3;
    }
  }
  
  const finalDisplacement = Math.round(baseDisplacement * multiplier);
  return `${finalDisplacement} cm3`;
};

const formatYearOfProduction = (year) => {
  const yearNum = parseInt(year);
  if (isNaN(yearNum)) {
    return '2024 - 2024';
  }
  return `${yearNum} - ${yearNum}`;
};

// Updated fallback function to use the correct parameters
const generateFallbackVehicleData = (selectedLabels, fuel, caseType, gear, yearOfProduction) => {
  const brand = selectedLabels.level1 || 'Unknown Brand';
  const model = selectedLabels.level2 || selectedLabels.level3 || selectedLabels.level4 || 'Unknown Model';

  // Generate basic variants when no specific level8/level9 data exists
  const variants = [
    {
      id: 'variant-1',
      subModel: `${model} Base`,
      fuel: fuel,
      caseType: caseType,
      enginePower: generateEnginePower(fuel, caseType, 'Base'),
      engineDisplacement: generateEngineDisplacement(fuel, caseType, 'Base'),
      gear: gear,
      yearsOfProduction: formatYearOfProduction(yearOfProduction)
    },
    {
      id: 'variant-2',
      subModel: `${model} Comfort`,
      fuel: fuel,
      caseType: caseType,
      enginePower: generateEnginePower(fuel, caseType, 'Comfort'),
      engineDisplacement: generateEngineDisplacement(fuel, caseType, 'Comfort'),
      gear: gear,
      yearsOfProduction: formatYearOfProduction(yearOfProduction)
    },
    {
      id: 'variant-3',
      subModel: `${model} Sport`,
      fuel: fuel,
      caseType: caseType,
      enginePower: generateEnginePower(fuel, caseType, 'Sport'),
      engineDisplacement: generateEngineDisplacement(fuel, caseType, 'Sport'),
      gear: gear,
      yearsOfProduction: formatYearOfProduction(yearOfProduction)
    }
  ];

  return variants;
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

  // Generate vehicle data from selections for vehicles category
  const vehicleData = (categorySlug === 'vehicles' || categorySlug === 'vehicle') && selectionComplete 
    ? generateVehicleDataFromSelections(categorySlug, selections, categoryData) 
    : [];

  // Debug log for vehicle data generation
  if (process.env.NODE_ENV === 'development' && (categorySlug === 'vehicles' || categorySlug === 'vehicle')) {
    console.log('Vehicle data generation debug:');
    console.log('Selected labels:', selectedLabels);
    console.log('Mapped vehicle data:');
    console.log('- Year of Production (level2):', selectedLabels.level2);
    console.log('- Fuel (level5):', selectedLabels.level5);
    console.log('- Case Type (level6):', selectedLabels.level6);
    console.log('- Gear (level7):', selectedLabels.level7);
    console.log('- Sub Model part 1 (level8):', selectedLabels.level8);
    console.log('- Sub Model part 2 (level9):', selectedLabels.level9);
    console.log('Generated vehicles:', vehicleData);
  }

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
              <div className="w-[750px] flex-shrink-0">
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

// Updated Vehicle Table Component with Radio Buttons and All Fields
const VehicleTable = ({ vehicles, onVehicleSelect, selectedLabels, selectedVehicle }) => {
  return (
    <div className="w-full">
      {/* Vehicle table */}
      <div className="bg-white max-w-7xl rounded-lg shadow-custom overflow-hidden mt-2">
        <div className="w-full max-h-[400px] overflow-y-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub Model
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Type
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engine Power
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engine Displacement
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gear
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Years of Production
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => {
                  const isSelected = selectedVehicle && (selectedVehicle.id === vehicle.id || selectedVehicle.subModel === vehicle.subModel);
                  
                  return (
                    <tr 
                      key={vehicle.id || index} 
                      className={`transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 border-l-4 border-[#1544AB]' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => onVehicleSelect(vehicle)}
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        <input
                          type="radio"
                          name="vehicleSelection"
                          checked={isSelected}
                          onChange={() => onVehicleSelect(vehicle)}
                          className="w-4 h-4 text-[#1544AB] bg-gray-100 border-gray-300 focus:ring-[#1544AB] focus:ring-2"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vehicle.subModel}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.fuel}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.caseType}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.enginePower}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.engineDisplacement}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.gear}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.yearsOfProduction}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">
                    No vehicles found for your selection
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionDetails;