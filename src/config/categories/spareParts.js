// 📁 src/config/categories/spareParts.js
export const sparePartsConfig = {
  title: 'Spare Parts, Accessories, Hardware & Tuning',
  level1: [
    { id: 'carParts', label: 'Car Parts' },
    { id: 'motorcycleParts', label: 'Motorcycle Parts' },
    { id: 'truckParts', label: 'Truck Parts' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'tools', label: 'Tools' },
  ],
  level2: {
    carParts: [
      { id: 'engine', label: 'Engine Parts' },
      { id: 'body', label: 'Body Parts' },
      { id: 'electrical', label: 'Electrical' },
      { id: 'interior', label: 'Interior' },
      { id: 'suspension', label: 'Suspension' },
    ],
    motorcycleParts: [
      { id: 'engine', label: 'Engine Parts' },
      { id: 'body', label: 'Body Parts' },
      { id: 'electrical', label: 'Electrical' },
    ],
    truckParts: [
      { id: 'engine', label: 'Engine Parts' },
      { id: 'transmission', label: 'Transmission' },
      { id: 'brakes', label: 'Brakes' },
    ],
    accessories: [
      { id: 'interior', label: 'Interior Accessories' },
      { id: 'exterior', label: 'Exterior Accessories' },
      { id: 'electronics', label: 'Electronics' },
    ],
    tools: [
      { id: 'handTools', label: 'Hand Tools' },
      { id: 'powerTools', label: 'Power Tools' },
      { id: 'diagnostic', label: 'Diagnostic Tools' },
    ]
  },
  level3: {
    engine: [
      { id: 'pistons', label: 'Pistons' },
      { id: 'valves', label: 'Valves' },
      { id: 'filters', label: 'Filters' },
      { id: 'belts', label: 'Belts' },
    ],
    body: [
      { id: 'bumpers', label: 'Bumpers' },
      { id: 'doors', label: 'Doors' },
      { id: 'lights', label: 'Lights' },
      { id: 'mirrors', label: 'Mirrors' },
    ],
    electrical: [
      { id: 'battery', label: 'Battery' },
      { id: 'alternator', label: 'Alternator' },
      { id: 'wiring', label: 'Wiring' },
      { id: 'sensors', label: 'Sensors' },
    ]
  }
};