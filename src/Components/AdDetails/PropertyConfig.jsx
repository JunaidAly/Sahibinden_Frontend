// Category-specific detail configurations
export const CATEGORY_CONFIGS = {
  // REAL ESTATE CATEGORIES
  'Real Estate': {
    name: 'Residential Properties',
    detailFields: [
      { label: "Ad No.", field: "addID", fallback: "id" },
      { label: "Category", field: "category", fallback: "category" },
      { label: "Announcement Date", field: "createdAt", type: "date" },
      { label: "Property Type", field: "propertyType" },
      { label: "m² (Gross)", field: "m2Gross" },
      { label: "m² (Net)", field: "m2Net" },
      { label: "Number of Rooms", field: "numberOfRooms" },
      { label: "Number of Bathrooms", field: "numberOfBathrooms" },
      { label: "Heating", field: "heating" },
      { label: "Parking", field: "parking" },
      { label: "Kitchen", field: "kitchen" },
      { label: "Furnished", field: "furnished" },
      { label: "Usage Status", field: "usageStatus" },
      { label: "Within The Site", field: "withinTheSite" },
      { label: "Site Name", field: "siteName" }
    ],
    additionalDetails: [
      { category: "PROPERTY TYPE:", field: "propertyType", highlight: false },
      { category: "CATEGORY:", field: "category", highlight: true },
      { category: "SITE NAME:", field: "siteName", highlight: false },
      { category: "HEATING SYSTEM:", field: "heating", highlight: true },
      { category: "KITCHEN:", field: "kitchen", highlight: false },
      { category: "PARKING:", field: "parking", highlight: true },
      { category: "FURNISHED:", field: "furnished", highlight: false },
      { category: "USAGE STATUS:", field: "usageStatus", highlight: true },
      { category: "WITHIN SITE:", field: "withinTheSite", highlight: false }
    ]
  },

  // VEHICLES CATEGORY
  'Vehicles': {
    name: 'Vehicles',
    detailFields: [
      { label: "Ad No.", field: "addID", fallback: "id" },
      { label: "Category", field: "category" },
      { label: "Subcategory", field: "subcategory" },
      { label: "Type", field: "thirdLevel" },
      { label: "Subtype", field: "fourthLevel" },
      { label: "Brand", field: "brand" },
      { label: "Model", field: "model" },
      { label: "Year", field: "year" },
      { label: "Price", field: "price" },
      { label: "Location", field: "location" },
      { label: "Fuel Type", field: "fuelType" },
      { label: "Gear", field: "gear" },
      { label: "Vehicle Status", field: "vehicleStatus" },
      { label: "Mileage (KM)", field: "km" },
      { label: "Case Type", field: "caseType" },
      { label: "Engine Power", field: "enginePower" },
      { label: "Engine Displacement", field: "engineDisplacement" },
      { label: "Traction", field: "traction" },
      { label: "Doors", field: "door" },
      { label: "Color", field: "color" },
      { label: "Guarantee", field: "guarantee" },
      { label: "Serious Damage", field: "seriousDamage" },
      { label: "Plate Nationality", field: "plateNationality" },
      { label: "From Whom", field: "fromWhom" },
      { label: "Swap", field: "swap" }
    ],
    additionalDetails: [
      { category: "BRAND:", field: "brand", highlight: false },
      { category: "MODEL:", field: "model", highlight: true },
      { category: "YEAR:", field: "year", highlight: false },
      { category: "FUEL TYPE:", field: "fuelType", highlight: true },
      { category: "GEAR:", field: "gear", highlight: false },
      { category: "MILEAGE:", field: "km", highlight: true },
      { category: "ENGINE POWER:", field: "enginePower", highlight: false },
      { category: "VEHICLE STATUS:", field: "vehicleStatus", highlight: true },
      { category: "COLOR:", field: "color", highlight: false },
      { category: "GUARANTEE:", field: "guarantee", highlight: true }
    ]
  },

  // SPARE PARTS CATEGORY
  'Spare Parts': {
    name: 'Spare Parts',
    detailFields: [
      { label: "Ad No.", field: "addID", fallback: "id" },
      { label: "Category", field: "category" },
      { label: "Subcategory", field: "subcategory" },
      { label: "Type", field: "thirdLevel" },
      { label: "Subtype", field: "fourthLevel" },
      { label: "Spare Category", field: "spareCategory" },
      { label: "Type", field: "type" },
      { label: "Product", field: "product" },
      { label: "Vehicle Brand", field: "vehicleBrand" },
      { label: "Vehicle Series", field: "vehicleSeries" },
      { label: "Product Brand", field: "productBrand" },
      { label: "From Whom", field: "fromWhom" },
      { label: "Used Spare Parts", field: "usedSpareParts" },
      { label: "Swap", field: "swap" },
      { label: "Status", field: "status" },
      { label: "Price", field: "price" },
      { label: "Location", field: "location" }
    ],
    additionalDetails: [
      { category: "SPARE CATEGORY:", field: "spareCategory", highlight: false },
      { category: "PRODUCT:", field: "product", highlight: true },
      { category: "VEHICLE BRAND:", field: "vehicleBrand", highlight: false },
      { category: "VEHICLE SERIES:", field: "vehicleSeries", highlight: true },
      { category: "PRODUCT BRAND:", field: "productBrand", highlight: false },
      { category: "STATUS:", field: "status", highlight: true },
      { category: "USED PARTS:", field: "usedSpareParts", highlight: false },
      { category: "FROM WHOM:", field: "fromWhom", highlight: true }
    ]
  },

  // ANIMAL KINGDOM CATEGORY
  'Animal Kingdom': {
    name: 'Animal Kingdom',
    detailFields: [
      { label: "Ad No.", field: "addID", fallback: "id" },
      { label: "Category", field: "category" },
      { label: "Subcategory", field: "subcategory" },
      { label: "Type", field: "thirdLevel" },
      { label: "Subtype", field: "fourthLevel" },
      { label: "Animal Type", field: "type" },
      { label: "Race/Breed", field: "race" },
      { label: "Age", field: "age" },
      { label: "Gender", field: "gender" },
      { label: "Price", field: "price" },
      { label: "Location", field: "location" },
      { label: "From Whom", field: "fromWhom" }
    ],
    additionalDetails: [
      { category: "ANIMAL TYPE:", field: "type", highlight: false },
      { category: "RACE/BREED:", field: "race", highlight: true },
      { category: "AGE:", field: "age", highlight: false },
      { category: "GENDER:", field: "gender", highlight: true },
      { category: "LOCATION:", field: "location", highlight: false },
      { category: "FROM WHOM:", field: "fromWhom", highlight: true }
    ]
  }
};

