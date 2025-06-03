// 📁 src/config/categories/vehicle.js
export const vehicleConfig = {
  title: 'Vehicle',
  level1: [
    { id: 'car', label: 'Car' },
    { id: 'motorcycle', label: 'Motorcycle' },
    { id: 'truck', label: 'Truck' },
    { id: 'bus', label: 'Bus' },
    { id: 'bicycle', label: 'Bicycle' },
    { id: 'boat', label: 'Boat' },
  ],
  level2: {
    car: [
      { id: 'forSale', label: 'For Sale' },
      { id: 'forRent', label: 'For Rent' },
      { id: 'lease', label: 'Lease' },
    ],
    motorcycle: [
      { id: 'forSale', label: 'For Sale' },
      { id: 'forRent', label: 'For Rent' },
    ],
    truck: [
      { id: 'forSale', label: 'For Sale' },
      { id: 'forRent', label: 'For Rent' },
      { id: 'lease', label: 'Lease' },
    ],
    bus: [
      { id: 'forSale', label: 'For Sale' },
      { id: 'forRent', label: 'For Rent' },
    ],
    bicycle: [
      { id: 'forSale', label: 'For Sale' },
      { id: 'forRent', label: 'For Rent' },
    ],
    boat: [
      { id: 'forSale', label: 'For Sale' },
      { id: 'forRent', label: 'For Rent' },
    ]
  },
  level3: {
    forSale: [
      { id: 'sedan', label: 'Sedan' },
      { id: 'suv', label: 'SUV' },
      { id: 'hatchback', label: 'Hatchback' },
      { id: 'coupe', label: 'Coupe' },
      { id: 'convertible', label: 'Convertible' },
      { id: 'pickup', label: 'Pickup' },
    ],
    forRent: [
      { id: 'economy', label: 'Economy' },
      { id: 'luxury', label: 'Luxury' },
      { id: 'suv', label: 'SUV' },
      { id: 'van', label: 'Van' },
    ],
    lease: [
      { id: 'new', label: 'New Vehicle' },
      { id: 'certified', label: 'Certified Pre-owned' },
    ]
  }
};