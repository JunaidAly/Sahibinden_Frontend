// 📁 src/config/categories/services.js
export const servicesConfig = {
  title: 'Masters And Services',
  level1: [
    { id: 'homeServices', label: 'Home Services' },
    { id: 'automotive', label: 'Automotive Services' },
    { id: 'beauty', label: 'Beauty & Wellness' },
    { id: 'repair', label: 'Repair Services' },
    { id: 'cleaning', label: 'Cleaning Services' },
    { id: 'events', label: 'Event Services' },
  ],
  level2: {
    homeServices: [
      { id: 'plumbing', label: 'Plumbing' },
      { id: 'electrical', label: 'Electrical' },
      { id: 'painting', label: 'Painting' },
      { id: 'carpentry', label: 'Carpentry' },
      { id: 'gardening', label: 'Gardening' },
    ],
    automotive: [
      { id: 'mechanic', label: 'Mechanic Services' },
      { id: 'carwash', label: 'Car Wash' },
      { id: 'towing', label: 'Towing' },
      { id: 'insurance', label: 'Insurance' },
    ],
    beauty: [
      { id: 'salon', label: 'Hair Salon' },
      { id: 'spa', label: 'Spa Services' },
      { id: 'makeup', label: 'Makeup Artist' },
      { id: 'massage', label: 'Massage Therapy' },
    ],
    repair: [
      { id: 'electronics', label: 'Electronics Repair' },
      { id: 'appliances', label: 'Appliance Repair' },
      { id: 'furniture', label: 'Furniture Repair' },
    ],
    cleaning: [
      { id: 'house', label: 'House Cleaning' },
      { id: 'office', label: 'Office Cleaning' },
      { id: 'carpet', label: 'Carpet Cleaning' },
    ],
    events: [
      { id: 'wedding', label: 'Wedding Services' },
      { id: 'catering', label: 'Catering' },
      { id: 'photography', label: 'Photography' },
      { id: 'decoration', label: 'Decoration' },
    ]
  },
  level3: {
    plumbing: [
      { id: 'installation', label: 'Installation' },
      { id: 'repair', label: 'Repair' },
      { id: 'maintenance', label: 'Maintenance' },
    ],
    electrical: [
      { id: 'wiring', label: 'Wiring' },
      { id: 'fixtures', label: 'Fixtures' },
      { id: 'appliances', label: 'Appliance Installation' },
    ]
  }
};