import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
import { FaCaretDown } from "react-icons/fa";
const VehicleComparisonComponent = () => {
  const [vehicles, setVehicles] = useState([
    {
      brand: '',
      model: '',
      year: '',
      color: '',
      engine: '',
      gear: '',
      package: '',
      heritage: ''
    },
    {
      brand: '',
      model: '',
      year: '',
      color: '',
      engine: '',
      gear: '',
      package: '',
      heritage: ''
    },
    {
      brand: '',
      model: '',
      year: '',
      color: '',
      engine: '',
      gear: '',
      package: '',
      heritage: ''
    }
  ]);

  const handleDropdownChange = (index, field, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index][field] = value;
    setVehicles(newVehicles);
  };

  const dropdownFields = [
    { name: 'Brand', field: 'brand' },
    { name: 'Model', field: 'model' },
    { name: 'Year', field: 'year' },
    { name: 'Color Type', field: 'color' },
    { name: 'Engine', field: 'engine' },
    { name: 'Gear', field: 'gear' },
    { name: 'Package', field: 'package' },
    { name: 'Heritage', field: 'heritage' }
  ];

  const carIcon = (
    <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
  );

  return (
      <>
      <Navbar/>
      <NavbarMenu />
    <div className="p-6 bg-white font-poppins">
      <h1 className="text-[30px] text-black font-[500] mb-8">Vehicle Comparison</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="bg-white p-6 shadow-custom rounded-lg max-w-[400px] w-full">
            <h2 className="text-[30px] text-black font-[500]  mb-6 text-center">
              {index + 1}. Add Vehicle
            </h2>
            
            <div className="flex justify-center mb-8">
              {carIcon}
            </div>
            
            <div className="space-y-4 ">
              {dropdownFields.map((field) => (
                <div key={field.field} className="relative">
                  <select
                    className="w-full p-3 border border-[#1544AB] font-[400] text-black text-[15px] rounded appearance-none bg-white cursor-pointer "
                    value={vehicle[field.field]}
                    onChange={(e) => handleDropdownChange(index, field.field, e.target.value)}
                  >
                    <option value="" disabled>{field.name}</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <FaCaretDown className='w-8 h-8 text-[#1544AB]' />
                  </div>
                </div>
              ))}
              
              <button 
                className="w-full bg-[#1544AB] text-white py-3 px-4 rounded mt-6 font-[500] text-[20px]"
                onClick={() => console.log(`Vehicle ${index + 1} data:`, vehicle)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <CommentForm/>
    <Footer/>
    </>
  );
};

export default VehicleComparisonComponent;