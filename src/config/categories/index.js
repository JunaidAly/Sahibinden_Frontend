
// // 📁 src/config/categories/index.js
// // Import all category configurations
// import { realEstateConfig } from './realEstate';
// import { vehicleConfig } from './vehicle';
// import { sparePartsConfig } from './spareParts';
// import { shoppingConfig } from './shopping';
// import { constructionConfig } from './construction';
// import { servicesConfig } from './services';
// import { tutorsConfig } from './tutors';
// import { jobsConfig } from './jobs';
// import { animalsConfig } from './animals';
// import { helpConfig } from './help';

// // Default fallback configuration with 9 levels
// const defaultConfig = {
//   title: 'Category Details',
//   level1: [
//     { id: 'option1', label: 'Option 1' },
//     { id: 'option2', label: 'Option 2' },
//     { id: 'option3', label: 'Option 3' },
//   ],
//   level2: {
//     option1: [
//       { id: 'sub1', label: 'Sub Option 1' },
//       { id: 'sub2', label: 'Sub Option 2' },
//     ],
//     option2: [
//       { id: 'sub3', label: 'Sub Option 3' },
//       { id: 'sub4', label: 'Sub Option 4' },
//     ],
//     option3: [
//       { id: 'sub5', label: 'Sub Option 5' },
//     ]
//   },
//   level3: {
//     sub1: [
//       { id: 'subsub1', label: 'Sub Sub Option 1' },
//       { id: 'subsub2', label: 'Sub Sub Option 2' },
//     ],
//     sub2: [
//       { id: 'subsub3', label: 'Sub Sub Option 3' },
//     ],
//     sub3: [
//       { id: 'subsub4', label: 'Sub Sub Option 4' },
//     ]
//   },
//   level4: {
//     subsub1: [
//       { id: 'level4_1', label: 'Level 4 Option 1' },
//       { id: 'level4_2', label: 'Level 4 Option 2' },
//     ],
//     subsub2: [
//       { id: 'level4_3', label: 'Level 4 Option 3' },
//     ]
//   },
//   level5: {
//     level4_1: [
//       { id: 'level5_1', label: 'Level 5 Option 1' },
//       { id: 'level5_2', label: 'Level 5 Option 2' },
//     ],
//     level4_2: [
//       { id: 'level5_3', label: 'Level 5 Option 3' },
//     ]
//   },
//   level6: {
//     level5_1: [
//       { id: 'level6_1', label: 'Level 6 Option 1' },
//       { id: 'level6_2', label: 'Level 6 Option 2' },
//     ],
//     level5_2: [
//       { id: 'level6_3', label: 'Level 6 Option 3' },
//     ]
//   },
//   level7: {
//     level6_1: [
//       { id: 'level7_1', label: 'Level 7 Option 1' },
//       { id: 'level7_2', label: 'Level 7 Option 2' },
//     ],
//     level6_2: [
//       { id: 'level7_3', label: 'Level 7 Option 3' },
//     ]
//   },
//   level8: {
//     level7_1: [
//       { id: 'level8_1', label: 'Level 8 Option 1' },
//       { id: 'level8_2', label: 'Level 8 Option 2' },
//     ],
//     level7_2: [
//       { id: 'level8_3', label: 'Level 8 Option 3' },
//     ]
//   },
//   level9: {
//     level8_1: [
//       { id: 'level9_1', label: 'Level 9 Option 1' },
//       { id: 'level9_2', label: 'Level 9 Option 2' },
//     ],
//     level8_2: [
//       { id: 'level9_3', label: 'Level 9 Option 3' },
//     ]
//   }
// };

// // Main category configurations mapping
// export const categoryConfigs = {
//   'real-estate': realEstateConfig,
//   'vehicle': vehicleConfig,
//   'spare-parts': sparePartsConfig,
//   'shopping': shoppingConfig,
//   'construction': constructionConfig,
//   'services': servicesConfig,
//   'tutors': tutorsConfig,
//   'jobs': jobsConfig,
//   'animals': animalsConfig,
//   'help': helpConfig,
//   'default': defaultConfig
// };

// // Main function to get category configuration
// export const getCategoryConfig = (categorySlug) => {
//   try {
//     // Get the configuration for the given slug
//     const config = categoryConfigs[categorySlug];
    
//     if (!config) {
//       console.warn(`Configuration not found for category: ${categorySlug}. Using default configuration.`);
//       return categoryConfigs['default'];
//     }

//     console.log(`Loaded configuration for category: ${categorySlug}`);
//     return config;
//   } catch (error) {
//     console.error(`Error loading category configuration for ${categorySlug}:`, error);
//     return categoryConfigs['default'];
//   }
// };

// // Utility function to get all available category slugs
// export const getAvailableCategories = () => {
//   return Object.keys(categoryConfigs).filter(key => key !== 'default');
// };

// // Utility function to check if a category exists
// export const categoryExists = (categorySlug) => {
//   return categoryConfigs.hasOwnProperty(categorySlug);
// };

// // Utility function to get category title
// export const getCategoryTitle = (categorySlug) => {
//   const config = getCategoryConfig(categorySlug);
//   return config.title;
// };

// // Validation function to check if category configuration is valid (supports 9 levels)
// export const validateCategoryConfig = (config) => {
//   const errors = [];
  
//   if (!config) {
//     errors.push('Configuration is null or undefined');
//     return { isValid: false, errors };
//   }

//   if (!config.title) {
//     errors.push('Category title is required');
//   }

//   if (!config.level1 || !Array.isArray(config.level1) || config.level1.length === 0) {
//     errors.push('Level1 options are required and must be a non-empty array');
//   }

//   // Validate level1 options
//   if (config.level1) {
//     config.level1.forEach((option, index) => {
//       if (!option.id || !option.label) {
//         errors.push(`Level1 option at index ${index} must have both 'id' and 'label' properties`);
//       }
//     });
//   }

//   // Validate level2-9 references
//   for (let level = 2; level <= 9; level++) {
//     const currentLevel = config[`level${level}`];
//     const previousLevel = level === 2 ? config.level1 : config[`level${level - 1}`];
    
//     if (currentLevel) {
//       Object.keys(currentLevel).forEach(key => {
//         let previousLevelExists = false;
        
//         if (level === 2) {
//           // Check if key exists in level1
//           previousLevelExists = config.level1?.some(opt => opt.id === key);
//         } else {
//           // Check if key exists in previous level options
//           previousLevelExists = Object.values(previousLevel || {})
//             .flat()
//             .some(opt => opt.id === key);
//         }
        
//         if (!previousLevelExists) {
//           errors.push(`Level${level} key "${key}" does not reference a valid level${level - 1} option`);
//         }
//       });
      
//       // Validate options in current level
//       Object.values(currentLevel).forEach((options, groupIndex) => {
//         if (!Array.isArray(options)) {
//           errors.push(`Level${level} options must be arrays`);
//         } else {
//           options.forEach((option, optionIndex) => {
//             if (!option.id || !option.label) {
//               errors.push(`Level${level} option at group ${groupIndex}, index ${optionIndex} must have both 'id' and 'label' properties`);
//             }
//           });
//         }
//       });
//     }
//   }

//   return {
//     isValid: errors.length === 0,
//     errors
//   };
// };

// // Function to get level options based on current selections (supports 9 levels)
// export const getLevelOptions = (categorySlug, selections = {}) => {
//   const config = getCategoryConfig(categorySlug);
//   const result = {};
  
//   // Level 1 is always available
//   result.level1 = config.level1 || [];
  
//   // For levels 2-9, check if parent level is selected
//   for (let level = 2; level <= 9; level++) {
//     const parentSelection = selections[`level${level - 1}`];
//     const levelConfig = config[`level${level}`];
    
//     if (parentSelection && levelConfig && levelConfig[parentSelection]) {
//       result[`level${level}`] = levelConfig[parentSelection];
//     } else {
//       result[`level${level}`] = [];
//     }
//   }

//   return result;
// };

// // Alternative function signature for backward compatibility
// export const getLevelOptionsCompat = (categorySlug, selectedLevel1 = null, selectedLevel2 = null) => {
//   const selections = {
//     level1: selectedLevel1,
//     level2: selectedLevel2
//   };
//   return getLevelOptions(categorySlug, selections);
// };

// // Function to check if selection is complete (supports 9 levels)
// export const isSelectionComplete = (categorySlug, selections = {}) => {
//   const config = getCategoryConfig(categorySlug);
  
//   // Must have at least level1 selected
//   if (!selections.level1) {
//     return false;
//   }

//   // Check each level to see if it has options and if so, ensure it's selected
//   for (let level = 2; level <= 9; level++) {
//     const parentSelection = selections[`level${level - 1}`];
//     const levelConfig = config[`level${level}`];
    
//     // If this level has options for the parent selection
//     if (parentSelection && levelConfig && levelConfig[parentSelection] && levelConfig[parentSelection].length > 0) {
//       // This level must be selected
//       if (!selections[`level${level}`]) {
//         return false;
//       }
//     } else {
//       // No more levels available, selection is complete
//       break;
//     }
//   }

//   return true;
// };

// // Function to get selected option labels (for breadcrumb, supports 9 levels)
// export const getSelectedLabels = (categorySlug, selections = {}) => {
//   const options = getLevelOptions(categorySlug, selections);
//   const labels = {};
  
//   for (let level = 1; level <= 9; level++) {
//     const selectedValue = selections[`level${level}`];
//     const levelOptions = options[`level${level}`] || [];
    
//     labels[`level${level}`] = levelOptions.find(opt => opt.id === selectedValue)?.label || '';
//   }

//   return labels;
// };

// // Function to get the deepest available level for a category
// export const getMaxLevel = (categorySlug) => {
//   const config = getCategoryConfig(categorySlug);
//   let maxLevel = 1;
  
//   for (let level = 2; level <= 9; level++) {
//     if (config[`level${level}`] && Object.keys(config[`level${level}`]).length > 0) {
//       maxLevel = level;
//     } else {
//       break;
//     }
//   }
  
//   return maxLevel;
// };

// // Function to get all possible selection paths for a category
// export const getAllSelectionPaths = (categorySlug) => {
//   const config = getCategoryConfig(categorySlug);
//   const paths = [];
  
//   const buildPaths = (currentPath = {}, level = 1) => {
//     if (level > 9) return;
    
//     const levelOptions = level === 1 
//       ? config.level1 || []
//       : (config[`level${level}`] && config[`level${level}`][currentPath[`level${level - 1}`]]) || [];
    
//     if (levelOptions.length === 0) {
//       paths.push({ ...currentPath });
//       return;
//     }
    
//     levelOptions.forEach(option => {
//       const newPath = {
//         ...currentPath,
//         [`level${level}`]: option.id
//       };
//       buildPaths(newPath, level + 1);
//     });
//   };
  
//   buildPaths();
//   return paths;
// };

// // Debug function to log category structure (supports 9 levels)
// export const debugCategoryStructure = (categorySlug) => {
//   const config = getCategoryConfig(categorySlug);
  
//   console.group(`Category Structure: ${config.title}`);
  
//   for (let level = 1; level <= 9; level++) {
//     if (level === 1) {
//       console.log(`Level ${level} options:`, config.level1?.length || 0);
//     } else {
//       const levelConfig = config[`level${level}`];
//       if (levelConfig) {
//         const groupCount = Object.keys(levelConfig).length;
//         const totalOptions = Object.values(levelConfig).reduce((total, options) => total + options.length, 0);
//         console.log(`Level ${level} groups: ${groupCount}, total options: ${totalOptions}`);
//       } else {
//         console.log(`Level ${level}: Not configured`);
//         break;
//       }
//     }
//   }
  
//   console.log(`Maximum level: ${getMaxLevel(categorySlug)}`);
  
//   // Validation
//   const validation = validateCategoryConfig(config);
//   if (validation.isValid) {
//     console.log('✅ Configuration is valid');
//   } else {
//     console.warn('❌ Configuration has errors:', validation.errors);
//   }
  
//   console.groupEnd();
  
//   return config;
// };

