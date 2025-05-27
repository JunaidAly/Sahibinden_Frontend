import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const VehicleSearchForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    gear: '',
    fuel: '',
    caseType: '',
    bodyType: 'convertible'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Ford'];
  const models = ['Model 1', 'Model 2', 'Model 3', 'Model 4'];
  const gearTypes = ['Manual', 'Automatic', 'CVT'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const caseTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe'];

  const CustomSelect = ({ value, onChange, options, placeholder, className = "" }) => (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      <FaCaretDown size={24} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primaryBlue pointer-events-none" />
    </div>
  );

  const SearchButton = ({ children, onClick, className = "text-xs" }) => (
    <button
      onClick={onClick}
      className={`w-full  bg-primaryBlue text-white font-medium py-3 px-4 rounded-full ${className}`}
    >
      {children}
    </button>
  );

  const RadioOption = ({ name, value, checked, onChange, label }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="max-w-7xl mx-auto  font-poppins ">
      <h1 className="text-2xl font-bold text-black mb-4">Search for a New Vehicle</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search By Brand */}
        <div className="bg-white p-6 rounded-lg shadow-custom-diagonal">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search By Brand</h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <CustomSelect
              value={formData.model}
              onChange={(value) => handleInputChange('model', value)}
              options={models}
              placeholder="Model"
            />
            
            <CustomSelect
              value={formData.caseType}
              onChange={(value) => handleInputChange('caseType', value)}
              options={caseTypes}
              placeholder="Case Type"
            />
            
            <SearchButton onClick={() => console.log('Search by brand:', formData)}>
              Search Vehicles by Brand
            </SearchButton>
          </div>
        </div>

        {/* Search by your budget */}
        <div className="bg-white p-6 rounded-lg shadow-custom-diagonal">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search by your budget</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Min TL"
                value={formData.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Max TL"
                value={formData.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <CustomSelect
                value={formData.gear}
                onChange={(value) => handleInputChange('gear', value)}
                options={gearTypes}
                placeholder="Gear"
              />
              <CustomSelect
                value={formData.fuel}
                onChange={(value) => handleInputChange('fuel', value)}
                options={fuelTypes}
                placeholder="Fuel"
              />
            </div>
            
            <CustomSelect
              value={formData.caseType}
              onChange={(value) => handleInputChange('caseType', value)}
              options={caseTypes}
              placeholder="Case Type"
            />
            
            <SearchButton onClick={() => console.log('Search by budget:', formData)}>
              Search For A Vehicle According To Your Budget
            </SearchButton>
          </div>
        </div>

        {/* Search by Case Type */}
        <div className="bg-white p-6 rounded-lg shadow-custom-diagonal">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search by Case Type</h2>
          
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-4">
              <RadioOption
                name="bodyType1"
                value="convertible"
                checked={formData.bodyType === 'convertible'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Convertible"
              />
              <RadioOption
                name="bodyType1"
                value="coupe"
                checked={formData.bodyType === 'coupe'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Coupe"
              />
              <RadioOption
                name="bodyType1"
                value="hatchback"
                checked={formData.bodyType === 'hatchback'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Hatchback"
              />
            </div>
            
            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-4">
              <RadioOption
                name="bodyType1"
                value="convertible2"
                checked={formData.bodyType === 'convertible2'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Convertible"
              />
              <RadioOption
                name="bodyType1"
                value="coupe2"
                checked={formData.bodyType === 'coupe2'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Coupe"
              />
              <RadioOption
                name="bodyType1"
                value="hatchback2"
                checked={formData.bodyType === 'hatchback2'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Hatchback"
              />
            </div>
            
            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-4">
              <RadioOption
                name="bodyType1"
                value="convertible3"
                checked={formData.bodyType === 'convertible3'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Convertible"
              />
              <RadioOption
                name="bodyType1"
                value="coupe3"
                checked={formData.bodyType === 'coupe3'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Coupe"
              />
              <RadioOption
                name="bodyType1"
                value="hatchback3"
                checked={formData.bodyType === 'hatchback3'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Hatchback"
              />
            </div>
            
            {/* Row 4 */}
            <div className="grid grid-cols-3 gap-4">
              <RadioOption
                name="bodyType1"
                value="convertible4"
                checked={formData.bodyType === 'convertible4'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Convertible"
              />
              <RadioOption
                name="bodyType1"
                value="coupe4"
                checked={formData.bodyType === 'coupe4'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Coupe"
              />
              <RadioOption
                name="bodyType1"
                value="hatchback4"
                checked={formData.bodyType === 'hatchback4'}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                label="Hatchback"
              />
            </div>
            
            <SearchButton onClick={() => console.log('Search by body type:', formData)}>
              Search Vehicles by Body Type
            </SearchButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSearchForm;