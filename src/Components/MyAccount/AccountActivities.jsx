import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown } from "react-icons/fa";
// Custom Calendar component
const Calendar = ({ onChange, value }) => {
  const currentDate = value || new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };
  
  const isSelected = (day) => {
    if (!value) return false;
    
    const valueDate = typeof value === 'string' ? parseDate(value) : value;
    return valueDate && 
           day === valueDate.getDate() && 
           currentMonth === valueDate.getMonth() && 
           currentYear === valueDate.getFullYear();
  };
  
  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    
    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSelected(day);
      
      days.push(
        <div 
          key={day} 
          onClick={() => onChange(new Date(currentYear, currentMonth, day))}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
            ${isCurrentDay ? 'bg-blue-100 text-blue-600' : ''}
            ${isSelectedDay ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="font-medium">
          {months[currentMonth]} {currentYear}
        </div>
        
        <button 
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="w-10 h-10 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

// Helper function to parse date string (DD/MM/YYYY) to Date object
const parseDate = (dateString) => {
  if (!dateString) return new Date();
  
  const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
  return new Date(year, month - 1, day);
};

// Helper function to format Date to string (DD/MM/YYYY)
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function AccountActivities() {
  const [filters, setFilters] = useState({
    paymentMethod: '',
    status: '',
    productType: '',
    startDate: '',
    endDate: ''
  });
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  
  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);
  const startIconRef = useRef(null);
  const endIconRef = useRef(null);

  // Sample table data - would come from API in real implementation
  const tableData = [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilter = () => {
    // This would trigger your filtering logic
    console.log('Filtering with:', filters);
  };
  
  const handleDateSelection = (date, field) => {
    setFilters(prev => ({
      ...prev,
      [field]: formatDate(date)
    }));
    
    if (field === 'startDate') {
      setShowStartCalendar(false);
    } else {
      setShowEndCalendar(false);
    }
  };
  
  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startCalendarRef.current && !startCalendarRef.current.contains(event.target) && 
          (!startIconRef.current || !startIconRef.current.contains(event.target))) {
        setShowStartCalendar(false);
      }
      
      if (endCalendarRef.current && !endCalendarRef.current.contains(event.target) && 
          (!endIconRef.current || !endIconRef.current.contains(event.target))) {
        setShowEndCalendar(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 font-poppins">
      <h1 className="text-xl font-semibold text-black mb-4">My Account Activities</h1>
      
      <div className="bg-white rounded-lg shadow-custom-diagonal p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-black">Payment Method</label>
            <div className="relative">
              <select 
                name="paymentMethod"
                value={filters.paymentMethod}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Payment Method</option>
                <option value="credit">Credit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
              <FaCaretDown size={24} className=' text-[#1544AB]' />
              </div>
             
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-black">Status</label>
            <div className="relative">
              <select 
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
              <FaCaretDown size={24} className=' text-[#1544AB]' />
              </div>
             
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-black">Product Type</label>
            <div className="relative">
              <select 
                name="productType"
                value={filters.productType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Product Type</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
                <option value="featured">Featured</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
              <FaCaretDown size={24} className=' text-[#1544AB]' />
              </div>
             
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-black">Start Date</label>
            <div className="relative">
              <input 
                type="text"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                placeholder="DD/MM/YYYY"
                className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div 
                ref={startIconRef}
                onClick={() => setShowStartCalendar(!showStartCalendar)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-[#1544AB] cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
              </div>
              
              {showStartCalendar && (
                <div 
                  ref={startCalendarRef}
                  className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                  style={{ width: '300px', right: 0 }}
                >
                  <Calendar 
                    onChange={(date) => handleDateSelection(date, 'startDate')}
                    value={filters.startDate ? parseDate(filters.startDate) : new Date()}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-black">End Date</label>
            <div className="relative">
              <input 
                type="text"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                placeholder="DD/MM/YYYY"
                className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div 
                ref={endIconRef}
                onClick={() => setShowEndCalendar(!showEndCalendar)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-[#1544AB] cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
              </div>
              
              {showEndCalendar && (
                <div 
                  ref={endCalendarRef}
                  className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                  style={{ width: '300px', right: 0 }}
                >
                  <Calendar 
                    onChange={(date) => handleDateSelection(date, 'endDate')}
                    value={filters.endDate ? parseDate(filters.endDate) : new Date()}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex justify-end md:col-span-2">
            <button
              onClick={handleFilter}
              className="px-6 py-2 bg-[#1544AB] text-white font-medium rounded-full"
            >
              FILTER
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Payment Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Process
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                History
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.paymentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.process}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.history}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.invoice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No activities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountActivities;