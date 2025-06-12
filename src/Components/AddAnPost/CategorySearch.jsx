// import React from "react";

// function CategorySearch() {
//   return (
//     <div className="flex flex-col gap-4 max-w-[1300px] mt-10 mx-auto h-[300px] ">
//       <h2 className="text-2xl font-[500] text-black  ">
//         Select Category by searching with keyword
//       </h2>
//       {/* Center: Search Bar */}
//       <div className="flex-1 ">
//         <div className="flex items-center w-[370px] border border-[#1544AB] rounded-md overflow-hidden">
//           <input
//             type="text"
//             placeholder="Type the content you want to search"
//             className="w-[464px] px-4 py-2 outline-none font-sans font-[700] text-gray-700 placeholder-[#D9D9D9]"
//           />
//           <button className="px-3  text-[#1544AB]">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CategorySearch;




import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

// Import your category configuration system
import { 
  getCategoryConfig, 
  getLevelOptions, 
  getSelectedLabels,
  getMaxLevel,
  getAvailableCategories,
  getCategoryTitle,
  searchCategoriesAndSubcategories
} from '../../config/categories';

function CategorySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Get all available categories from your config
  const availableCategories = getAvailableCategories();

  // Function to search through all categories and their subcategories
  const searchCategories = (query) => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Use the utility function from categories config
    return searchCategoriesAndSubcategories(query, 15); // Limit to 15 results
  };

  // Recursive function to search through subcategories
  const searchSubcategories = (categorySlug, currentSelections, level, maxLevel, searchQuery, results, categoryTitle) => {
    if (level > maxLevel) return;

    const levelOptions = getLevelOptions(categorySlug, currentSelections);
    const levelKey = `level${level}`;
    const options = levelOptions[levelKey] || [];

    options.forEach(option => {
      const optionLabel = option.label.toLowerCase();
      
      // Check if this option matches the search
      if (optionLabel.includes(searchQuery)) {
        const newSelections = { ...currentSelections, [levelKey]: option.id };
        const selectedLabels = getSelectedLabels(categorySlug, newSelections);
        
        // Build the full path
        const pathParts = [categoryTitle];
        for (let i = 1; i <= level; i++) {
          const levelLabel = selectedLabels[`level${i}`];
          if (levelLabel) {
            pathParts.push(levelLabel);
          }
        }
        
        results.push({
          categorySlug,
          categoryTitle,
          selections: newSelections,
          level,
          fullPath: pathParts.join(' → '),
          matchType: 'subcategory',
          option: option
        });
      }

      // Continue searching deeper levels
      if (level < maxLevel) {
        const newSelections = { ...currentSelections, [levelKey]: option.id };
        searchSubcategories(categorySlug, newSelections, level + 1, maxLevel, searchQuery, results, categoryTitle);
      }
    });
  };

  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        setIsSearching(true);
        const results = searchCategories(value);
        setSearchResults(results);
        setShowResults(true);
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay
  };

  // Handle result selection
  const handleResultSelect = (result) => {
    if (result.matchType === 'category') {
      // Navigate to category page
      navigate(`/category/${result.categorySlug}`);
    } else {
      // Navigate to category page with pre-filled selections
      navigate(`/category/${result.categorySlug}`, { 
        state: { 
          prefilledSelections: result.selections,
          searchTerm: searchTerm 
        } 
      });
    }
    
    // Clear search
    setSearchTerm('');
    setShowResults(false);
    setSearchResults([]);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchTerm.trim().length >= 2) {
      setIsSearching(true);
      const results = searchCategories(searchTerm);
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-[1300px] mt-10 mx-auto h-[300px] relative">
      <h2 className="text-2xl font-[500] text-black">
        Select Category by searching with keyword
      </h2>
      
      {/* Search Bar Container */}
      <div className="flex-1 relative" ref={resultsRef}>
        <div className="flex items-center w-[370px] border border-[#1544AB] rounded-md overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="Type the content you want to search"
            className="w-[464px] px-4 py-2 outline-none font-sans font-[700] text-gray-700 placeholder-[#D9D9D9]"
          />
          <button 
            onClick={handleSearchClick}
            disabled={isSearching}
            className="px-3 text-[#1544AB] hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            {isSearching ? (
              <div className="w-6 h-6 border-2 border-[#1544AB] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute  left-0 w-[464px] bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto z-50 mt-1">
            {searchResults.length > 0 ? (
              <>
                <div className="px-4 py-2 bg-gray-50 border-b text-sm text-gray-600 font-medium">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </div>
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleResultSelect(result)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {result.fullPath}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {result.matchType === 'category' ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Main Category
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Level {result.level} Subcategory
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-[#1544AB] ml-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="text-sm">No categories found</div>
                <div className="text-xs text-gray-400 mt-1">Try a different search term</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySearch;