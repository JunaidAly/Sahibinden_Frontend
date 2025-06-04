
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate import
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
  debugCategoryStructure 
} from '../../config/categories';

const CategorySelectionDetails = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate(); // Add this hook
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load category configuration when component mounts or slug changes
  useEffect(() => {
    const loadCategoryData = () => {
      setIsLoading(true);
      
      try {
        // Get category configuration using the new system
        const config = getCategoryConfig(categorySlug);
        setCategoryData(config);
        
        // Debug log (remove in production)
        if (process.env.NODE_ENV === 'development') {
          debugCategoryStructure(categorySlug);
        }
        
        // Reset selections when category changes
        setSelectedLevel1(null);
        setSelectedLevel2(null);
        setSelectedLevel3(null);
        
      } catch (error) {
        console.error('Error loading category configuration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [categorySlug]);

  // Event handlers for level selections
  const handleLevel1Click = (optionId) => {
    setSelectedLevel1(optionId);
    setSelectedLevel2(null); // Reset dependent levels
    setSelectedLevel3(null);
    
    console.log('Level 1 selected:', optionId);
  };

  const handleLevel2Click = (optionId) => {
    setSelectedLevel2(optionId);
    setSelectedLevel3(null); // Reset dependent level
    
    console.log('Level 2 selected:', optionId);
  };

  const handleLevel3Click = (optionId) => {
    setSelectedLevel3(optionId);
    
    console.log('Level 3 selected:', optionId);
  };

  // Handle continue button click
  const handleContinue = () => {
    const selectionData = {
      category: categorySlug,
      categoryTitle: categoryData?.title,
      level1: selectedLevel1,
      level2: selectedLevel2,
      level3: selectedLevel3,
      labels: getSelectedLabels(categorySlug, selectedLevel1, selectedLevel2, selectedLevel3)
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
  const levelOptions = getLevelOptions(categorySlug, selectedLevel1, selectedLevel2);
  
  // Check if selection is complete
  const selectionComplete = isSelectionComplete(categorySlug, selectedLevel1, selectedLevel2, selectedLevel3);
  
  // Get selected labels for breadcrumb
  const selectedLabels = getSelectedLabels(categorySlug, selectedLevel1, selectedLevel2, selectedLevel3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1300px] mx-auto p-8 mt-10 font-poppins bg-white rounded-xl shadow-custom">
        <h1 className="text-2xl font-[500] text-black mb-4">Step by Step Select Category</h1>
        <h2 className="text-xl text-[#888F9F] text-[20px] font-[500] mb-6">{categoryData.title}</h2>
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="font-medium">{categoryData.title}</span>
          {selectedLevel1 && (
            <>
              <span className="mx-2">→</span>
              <span className="text-blue-600 font-medium">{selectedLabels.level1}</span>
            </>
          )}
          {selectedLevel2 && (
            <>
              <span className="mx-2">→</span>
              <span className="text-blue-600 font-medium">{selectedLabels.level2}</span>
            </>
          )}
          {selectedLevel3 && (
            <>
              <span className="mx-2">→</span>
              <span className="text-blue-600 font-medium">{selectedLabels.level3}</span>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap items-start">
          {/* Category Columns */}
          <div className="flex flex-wrap w-full lg:w-3/4 gap-4">
            
            {/* Level 1 Column */}
            <CategoryColumn
              title="Select Category"
              options={levelOptions.level1}
              selectedOption={selectedLevel1}
              onOptionClick={handleLevel1Click}
              isVisible={true}
            />

            {/* Level 2 Column - Only show if level1 is selected */}
            <CategoryColumn
              title="Select Type"
              options={levelOptions.level2}
              selectedOption={selectedLevel2}
              onOptionClick={handleLevel2Click}
              isVisible={levelOptions.level2.length > 0}
            />

            {/* Level 3 Column - Only show if level2 is selected */}
            <CategoryColumn
              title="Select Subtype"
              options={levelOptions.level3}
              selectedOption={selectedLevel3}
              onOptionClick={handleLevel3Click}
              isVisible={levelOptions.level3.length > 0}
            />
          </div>
          
          {/* Confirmation Section */}
          <ConfirmationPanel 
            isComplete={selectionComplete}
            onContinue={handleContinue}
            categoryTitle={categoryData.title}
          />
        </div>
      </div>
      
      <CategorySearch/>
      <CommentForm/>
      <Footer/>
    </div>
  );
};

// Reusable Category Column Component
const CategoryColumn = ({ title, options, selectedOption, onOptionClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="w-[282px] p-2">
      <div className="bg-white rounded-lg shadow-custom">
        <div className="p-4 bg-blue-50 rounded-t-lg">
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
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

// Reusable Confirmation Panel Component
const ConfirmationPanel = ({ isComplete, onContinue, categoryTitle }) => (
  <div className="w-full lg:w-1/4 p-2 flex flex-col items-center justify-center shadow-custom h-[300px] rounded-lg bg-white">
    <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 transition-colors ${
      isComplete ? 'bg-[#1544AB]' : 'bg-gray-300'
    }`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    
    <p className="text-center text-black font-medium mb-2 w-[164px] text-sm">
      {isComplete 
        ? `${categoryTitle} Selection Complete` 
        : 'Please select all required options'
      }
    </p>
    
    <button 
      className={`text-white py-3 px-6 rounded-md font-medium w-[148px] transition-all duration-200 ${
        isComplete 
          ? 'bg-[#1544AB] hover:bg-blue-700 hover:scale-105' 
          : 'bg-gray-400 cursor-not-allowed'
      }`}
      disabled={!isComplete}
      onClick={onContinue}
    >
      Continue
    </button>
  </div>
);

export default CategorySelectionDetails;