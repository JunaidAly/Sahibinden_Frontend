import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Navbar from '../Navbar';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
import Footer from '../Footer';



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
      { name: 'Hardware', field: 'hardware' }
    ];
  
    const carIcon = (
      <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
    );
  
    return (
      <>
        <div className=" p-6 bg-white font-poppins">
          <h1 className="text-[30px] text-black font-[500] mb-8">
            Vehicle Comparison
          </h1>

          <div className="flex justify-center gap-6 ">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="bg-white p-6  shadow-custom rounded-lg max-w-[400px] w-full"
              >
                <h2 className="text-[30px] text-black font-[500]  mb-6 text-center">
                  Add Vehicle
                </h2>

                <div className="flex justify-center mb-8">{carIcon}</div>

                <div className="space-y-4 ">
                  {dropdownFields.map((field) => (
                    <div key={field.field} className="relative">
                      <select
                        className="w-full p-3 border border-[#1544AB] font-[400] text-black text-[15px] rounded appearance-none bg-white cursor-pointer "
                        value={vehicle[field.field]}
                        onChange={(e) =>
                          handleDropdownChange(
                            index,
                            field.field,
                            e.target.value
                          )
                        }
                      >
                        <option value="" disabled>
                          {field.name}
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <FaCaretDown className="w-8 h-8 text-[#1544AB]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center'>
          <button className="w-full max-w-[350px]  bg-[#1544AB] text-white py-3 px-4 rounded mt-6 font-[500] text-[20px]">
             Compare
          </button>
          </div>
        </div>
      </>
    );
  };


const PopularBrands =() => {
    return (
        <div className="flex flex-col max-w-7xl mx-auto  ">
            <h2 className="text-[30px] text-black font-[500] mb-8">Popular Brands</h2>
            <div className="grid grid-cols-5 gap-10">
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
                <img src="/assets/vehiclecomparison.png" className='w-[200px] h-[112px] '  />
               </div>
        </div>
    )   
}

const ZeroVehicleWorld = () => {
  // State for the form inputs
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [caseType, setCaseType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [gear, setGear] = useState('');
  const [fuel, setFuel] = useState('');
  const [searchByCase, setSearchByCase] = useState([
    { id: 'convertible1', type: 'Convertible', checked: true },
    { id: 'coupe1', type: 'Coupe', checked: false },
    { id: 'hatchback1', type: 'Hatchback', checked: false },
    { id: 'convertible2', type: 'Convertible', checked: false },
    { id: 'coupe2', type: 'Coupe', checked: false },
    { id: 'hatchback2', type: 'Hatchback', checked: false },
    { id: 'convertible3', type: 'Convertible', checked: false },
    { id: 'coupe3', type: 'Coupe', checked: false },
    { id: 'hatchback3', type: 'Hatchback', checked: false },
    { id: 'convertible4', type: 'Convertible', checked: false },
    { id: 'coupe4', type: 'Coupe', checked: false },
    { id: 'hatchback4', type: 'Hatchback', checked: false },
  ]);

  // Toggle checkbox state
  const handleCheckboxChange = (id) => {
    setSearchByCase(
      searchByCase.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <>
    <Navbar />
    <NavbarMenu />
    <div className="w-full max-w-7xl mx-auto font-poppins mt-10 ">
      <h1 className="text-[30px] text-black font-[500] mb-6">Zero Vehicle World</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search By Brand Panel */}
        <div className="bg-white rounded-lg shadow-custom-diagonal p-5 ">
          <h2 className="font-semibold text-center mb-4">Search By Brand</h2>
          
          <div className="space-y-4">
            {/* Brand input */}
            <div>
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
              />
            </div>
            
            {/* Model dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                >
                  <option value="">Model</option>
                  <option value="model1">Model 1</option>
                  <option value="model2">Model 2</option>
                  <option value="model3">Model 3</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaCaretDown size={24} className="text-[#1544AB]" />
                </div>
              </div>
            </div>
            
            {/* Case Type dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="w-full p-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                >
                  <option value="">Case Type</option>
                  <option value="convertible">Convertible</option>
                  <option value="coupe">Coupe</option>
                  <option value="hatchback">Hatchback</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaCaretDown size={24} className="text-[#1544AB]" />
                </div>
              </div>
            </div>
            
            {/* Search button */}
            <button
              className="w-full bg-[#1544AB] rounded-full  text-white py-2  "
            >
              Search Vehicles By Brand
            </button>
          </div>
        </div>
        
        {/* Search by your budget Panel */}
        <div className="bg-white rounded-lg shadow-custom-diagonal  p-5 ">
          <h2 className="font-semibold text-center mb-4">Search by your budget</h2>
          
          <div className="space-y-4">
            {/* Price range inputs */}
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Min TL"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Max TL"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                />
              </div>
            </div>
            
            {/* Gear dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  value={gear}
                  onChange={(e) => setGear(e.target.value)}
                  className="w-full p-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                >
                  <option value="">Gear</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaCaretDown size={24} className="text-[#1544AB]" />
                </div>
              </div>
            </div>
            
            {/* Fuel dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full p-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                >
                  <option value="">Fuel</option>
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaCaretDown size={24} className="text-[#1544AB]" />
                </div>
              </div>
            </div>
            
            {/* Case Type dropdown */}
            <div className="relative">
              <div className="relative">
                <select
                  className="w-full p-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#1544AB]"
                >
                  <option value="">Case Type</option>
                  <option value="convertible">Convertible</option>
                  <option value="coupe">Coupe</option>
                  <option value="hatchback">Hatchback</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaCaretDown size={24} className="text-[#1544AB]" />
                </div>
              </div>
            </div>
            
            {/* Search button */}
            <button
              className="w-max bg-[#1544AB] rounded-full text-[15px]  text-white p-2  "
            >
              Search For A Vehicle According To Your Budget
            </button>
          </div>
        </div>
        
        {/* Search by Case Type Panel */}
        <div className="bg-white rounded-lg shadow-custom-diagonal p-5 ">
          <h2 className="font-semibold text-center mb-4">Search by Case Type</h2>
          
          <div className="space-y-4">
            {/* Case Type checkboxes - grouped in rows */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {/* Display 4 rows of checkboxes, 3 checkboxes per row */}
              {[0, 1, 2, 3].map(rowIndex => (
                <React.Fragment key={rowIndex}>
                  {['Convertible', 'Coupe', 'Hatchback'].map((type, colIndex) => {
                    const id = `${type.toLowerCase()}${rowIndex + 1}`;
                    const item = searchByCase.find(item => item.id === id);
                    
                    return (
                      <div key={id} className="flex items-center">
                        <input
                          type="radio"
                          id={id}
                          checked={item?.checked || false}
                          onChange={() => handleCheckboxChange(id)}
                          className="w-4 h-4 border-[#1544AB] text-[#1544AB]   focus:ring-[#1544AB]"
                        />
                        <label htmlFor={id} className="ml-2 text-sm text-black">
                          {type}
                        </label>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            
            {/* Search button */}
            <button
              className="w-full bg-[#1544AB] rounded-full  text-white py-2 mt-8"
            >
              Search Vehicles By Body Type
            </button>
          </div>
        </div>
      </div>
    </div>
    <VehicleComparisonComponent />
    <PopularBrands />
    <CommentForm />
    <Footer />
    </>
  );
};

export default ZeroVehicleWorld;