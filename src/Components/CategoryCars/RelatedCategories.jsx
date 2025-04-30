import React, { useState } from 'react';

const RelatedCategories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'offroad', name: 'Off-Road', count: '766986' },
    { id: 'motorcycle', name: 'Motorcycle', count: '766986' },
    { id: 'minivan', name: 'Minivan & Panel Van', count: '766986' },
    { id: 'commercial', name: 'Commercial Vehicles', count: '766986' },
    { id: 'electric', name: 'Electric Vehicles', count: '766986' },
    { id: 'rental', name: 'Rental Cars', count: '766986' },
    { id: 'marine', name: 'Marine Vehicles', count: '766986' },
    { id: 'damaged', name: 'Damaged Vehicles', count: '766986' },
    { id: 'caravan', name: 'Caravan', count: '766986' },
    { id: 'classic', name: 'Classic Vehicles', count: '766986' },
    { id: 'aircraft', name: 'Aircraft', count: '766986' },
    { id: 'atv', name: 'ATV', count: '766986' },
    { id: 'utv', name: 'UTV', count: '766986' },
    { id: 'disabled', name: 'Vehicles with Disabled Plates', count: '766986' }
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="max-w-md p-4 font-monrope">
      <div className="flex items-center gap-2 mb-5">
        
        <img src="/assets/sidebar/vehicle.svg" className='h-6 w-6'/>
      
        <h2 className="text-[18px] font-[400] text-[#231E1C]">Related Categories</h2>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="checkbox"
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
              className="w-4 h-4 border-2 border-[#1544AB] text-blue-600 rounded"
            />
            <label htmlFor={category.id} className="ml-3 font-monrope font-[400] text-[15px] text-[#231E1C] cursor-pointer">
              {category.name}<span className="text-[12px]">({category.count})</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCategories;