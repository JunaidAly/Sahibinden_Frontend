// 📁 src/config/categories/animals.js
export const animalsConfig = {
  title: 'Animal Kingdom',
  level1: [
    { id: 'pets', label: 'Pets' },
    { id: 'livestock', label: 'Livestock' },
    { id: 'birds', label: 'Birds' },
    { id: 'aquatic', label: 'Aquatic Animals' },
    { id: 'supplies', label: 'Pet Supplies' },
    { id: 'services', label: 'Pet Services' },
  ],
  level2: {
    pets: [
      { id: 'dogs', label: 'Dogs' },
      { id: 'cats', label: 'Cats' },
      { id: 'rabbits', label: 'Rabbits' },
      { id: 'hamsters', label: 'Hamsters' },
    ],
    livestock: [
      { id: 'cattle', label: 'Cattle' },
      { id: 'goats', label: 'Goats' },
      { id: 'sheep', label: 'Sheep' },
      { id: 'horses', label: 'Horses' },
    ],
    birds: [
      { id: 'parrots', label: 'Parrots' },
      { id: 'canaries', label: 'Canaries' },
      { id: 'pigeons', label: 'Pigeons' },
      { id: 'chickens', label: 'Chickens' },
    ],
    aquatic: [
      { id: 'fish', label: 'Fish' },
      { id: 'turtles', label: 'Turtles' },
      { id: 'aquarium', label: 'Aquarium Setup' },
    ],
    supplies: [
      { id: 'food', label: 'Pet Food' },
      { id: 'toys', label: 'Pet Toys' },
      { id: 'accessories', label: 'Pet Accessories' },
      { id: 'health', label: 'Health Products' },
    ],
    services: [
      { id: 'veterinary', label: 'Veterinary' },
      { id: 'grooming', label: 'Pet Grooming' },
      { id: 'training', label: 'Pet Training' },
      { id: 'boarding', label: 'Pet Boarding' },
    ]
  },
  level3: {
    dogs: [
      { id: 'puppies', label: 'Puppies' },
      { id: 'adult', label: 'Adult Dogs' },
      { id: 'breeding', label: 'Breeding Dogs' },
    ],
    cats: [
      { id: 'kittens', label: 'Kittens' },
      { id: 'adult', label: 'Adult Cats' },
      { id: 'breeding', label: 'Breeding Cats' },
    ]
  }
};