// // Utility function to convert old selection format to new format
// export const convertSelectionsFormat = (selectedLevel1, selectedLevel2, selectedLevel3) => {
//   return {
//     level1: selectedLevel1,
//     level2: selectedLevel2,
//     level3: selectedLevel3
//   };
// };

// // Export everything for easy importing
// export {
//   realEstateConfig,
//   vehicleConfig,
//   sparePartsConfig,
//   shoppingConfig,
//   constructionConfig,
//   servicesConfig,
//   tutorsConfig,
//   jobsConfig,
//   animalsConfig,
//   helpConfig,
//   defaultConfig
// };












// 📁 src/config/categories/index.js
// Import all category configurations
import { realEstateConfig } from './realEstate';
import { vehicleConfig } from './vehicle';
import { sparePartsConfig } from './spareParts';
import { shoppingConfig } from './shopping';
import { constructionConfig } from './construction';
import { servicesConfig } from './services';
import { tutorsConfig } from './tutors';
import { jobsConfig } from './jobs';
import { animalsConfig } from './animals';
import { helpConfig } from './help';

// Default fallback configuration with 9 levels
const defaultConfig = {
  title: 'Category Details',
  level1: [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ],
  level2: {
    option1: [
      { id: 'sub1', label: 'Sub Option 1' },
      { id: 'sub2', label: 'Sub Option 2' },
    ],
    option2: [
      { id: 'sub3', label: 'Sub Option 3' },
      { id: 'sub4', label: 'Sub Option 4' },
    ],
    option3: [
      { id: 'sub5', label: 'Sub Option 5' },
    ]
  },
  level3: {
    sub1: [
      { id: 'subsub1', label: 'Sub Sub Option 1' },
      { id: 'subsub2', label: 'Sub Sub Option 2' },
    ],
    sub2: [
      { id: 'subsub3', label: 'Sub Sub Option 3' },
    ],
    sub3: [
      { id: 'subsub4', label: 'Sub Sub Option 4' },
    ]
  },
  level4: {
    subsub1: [
      { id: 'level4_1', label: 'Level 4 Option 1' },
      { id: 'level4_2', label: 'Level 4 Option 2' },
    ],
    subsub2: [
      { id: 'level4_3', label: 'Level 4 Option 3' },
    ]
  },
  level5: {
    level4_1: [
      { id: 'level5_1', label: 'Level 5 Option 1' },
      { id: 'level5_2', label: 'Level 5 Option 2' },
    ],
    level4_2: [
      { id: 'level5_3', label: 'Level 5 Option 3' },
    ]
  },
  level6: {
    level5_1: [
      { id: 'level6_1', label: 'Level 6 Option 1' },
      { id: 'level6_2', label: 'Level 6 Option 2' },
    ],
    level5_2: [
      { id: 'level6_3', label: 'Level 6 Option 3' },
    ]
  },
  level7: {
    level6_1: [
      { id: 'level7_1', label: 'Level 7 Option 1' },
      { id: 'level7_2', label: 'Level 7 Option 2' },
    ],
    level6_2: [
      { id: 'level7_3', label: 'Level 7 Option 3' },
    ]
  },
  level8: {
    level7_1: [
      { id: 'level8_1', label: 'Level 8 Option 1' },
      { id: 'level8_2', label: 'Level 8 Option 2' },
    ],
    level7_2: [
      { id: 'level8_3', label: 'Level 8 Option 3' },
    ]
  },
  level9: {
    level8_1: [
      { id: 'level9_1', label: 'Level 9 Option 1' },
      { id: 'level9_2', label: 'Level 9 Option 2' },
    ],
    level8_2: [
      { id: 'level9_3', label: 'Level 9 Option 3' },
    ]
  }
};

// Main category configurations mapping
export const categoryConfigs = {
  'real-estate': realEstateConfig,
  'vehicle': vehicleConfig,
  'spare-parts': sparePartsConfig,
  'shopping': shoppingConfig,
  'construction': constructionConfig,
  'services': servicesConfig,
  'tutors': tutorsConfig,
  'jobs': jobsConfig,
  'animals': animalsConfig,
  'help': helpConfig,
  'default': defaultConfig
};

