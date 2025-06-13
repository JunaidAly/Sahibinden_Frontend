
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

  // Enhanced function to search through all categories and build proper selections
  const searchCategories = (query) => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Use the utility function from categories config if it exists
    if (typeof searchCategoriesAndSubcategories === 'function') {
      return searchCategoriesAndSubcategories(query, 15);
    }

    // Fallback manual search
    const results = [];
    const searchQuery = query.toLowerCase().trim();

    // Search through each available category
    availableCategories.forEach(categorySlug => {
      const categoryTitle = getCategoryTitle(categorySlug);
      const maxLevel = getMaxLevel(categorySlug);
      
      // Check if main category matches
      if (categoryTitle.toLowerCase().includes(searchQuery)) {
        results.push({
          categorySlug,
          categoryTitle,
          selections: {},
          level: 0,
          fullPath: categoryTitle,
          matchType: 'category',
          option: null
        });
      }

      // Search through all subcategory levels
      searchSubcategoriesRecursively(categorySlug, {}, 1, maxLevel, searchQuery, results, categoryTitle);
    });

    // Sort results by relevance (exact matches first, then by level)
    return results
      .sort((a, b) => {
        // Prioritize exact matches
        const aExact = a.categoryTitle.toLowerCase() === searchQuery || 
                      (a.option && a.option.label.toLowerCase() === searchQuery);
        const bExact = b.categoryTitle.toLowerCase() === searchQuery || 
                      (b.option && b.option.label.toLowerCase() === searchQuery);
        
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        // Then by category type (main categories first)
        if (a.matchType === 'category' && b.matchType !== 'category') return -1;
        if (a.matchType !== 'category' && b.matchType === 'category') return 1;
        
        // Then by level (lower levels first)
        return a.level - b.level;
      })
      .slice(0, 15); // Limit to 15 results
  };

  // Recursive function to search through subcategories and build proper selection objects
  const searchSubcategoriesRecursively = (categorySlug, currentSelections, level, maxLevel, searchQuery, results, categoryTitle) => {
    if (level > maxLevel) return;

    try {
      const levelOptions = getLevelOptions(categorySlug, currentSelections);
      const levelKey = `level${level}`;
      const options = levelOptions[levelKey] || [];

      options.forEach(option => {
        const optionLabel = option.label.toLowerCase();
        
        // Check if this option matches the search
        if (optionLabel.includes(searchQuery)) {
          const newSelections = { ...currentSelections, [levelKey]: option.id };
          
          // Build the full path
          const pathParts = [categoryTitle];
          
          // Build path by getting labels for each selection
          for (let i = 1; i <= level; i++) {
            const iLevelKey = `level${i}`;
            if (newSelections[iLevelKey]) {
              // Get the option label for this level
              const iLevelOptions = getLevelOptions(categorySlug, 
                Object.fromEntries(Object.entries(newSelections).filter(([key]) => {
                  const levelNum = parseInt(key.replace('level', ''));
                  return levelNum < i;
                }))
              );
              const iOptions = iLevelOptions[iLevelKey] || [];
              const iOption = iOptions.find(opt => opt.id === newSelections[iLevelKey]);
              if (iOption) {
                pathParts.push(iOption.label);
              }
            }
          }
          
          results.push({
            categorySlug,
            categoryTitle,
            selections: newSelections,
            level,
            fullPath: pathParts.join(' → '),
            matchType: 'subcategory',
            option: option,
            matchedLabel: option.label
          });
        }

        // Continue searching deeper levels with current selection
        if (level < maxLevel) {
          const newSelections = { ...currentSelections, [levelKey]: option.id };
          searchSubcategoriesRecursively(categorySlug, newSelections, level + 1, maxLevel, searchQuery, results, categoryTitle);
        }
      });
    } catch (error) {
      console.warn(`Error searching level ${level} for category ${categorySlug}:`, error);
    }
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
        try {
          const results = searchCategories(value);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay
  };

  // Enhanced result selection handler
  const handleResultSelect = (result) => {
    console.log('Selected search result:', result);
    console.log('Selections to be passed:', result.selections);
    
    if (result.matchType === 'category') {
      // Navigate to category page without pre-filled selections
      navigate(`/category-selection-details/${result.categorySlug}`);
    } else {
      // Navigate to category page with pre-filled selections
      navigate(`/category-selection-details/${result.categorySlug}`, { 
        state: { 
          prefilledSelections: result.selections
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
      try {
        const results = searchCategories(searchTerm);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    } else if (e.key === 'Escape') {
      setShowResults(false);
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

        {/* Enhanced Search Results Dropdown */}
        {showResults && (
          <div className="absolute left-0 w-[464px] bg-white border border-gray-200 rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50 mt-1">
            {searchResults.length > 0 ? (
              <>
                <div className="px-4 py-2 bg-gray-50 border-b text-sm text-gray-600 font-medium">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </div>
                {searchResults.map((result, index) => (
                  <div
                    key={`${result.categorySlug}-${result.level}-${index}`}
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
            ) : searchTerm.trim().length >= 2 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="text-sm">No categories found</div>
                <div className="text-xs text-gray-400 mt-1">Try a different search term</div>
              </div>
            ) : (
              <div className="px-4 py-4 text-center text-gray-400 text-sm">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySearch;