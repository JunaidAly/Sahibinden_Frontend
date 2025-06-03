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

// Default fallback configuration
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
    ]
  },
  level3: {
    sub1: [
      { id: 'subsub1', label: 'Sub Sub Option 1' },
      { id: 'subsub2', label: 'Sub Sub Option 2' },
    ],
    sub2: [
      { id: 'subsub3', label: 'Sub Sub Option 3' },
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

// Validation function to check if category configuration is valid
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

  // Validate level2 references
  if (config.level2) {
    Object.keys(config.level2).forEach(key => {
      const level1Exists = config.level1?.some(opt => opt.id === key);
      if (!level1Exists) {
        errors.push(`Level2 key "${key}" does not reference a valid level1 option`);
      }
    });
  }

  // Validate level3 references
  if (config.level3) {
    Object.keys(config.level3).forEach(key => {
      const level2Exists = Object.values(config.level2 || {})
        .flat()
        .some(opt => opt.id === key);
      if (!level2Exists) {
        errors.push(`Level3 key "${key}" does not reference a valid level2 option`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to get level options based on current selections
export const getLevelOptions = (categorySlug, selectedLevel1 = null, selectedLevel2 = null) => {
  const config = getCategoryConfig(categorySlug);
  
  const level1Options = config.level1 || [];
  const level2Options = selectedLevel1 ? (config.level2?.[selectedLevel1] || []) : [];
  const level3Options = selectedLevel2 ? (config.level3?.[selectedLevel2] || []) : [];

  return {
    level1: level1Options,
    level2: level2Options,
    level3: level3Options
  };
};

// Function to check if selection is complete
export const isSelectionComplete = (categorySlug, selectedLevel1, selectedLevel2, selectedLevel3) => {
  const options = getLevelOptions(categorySlug, selectedLevel1, selectedLevel2);
  
  // Must have at least level1 and level2 selected
  if (!selectedLevel1 || !selectedLevel2) {
    return false;
  }

  // If level3 options exist, level3 must be selected
  if (options.level3.length > 0 && !selectedLevel3) {
    return false;
  }

  return true;
};

// Function to get selected option labels (for breadcrumb)
export const getSelectedLabels = (categorySlug, selectedLevel1, selectedLevel2, selectedLevel3) => {
  const options = getLevelOptions(categorySlug, selectedLevel1, selectedLevel2);
  
  const level1Label = options.level1.find(opt => opt.id === selectedLevel1)?.label || '';
  const level2Label = options.level2.find(opt => opt.id === selectedLevel2)?.label || '';
  const level3Label = options.level3.find(opt => opt.id === selectedLevel3)?.label || '';

  return {
    level1: level1Label,
    level2: level2Label,
    level3: level3Label
  };
};

// Debug function to log category structure
export const debugCategoryStructure = (categorySlug) => {
  const config = getCategoryConfig(categorySlug);
  
  console.group(`Category Structure: ${config.title}`);
  console.log('Level 1 options:', config.level1?.length || 0);
  console.log('Level 2 groups:', Object.keys(config.level2 || {}).length);
  console.log('Level 3 groups:', Object.keys(config.level3 || {}).length);
  
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