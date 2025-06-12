
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
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
  
//   // Use object to manage all level selections
//   const [selections, setSelections] = useState({});
//   const [categoryData, setCategoryData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [maxLevel, setMaxLevel] = useState(1);

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
//           debugCategoryStructure(categorySlug);
//         }
        
//         // Reset selections when category changes
//         setSelections({});
        
//       } catch (error) {
//         console.error('Error loading category configuration:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadCategoryData();
//   }, [categorySlug]);

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
  
//   // Check if selection is complete
//   const selectionComplete = isSelectionComplete(categorySlug, selections);
  
//   // Get selected labels for breadcrumb
//   const selectedLabels = getSelectedLabels(categorySlug, selections);



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
//         <h1 className="text-2xl font-[500] text-black mb-4">
//           Step by Step Select Category
//         </h1>
//         <h2 className="text-xl text-[#888F9F] text-[20px] font-[500] mb-6">
//           {categoryData.title}
//         </h2>

//         {/* Dynamic Breadcrumb Navigation */}
//         <div className="mb-6 text-sm text-gray-600">
//           <span className="font-medium">{categoryData.title}</span>
//           {Object.keys(selections).map((levelKey, index) => {
//             const level = parseInt(levelKey.replace("level", ""));
//             const label = selectedLabels[levelKey];

//             if (label) {
//               return (
//                 <React.Fragment key={levelKey}>
//                   <span className="mx-2">→</span>
//                   <span className="text-blue-600 font-medium">{label}</span>
//                 </React.Fragment>
//               );
//             }
//             return null;
//           })}
//         </div>

//         <div className="flex items-start">
//           {/* Dynamic Category Columns with Horizontal Scroll */}
//           <div className="flex w-full lg:w-3/4 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-2">
//             <div className="flex gap-4 min-w-max">{renderLevelColumns()}</div>
//           </div>

//           {/* Confirmation Section */}
//           <ConfirmationPanel
//             isComplete={selectionComplete}
//             onContinue={handleContinue}
//             categoryTitle={categoryData.title}
//           />
//         </div>
//       </div>

//       <CategorySearch />
//       <CommentForm />
//       <Footer />
//     </div>
//   );
// };

// // Enhanced Category Column Component
// const CategoryColumn = ({ level, title, options, selectedOption, onOptionClick, isVisible }) => {
//   if (!isVisible || options.length === 0) return null;

//   return (
//     <div className="w-[282px] p-2">
//       <div className="bg-white rounded-lg shadow-custom">
//         {/* <div className="p-4 bg-blue-50 rounded-t-lg">
//           <h3 className="font-medium text-gray-800">{title}</h3>
//           <p className="text-xs text-gray-600 mt-1">Level {level}</p>
//         </div> */}
//         <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
//           {options.map((option) => (
//             <div 
//               key={option.id} 
//               className="flex items-center cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors"
//               onClick={() => onOptionClick(option.id)}
//             >
//               {selectedOption === option.id ? (
//                 <div className="bg-[#1544AB] text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center">
//                   {option.label}
//                 </div>
//               ) : (
//                 <div className="text-black text-sm font-medium w-full hover:text-[#1544AB] transition-colors">
//                   {option.label}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Confirmation Panel Component - Hide button until complete
// const ConfirmationPanel = ({ isComplete, onContinue, categoryTitle }) => (
//   <div className="w-full lg:w-1/4 p-2 flex flex-col items-center justify-center shadow-custom h-[300px] rounded-lg bg-white">
//     <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 transition-colors ${
//       isComplete ? 'bg-[#1544AB]' : 'bg-gray-300'
//     }`}>
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//       </svg>
//     </div>
    
//     <p className="text-center text-black font-medium mb-4 w-[164px] text-sm">
//       {isComplete 
//         ? `${categoryTitle} Selection Complete` 
//         : 'Please complete all required selections'
//       }
//     </p>
    
//     {/* Only show button when selection is complete */}
//     {isComplete && (
//       <button 
//         className="bg-[#1544AB] hover:bg-blue-700 hover:scale-105 text-white py-3 px-6 rounded-md font-medium w-[148px] transition-all duration-200"
//         onClick={onContinue}
//       >
//         Continue
//       </button>
//     )}
//   </div>
// );

// export default CategorySelectionDetails;




import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const CategorySelectionDetails = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  
  // Use object to manage all level selections
  const [selections, setSelections] = useState({});
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [maxLevel, setMaxLevel] = useState(1);
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
          debugCategoryStructure(categorySlug);
        }
        
        // Reset selections when category changes
        setSelections({});
        
        // Reset scroll position
        if (scrollContainerRef.current) {
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
  }, [categorySlug]);

  // Watch for selection completion to auto-scroll to confirmation
  useEffect(() => {
    if (categoryData) {
      const selectionComplete = isSelectionComplete(categorySlug, selections);
      if (selectionComplete) {
        setTimeout(() => {
          scrollToConfirmation();
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

  // Function to scroll to next level
  const scrollToLevel = (level) => {
    if (scrollContainerRef.current) {
      const columnWidth = 282; // Width of each column
      const gap = 16; // Gap between columns (gap-4 = 16px)
      const scrollPosition = (columnWidth + gap) * (level - 1);
      
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
      maxLevel: maxLevel
    };
    
    console.log('Category selection complete:', selectionData);
    
    // Navigate to post-details route with selection data
    navigate('/post-details', { state: selectionData });
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
  
  // Check if selection is complete
  const selectionComplete = categoryData ? isSelectionComplete(categorySlug, selections) : false;
  
  // Get selected labels for breadcrumb
  const selectedLabels = categoryData ? getSelectedLabels(categorySlug, selections) : {};



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
                    onClick={() => scrollToLevel(level)}
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
          {/* Dynamic Category Columns with Confirmation Panel */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 w-full"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E0 #F7FAFC'
            }}
          >
            {renderLevelColumns()}
            
            {/* Confirmation Section - Inside scrollable area */}
            {selectionComplete && (
              <div className="w-[300px] flex-shrink-0">
                <ConfirmationPanel 
                  onContinue={handleContinue}
                  categoryTitle={categoryData.title}
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

// Enhanced Category Column Component
const CategoryColumn = ({ level, title, options, selectedOption, onOptionClick, isVisible }) => {
  if (!isVisible || options.length === 0) return null;

  return (
    <div className="w-[282px] p-2 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-custom">
        {/* <div className="p-4 bg-blue-50 rounded-t-lg">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">Level {level}</p>
        </div> */}
        <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
          {options.map((option) => (
            <div 
              key={option.id} 
              className="flex items-center cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors"
              onClick={() => onOptionClick(option.id)}
            >
              {selectedOption === option.id ? (
                <div className="bg-[#1544AB] text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center">
                  {option.label}
                </div>
              ) : (
                <div className="text-black text-sm font-medium w-full hover:text-[#1544AB] transition-colors">
                  {option.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Confirmation Panel Component
const ConfirmationPanel = ({ onContinue, categoryTitle }) => (
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

export default CategorySelectionDetails;