// Default configuration for unknown categories
export const DEFAULT_CONFIG = {
  name: 'Item',
  detailFields: [
    { label: "Ad No.", field: "addID", fallback: "id" },
    { label: "Category", field: "category", fallback: "category" },
    { label: "Announcement Date", field: "createdAt", type: "date" },
    { label: "Price", field: "price" },
    { label: "Location", field: "location" }
  ],
  additionalDetails: [
    { category: "CATEGORY:", field: "category", highlight: false },
    { category: "LOCATION:", field: "location", highlight: true }
  ]
};

// Helper function to get field value with fallback
export const getFieldValue = (property, field, fallback = null, type = null) => {
  let value = property[field] || (fallback && property[fallback]) || null;
  
  if (type === 'date' && value) {
    try {
      const date = value.toDate ? value.toDate() : new Date(value);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    } catch {
      return "N/A";
    }
  }
  
  return value;
};

// Get appropriate title based on category
export const getItemTitle = (property, category, categoryConfig) => {
  if (!property) return categoryConfig.name;
  
  switch(category) {
    case 'vehicles':
      return `${property.brand || ''} ${property.model || ''} ${property.year || ''}`.trim() || 'Vehicle';
    case 'spare-parts':
      return `${property.product || property.type || ''} for ${property.vehicleBrand || 'Vehicle'}`.trim() || 'Spare Part';
    case 'animal-kingdom':
      return `${property.race || property.type || ''} ${property.gender || ''}`.trim() || 'Animal';
    default:
      return property.propertyType || property.investmentType || property.landType || categoryConfig.name;
  }
};

// Get appropriate price display
export const getPriceDisplay = (property) => {
  if (!property.price) return 'Price on Request';
  
  // Handle different price formats
  const price = parseInt(property.price);
  if (isNaN(price)) return property.price;
  
  return `${price.toLocaleString()} TL`;
};