// Main function to get category configuration
export const getCategoryConfig = (categorySlug) => {
  try {
    // Get the configuration for the given slug
    const config = categoryConfigs[categorySlug];
    
    if (!config) {
      console.warn(`Configuration not found for category: ${categorySlug}. Using default configuration.`);
      return categoryConfigs['default'];
    }

    console.log(`Loaded configuration for category: ${categorySlug}`);
    return config;
  } catch (error) {
    console.error(`Error loading category configuration for ${categorySlug}:`, error);
    return categoryConfigs['default'];
  }
};

// Utility function to get all available category slugs
export const getAvailableCategories = () => {
  return Object.keys(categoryConfigs).filter(key => key !== 'default');
};

// Utility function to check if a category exists
export const categoryExists = (categorySlug) => {
  return categoryConfigs.hasOwnProperty(categorySlug);
};

// Utility function to get category title
export const getCategoryTitle = (categorySlug) => {
  const config = getCategoryConfig(categorySlug);
  return config.title;
};

// NEW: Search utility function for categories and subcategories
export const searchCategoriesAndSubcategories = (query, limit = 20) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = [];
  const searchQuery = query.toLowerCase().trim();
  const availableCategories = getAvailableCategories();

  availableCategories.forEach(categorySlug => {
    try {
      const categoryConfig = getCategoryConfig(categorySlug);
      const maxLevel = getMaxLevel(categorySlug);
      
      // Check if main category matches
      if (categoryConfig.title.toLowerCase().includes(searchQuery)) {
        results.push({
          categorySlug,
          categoryTitle: categoryConfig.title,
          path: [],
          level: 0,
          fullPath: categoryConfig.title,
          matchType: 'category',
          score: calculateMatchScore(categoryConfig.title, searchQuery)
        });
      }

      // Search through all possible subcategory combinations
      searchSubcategoriesRecursive(categorySlug, {}, 1, maxLevel, searchQuery, results, categoryConfig.title);
      
    } catch (error) {
      console.error(`Error searching category ${categorySlug}:`, error);
    }
  });

  // Sort results by relevance and limit
  return results
    .sort((a, b) => {
      // First by match score (higher is better)
      if (a.score !== b.score) return b.score - a.score;
      
      // Then by match type (categories before subcategories)
      if (a.matchType === 'category' && b.matchType === 'subcategory') return -1;
      if (a.matchType === 'subcategory' && b.matchType === 'category') return 1;
      
      // Then by level (lower level subcategories first)
      return a.level - b.level;
    })
    .slice(0, limit);
};

// NEW: Calculate match score for better search relevance
const calculateMatchScore = (text, query) => {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Exact match gets highest score
  if (textLower === queryLower) return 100;
  
  // Starts with query gets high score
  if (textLower.startsWith(queryLower)) return 80;
  
  // Contains query as whole word gets medium-high score
  const words = textLower.split(/\s+/);
  if (words.some(word => word === queryLower)) return 60;
  
  // Contains query gets medium score
  if (textLower.includes(queryLower)) return 40;
  
  // Partial word matches get lower score
  const queryWords = queryLower.split(/\s+/);
  let partialMatches = 0;
  queryWords.forEach(queryWord => {
    if (words.some(word => word.includes(queryWord))) {
      partialMatches++;
    }
  });
  
  return (partialMatches / queryWords.length) * 20;
};

// NEW: Recursive helper function for searching subcategories
const searchSubcategoriesRecursive = (categorySlug, currentSelections, level, maxLevel, searchQuery, results, categoryTitle) => {
  if (level > maxLevel) return;

  const levelOptions = getLevelOptions(categorySlug, currentSelections);
  const levelKey = `level${level}`;
  const options = levelOptions[levelKey] || [];

  options.forEach(option => {
    const optionLabel = option.label.toLowerCase();
    
    // Check if this option matches the search
    const score = calculateMatchScore(option.label, searchQuery);
    if (score > 0) {
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
        option: option,
        score: score
      });
    }

    // Continue searching deeper levels
    if (level < maxLevel) {
      const newSelections = { ...currentSelections, [levelKey]: option.id };
      searchSubcategoriesRecursive(categorySlug, newSelections, level + 1, maxLevel, searchQuery, results, categoryTitle);
    }
  });
};

// NEW: Get category suggestions based on partial input
export const getCategorySuggestions = (partialInput, limit = 5) => {
  if (!partialInput || partialInput.trim().length < 1) {
    return [];
  }

  const suggestions = [];
  const input = partialInput.toLowerCase().trim();
  const availableCategories = getAvailableCategories();

  availableCategories.forEach(categorySlug => {
    try {
      const categoryTitle = getCategoryTitle(categorySlug);
      if (categoryTitle.toLowerCase().startsWith(input)) {
        suggestions.push({
          categorySlug,
          categoryTitle,
          matchType: 'category'
        });
      }
    } catch (error) {
      console.error(`Error getting suggestion for ${categorySlug}:`, error);
    }
  });

  return suggestions.slice(0, limit);
};

// NEW: Get popular search terms (you can extend this based on usage analytics)
export const getPopularSearchTerms = () => {
  const availableCategories = getAvailableCategories();
  return availableCategories.map(slug => getCategoryTitle(slug));
};

// Validation function to check if category configuration is valid (supports 9 levels)
export const validateCategoryConfig = (config) => {
  const errors = [];
  
  if (!config) {
    errors.push('Configuration is null or undefined');
    return { isValid: false, errors };
  }

  if (!config.title) {
    errors.push('Category title is required');
  }

  if (!config.level1 || !Array.isArray(config.level1) || config.level1.length === 0) {
    errors.push('Level1 options are required and must be a non-empty array');
  }

  // Validate level1 options
  if (config.level1) {
    config.level1.forEach((option, index) => {
      if (!option.id || !option.label) {
        errors.push(`Level1 option at index ${index} must have both 'id' and 'label' properties`);
      }
    });
  }

  // Validate level2-9 references
  for (let level = 2; level <= 9; level++) {
    const currentLevel = config[`level${level}`];
    const previousLevel = level === 2 ? config.level1 : config[`level${level - 1}`];
    
    if (currentLevel) {
      Object.keys(currentLevel).forEach(key => {
        let previousLevelExists = false;
        
        if (level === 2) {
          // Check if key exists in level1
          previousLevelExists = config.level1?.some(opt => opt.id === key);
        } else {
          // Check if key exists in previous level options
          previousLevelExists = Object.values(previousLevel || {})
            .flat()
            .some(opt => opt.id === key);
        }
        
        if (!previousLevelExists) {
          errors.push(`Level${level} key "${key}" does not reference a valid level${level - 1} option`);
        }
      });
      
      // Validate options in current level
      Object.values(currentLevel).forEach((options, groupIndex) => {
        if (!Array.isArray(options)) {
          errors.push(`Level${level} options must be arrays`);
        } else {
          options.forEach((option, optionIndex) => {
            if (!option.id || !option.label) {
              errors.push(`Level${level} option at group ${groupIndex}, index ${optionIndex} must have both 'id' and 'label' properties`);
            }
          });
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to get level options based on current selections (supports 9 levels)
export const getLevelOptions = (categorySlug, selections = {}) => {
  const config = getCategoryConfig(categorySlug);
  const result = {};
  
  // Level 1 is always available
  result.level1 = config.level1 || [];
  
  // For levels 2-9, check if parent level is selected
  for (let level = 2; level <= 9; level++) {
    const parentSelection = selections[`level${level - 1}`];
    const levelConfig = config[`level${level}`];
    
    if (parentSelection && levelConfig && levelConfig[parentSelection]) {
      result[`level${level}`] = levelConfig[parentSelection];
    } else {
      result[`level${level}`] = [];
    }
  }

  return result;
};

// Alternative function signature for backward compatibility
export const getLevelOptionsCompat = (categorySlug, selectedLevel1 = null, selectedLevel2 = null) => {
  const selections = {
    level1: selectedLevel1,
    level2: selectedLevel2
  };
  return getLevelOptions(categorySlug, selections);
};

// Function to check if selection is complete (supports 9 levels)
export const isSelectionComplete = (categorySlug, selections = {}) => {
  const config = getCategoryConfig(categorySlug);
  
  // Must have at least level1 selected
  if (!selections.level1) {
    return false;
  }

  // Check each level to see if it has options and if so, ensure it's selected
  for (let level = 2; level <= 9; level++) {
    const parentSelection = selections[`level${level - 1}`];
    const levelConfig = config[`level${level}`];
    
    // If this level has options for the parent selection
    if (parentSelection && levelConfig && levelConfig[parentSelection] && levelConfig[parentSelection].length > 0) {
      // This level must be selected
      if (!selections[`level${level}`]) {
        return false;
      }
    } else {
      // No more levels available, selection is complete
      break;
    }
  }

  return true;
};

// Function to get selected option labels (for breadcrumb, supports 9 levels)
export const getSelectedLabels = (categorySlug, selections = {}) => {
  const options = getLevelOptions(categorySlug, selections);
  const labels = {};
  
  for (let level = 1; level <= 9; level++) {
    const selectedValue = selections[`level${level}`];
    const levelOptions = options[`level${level}`] || [];
    
    labels[`level${level}`] = levelOptions.find(opt => opt.id === selectedValue)?.label || '';
  }

  return labels;
};

// Function to get the deepest available level for a category
export const getMaxLevel = (categorySlug) => {
  const config = getCategoryConfig(categorySlug);
  let maxLevel = 1;
  
  for (let level = 2; level <= 9; level++) {
    if (config[`level${level}`] && Object.keys(config[`level${level}`]).length > 0) {
      maxLevel = level;
    } else {
      break;
    }
  }
  
  return maxLevel;
};

// Function to get all possible selection paths for a category
export const getAllSelectionPaths = (categorySlug) => {
  const config = getCategoryConfig(categorySlug);
  const paths = [];
  
  const buildPaths = (currentPath = {}, level = 1) => {
    if (level > 9) return;
    
    const levelOptions = level === 1 
      ? config.level1 || []
      : (config[`level${level}`] && config[`level${level}`][currentPath[`level${level - 1}`]]) || [];
    
    if (levelOptions.length === 0) {
      paths.push({ ...currentPath });
      return;
    }
    
    levelOptions.forEach(option => {
      const newPath = {
        ...currentPath,
        [`level${level}`]: option.id
      };
      buildPaths(newPath, level + 1);
    });
  };
  
  buildPaths();
  return paths;
};

// Debug function to log category structure (supports 9 levels)
export const debugCategoryStructure = (categorySlug) => {
  const config = getCategoryConfig(categorySlug);
  
  console.group(`Category Structure: ${config.title}`);
  
  for (let level = 1; level <= 9; level++) {
    if (level === 1) {
      console.log(`Level ${level} options:`, config.level1?.length || 0);
    } else {
      const levelConfig = config[`level${level}`];
      if (levelConfig) {
        const groupCount = Object.keys(levelConfig).length;
        const totalOptions = Object.values(levelConfig).reduce((total, options) => total + options.length, 0);
        console.log(`Level ${level} groups: ${groupCount}, total options: ${totalOptions}`);
      } else {
        console.log(`Level ${level}: Not configured`);
        break;
      }
    }
  }
  
  console.log(`Maximum level: ${getMaxLevel(categorySlug)}`);
  
  // Validation
  const validation = validateCategoryConfig(config);
  if (validation.isValid) {
    console.log('✅ Configuration is valid');
  } else {
    console.warn('❌ Configuration has errors:', validation.errors);
  }
  
  console.groupEnd();
  
  return config;
};

// Utility function to convert old selection format to new format
export const convertSelectionsFormat = (selectedLevel1, selectedLevel2, selectedLevel3) => {
  return {
    level1: selectedLevel1,
    level2: selectedLevel2,
    level3: selectedLevel3
  };
};

// Export everything for easy importing
export {
  realEstateConfig,
  vehicleConfig,
  sparePartsConfig,
  shoppingConfig,
  constructionConfig,
  servicesConfig,
  tutorsConfig,
  jobsConfig,
  animalsConfig,
  helpConfig,
  defaultConfig
};