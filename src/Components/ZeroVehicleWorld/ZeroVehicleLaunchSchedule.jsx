
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { FaCaretDown } from "react-icons/fa";
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';

const ZeroVehicleLaunchSchedule = () => {
 // State for the currently selected month/period and visible month range
 const [currentPeriod, setCurrentPeriod] = useState(0);
 const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
 const filtersRef = useRef(null);
 
 // All available months
 const allMonths = [
   'January', 'February', 'March', 'April', 'May', 'June', 
   'July', 'August', 'September', 'October', 'November', 'December'
 ];
 
 // Visible months (3 at a time)
 const visibleMonths = allMonths.slice(currentPeriod, currentPeriod + 3);
 
 // Vehicle data organized by month
 const vehicleData = {
   'January': [
     { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
     { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
     { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
     { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
     { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
     { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
     { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
     { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
     { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
     { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
     { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
     { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
   
   ],
   'February': [
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
   ],
   'March': [
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    { brand: 'BMW', model: 'X5', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'Q7', image: '/assets/vehimg.png' },
    
   ],
   'April': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
  
   ],
   'May': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
    
   ],
   'June': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
   
   ],
   'July': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
   
   ],
   'August': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
   
   ],
   'September': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
    
   ],
   'October': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
   
   ],
   'November': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
   
   ],
   'December': [
    { brand: 'BMW', model: 'i4', image: '/assets/vehimg.png' },
    { brand: 'Audi', model: 'A6', image: '/assets/vehimg.png' },
  
   ],
 };

 // Filter state
 const [filters, setFilters] = useState({
   brand: '',
   model: '',
   caseType: '',
   year: ''
 });

 // Selected month
 const [selectedMonth, setSelectedMonth] = useState(visibleMonths[0]);
 
 // Close filters dropdown when clicking outside
 useEffect(() => {
   function handleClickOutside(event) {
     if (filtersRef.current && !filtersRef.current.contains(event.target)) {
       setShowFiltersDropdown(false);
     }
   }
   
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, [filtersRef]);

 // Navigate to previous period
 const goToPreviousPeriod = () => {
   if (currentPeriod > 0) {
     setCurrentPeriod(currentPeriod - 1);
     setSelectedMonth(allMonths[currentPeriod - 1]);
   }
 };

 // Navigate to next period
 const goToNextPeriod = () => {
   if (currentPeriod < allMonths.length - 3) {
     setCurrentPeriod(currentPeriod + 1);
     setSelectedMonth(allMonths[currentPeriod + 1]);
   }
 };

 // Toggle filters dropdown
 const toggleFiltersDropdown = () => {
   setShowFiltersDropdown(!showFiltersDropdown);
 };

 // Handle month selection
 const handleMonthSelection = (month) => {
   setSelectedMonth(month);
 };

 // Handle filter change
 const handleFilterChange = (field, value) => {
   setFilters({...filters, [field]: value});
 };

 // Clear all filters
 const clearFilters = () => {
   setFilters({
     brand: '',
     model: '',
     caseType: '',
     year: ''
   });
 };

 // Get vehicles for selected month
 const currentVehicles = vehicleData[selectedMonth] || [];
 
 // Group vehicles by brand for display
 const groupedVehicles = {};
 currentVehicles.forEach(vehicle => {
   if (!groupedVehicles[vehicle.brand]) {
     groupedVehicles[vehicle.brand] = [];
   }
   groupedVehicles[vehicle.brand].push(vehicle);
 });

  return (
    <>
      <Navbar />
      <NavbarMenu />
      <div className="max-w-7xl mx-auto font-poppins p-4 mt-10 bg-white rounded-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Zero Vehicle Launch Schedule</h1>
          <button
            className="text-[#1544AB]  text-sm"
            onClick={() => console.log("Show full calendar")}
          >
            Show Full Calendar
          </button>
        </div>

        {/* Period Section */}
        <div className="flex justify-between items-center mb-6 border-b p-8 rounded-lg shadow-custom-diagonal">
          <div>
            <div className="text-sm text-gray-500">Period</div>
            <div className="font-medium">{visibleMonths.join(" - ")}</div>
          </div>
          <div className="relative" ref={filtersRef}>
            <button
              className="text-[#1544AB] hover:text-blue-800 text-sm"
              onClick={toggleFiltersDropdown}
            >
              Change Filters
            </button>

            {/* Filters Dropdown */}
            {showFiltersDropdown && (
              <div className="absolute right-0 mt-2 w-[23rem] bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <button
                      className="text-[#1544AB] text-sm"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>
                  </div>

                  {/* Filter Options */}
                  <div className="space-y-4">
                    {/* Brand Dropdown */}
                    <div className="relative">
                      <div className="border border-[#1544AB] rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <span className="text-gray-900">Brand</span>
                        <FaCaretDown className="h-5 w-5 text-[#1544AB]" />
                      </div>
                    </div>

                    {/* Model Dropdown */}
                    <div className="relative">
                      <div className="border border-[#1544AB] rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <span className="text-gray-900">Model</span>
                        <FaCaretDown className="h-5 w-5 text-[#1544AB]" />
                      </div>
                    </div>

                    {/* Case Type Dropdown */}
                    <div className="relative">
                      <div className="border border-[#1544AB] rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <span className="text-gray-900">Case Type</span>
                        <FaCaretDown className="h-5 w-5 text-[#1544AB]" />
                      </div>
                    </div>

                    {/* Year Dropdown */}
                    <div className="relative">
                      <div className="border border-[#1544AB] rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <span className="text-gray-900">Year</span>
                        <FaCaretDown className="h-5 w-5 text-[#1544AB]" />
                      </div>
                    </div>

                    {/* Gear */}
                    <div className="relative">
                      <div className="border border-[#1544AB] rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <span className="text-gray-900">Gear</span>
                        <FaCaretDown className="h-5 w-5 text-[#1544AB]" />
                      </div>
                    </div>

                    {/* Fuel */}
                    <div className="relative">
                      <div className="border border-[#1544AB] rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <span className="text-gray-900">Fuel</span>
                        <FaCaretDown className="h-5 w-5 text-[#1544AB]" />
                      </div>
                    </div>

                    {/* Input */}
                    <div className="relative flex justify-between">
                      <input
                        className="border border-[#1544AB] rounded-lg p-4 w-[10rem] flex justify-between items-center placeholder:text-black"
                        placeholder="Min TL"
                        type="text"
                      ></input>
                      <input
                        className="border border-[#1544AB] rounded-lg p-4  w-[10rem]  flex justify-between items-center  placeholder:text-black"
                        placeholder="Max TL"
                        type="text"
                      ></input>
                    </div>

                    {/* Button */}
                    <button
                      className="text-white rounded-full bg-[#1544AB] text-sm py-3 px-4 mt-4 w-full"
                    >
                      Change Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calendar description */}
        <div className="mb-4 text-black">
          The 2024 new vehicle Launch calendar is listed for "all brands"
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousPeriod}
            className="bg-[#1544AB] text-white p-2 rounded-full"
            disabled={currentPeriod === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex space-x-2">
            {visibleMonths.map((month) => (
              <button
                key={month}
                onClick={() => handleMonthSelection(month)}
                className={`px-16 py-2 rounded-md ${
                  selectedMonth === month
                    ? "bg-[#1544AB] text-white"
                    : "bg-white text-[#1544AB] border border-[#1544AB]"
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPeriod}
            className="bg-[#1544AB] text-white p-2 rounded-full"
            disabled={currentPeriod >= allMonths.length - 3}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Vehicle Grid */}
        <div className="space-y-4 shadow-custom-right p-5 rounded-lg">
          {Object.entries(groupedVehicles).map(([brand, vehicles]) => (
            <React.Fragment key={brand}>
              <div className="flex flex-row gap-24 ">
                {/* Brand Logo */}
                <div className=" w-[120px] h-full flex flex-col gap-3 items-center">
                  {brand === "BMW" ? (
                    <>
                      <img
                        src="/assets/bmw.png"
                        alt="BMW Logo"
                        className="h-full w-full object-cover"
                      />
                      <img
                        src="/assets/audi.png"
                        alt="BMW Logo"
                        className="h-full w-full object-cover"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src="/assets/bmw.png"
                        alt="BMW Logo"
                        className="h-full w-full object-cover"
                      />
                      <img
                        src="/assets/audi.png"
                        alt="BMW Logo"
                        className="h-full w-full object-cover"
                      />
                    </>
                  )}
                </div>

                {/* Vehicle Row */}
                <div className="grid grid-cols-1 max-w-4xl   md:grid-cols-3  gap-8 ">
                  {vehicles.map((vehicle, idx) => (
                    <>
                      <div
                        key={`${brand}-${vehicle.model}-${idx}`}
                        className=" shadow-custom-diagonal rounded-lg p-2"
                      >
                        <img
                          src={vehicle.image}
                          alt={`${brand} ${vehicle.model}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* No vehicles message */}
          {Object.keys(groupedVehicles).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No vehicles scheduled for launch in {selectedMonth}
            </div>
          )}
        </div>
      </div>
      <CommentForm />
      <Footer />
    </>
  );
};

export default ZeroVehicleLaunchSchedule;