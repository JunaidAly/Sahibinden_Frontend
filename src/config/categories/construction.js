// 📁 src/config/categories/construction.js
export const constructionConfig = {
  title: 'Construction Machinery & Industry',
  level1: [
    { id: 'heavyMachinery', label: 'Heavy Machinery' },
    { id: 'tools', label: 'Construction Tools' },
    { id: 'materials', label: 'Building Materials' },
    { id: 'equipment', label: 'Equipment Rental' },
    { id: 'services', label: 'Construction Services' },
  ],
  level2: {
    heavyMachinery: [
      { id: 'excavators', label: 'Excavators' },
      { id: 'bulldozers', label: 'Bulldozers' },
      { id: 'cranes', label: 'Cranes' },
      { id: 'loaders', label: 'Loaders' },
    ],
    tools: [
      { id: 'powerTools', label: 'Power Tools' },
      { id: 'handTools', label: 'Hand Tools' },
      { id: 'safety', label: 'Safety Equipment' },
    ],
    materials: [
      { id: 'cement', label: 'Cement & Concrete' },
      { id: 'steel', label: 'Steel & Metal' },
      { id: 'wood', label: 'Wood & Timber' },
      { id: 'electrical', label: 'Electrical Materials' },
    ],
    equipment: [
      { id: 'daily', label: 'Daily Rental' },
      { id: 'weekly', label: 'Weekly Rental' },
      { id: 'monthly', label: 'Monthly Rental' },
    ],
    services: [
      { id: 'demolition', label: 'Demolition' },
      { id: 'excavation', label: 'Excavation' },
      { id: 'construction', label: 'Construction' },
    ]
  },
  level3: {
    excavators: [
      { id: 'mini', label: 'Mini Excavators' },
      { id: 'standard', label: 'Standard Excavators' },
      { id: 'large', label: 'Large Excavators' },
    ],
    powerTools: [
      { id: 'drills', label: 'Drills' },
      { id: 'saws', label: 'Saws' },
      { id: 'grinders', label: 'Grinders' },
    ]
  }
};