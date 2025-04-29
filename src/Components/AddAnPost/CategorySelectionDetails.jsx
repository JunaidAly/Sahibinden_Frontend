import React, { useState } from 'react';

const CategorySelectionDetails = () => {
  const [selectedOption, setSelectedOption] = useState('Housing');

  const categoryColumns = [
    {
      id: 1,
      options: [
        { id: 'housing', label: 'Housing', selected: true },
        { id: 'workplace', label: 'Workplace', selected: false },
        { id: 'plot', label: 'Plot', selected: false },
        { id: 'housingProjects', label: 'Housing Projects', selected: false },
        { id: 'building', label: 'Building', selected: false },
        { id: 'timeshare', label: 'Timeshare', selected: false },
        { id: 'touristFacility', label: 'Tourist Facility', selected: false },
      ]
    },
    {
      id: 2,
      options: [
        { id: 'forSale', label: 'For Sale', selected: true },
        { id: 'forRent', label: 'For Rent', selected: false },
        { id: 'touristDailyRental', label: 'Tourist Daily Rental', selected: false },
        { id: 'housingForSale', label: 'Housing For Sale', selected: false },
      ]
    },
    {
      id: 3,
      options: [
        { id: 'apartment', label: 'Apartment', selected: true },
        { id: 'residence', label: 'Residence', selected: false },
        { id: 'familyHouse', label: 'Family House', selected: false },
        { id: 'villa', label: 'Villa', selected: false },
        { id: 'farmhouse', label: 'Farmhouse', selected: false },
        { id: 'mansion', label: 'Mansion & Mansion', selected: false },
        { id: 'watersideApartment', label: 'Waterside Apartment', selected: false },
        { id: 'summery', label: 'Summery', selected: false },
      ]
    }
  ];

  const handleOptionClick = (columnId, optionId) => {
    // Logic to handle option selection
    console.log(`Selected: Column ${columnId}, Option ${optionId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Step by Step Select Catgory</h1>
      <h2 className="text-xl text-gray-500 mb-6">Real Estate</h2>
      
      <div className="flex flex-wrap">
        {/* Category Columns */}
        <div className="flex flex-wrap w-full lg:w-3/4">
          {categoryColumns.map((column) => (
            <div key={column.id} className="w-full sm:w-1/3 p-2">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="space-y-3">
                  {column.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      {option.selected ? (
                        <div className="bg-blue-700 text-white py-2 px-4 rounded-full text-sm font-medium w-full">
                          {option.label}
                        </div>
                      ) : (
                        <div className="text-gray-700 py-2 px-4 text-sm font-medium w-full">
                          {option.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Confirmation Section */}
        <div className="w-full lg:w-1/4 p-2 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-center text-gray-800 font-medium mb-6">Category Selection is Complete</p>
          <button className="bg-blue-700 text-white py-3 px-6 rounded-md font-medium w-full">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionDetails;