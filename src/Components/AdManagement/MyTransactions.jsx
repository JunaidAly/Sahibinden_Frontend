import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown, FaCaretUp, FaCalendarAlt } from "react-icons/fa";

// Simple Calendar Component
const SimpleCalendar = ({ onSelectDate, onClose, initialDate }) => {
  const [currentMonth, setCurrentMonth] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );
  
  // Parse initial date if provided
  useEffect(() => {
    if (initialDate) {
      try {
        const parts = initialDate.split(' ');
        if (parts.length === 3) {
          const day = parseInt(parts[0]);
          const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
          const year = parseInt(parts[2]);
          if (!isNaN(day) && month !== -1 && !isNaN(year)) {
            setCurrentMonth(new Date(year, month, 1));
          }
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
  }, [initialDate]);
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handleDateClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelectDate(formatDate(selectedDate));
    onClose();
  };
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Create calendar days
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div 
        key={day} 
        onClick={() => handleDateClick(day)}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 cursor-pointer"
      >
        {day}
      </div>
    );
  }
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <div className="bg-white border border-[#1544AB] rounded-md shadow-lg p-3 w-64">
      <div className="flex justify-between items-center mb-3">
        <button onClick={prevMonth} className="text-[#1544AB]">←</button>
        <div className="font-medium">
          {monthNames[month]} {year}
        </div>
        <button onClick={nextMonth} className="text-[#1544AB]">→</button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

// Advanced Search Component
const AdvancedSearch = ({ onClose }) => {
  const [startDate, setStartDate] = useState('14 Apr 2025');
  const [endDate, setEndDate] = useState('14 Oct 2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    completed: true,
    reportBeingPrepared: false,
    expertiseAwaited: false,
    cancellationRefund: false
  });

  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);
  
  // Close calendars when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (showStartCalendar && startCalendarRef.current && !startCalendarRef.current.contains(event.target)) {
        setShowStartCalendar(false);
      }
      if (showEndCalendar && endCalendarRef.current && !endCalendarRef.current.contains(event.target)) {
        setShowEndCalendar(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStartCalendar, showEndCalendar]);

  const handleStatusChange = (status) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log({
      startDate,
      endDate,
      searchTerm,
      statusFilters
    });
    onClose(); // Close the advanced search after submitting
  };

  const toggleStartCalendar = (e) => {
    e.stopPropagation();
    setShowStartCalendar(!showStartCalendar);
    setShowEndCalendar(false);
  };
  
  const toggleEndCalendar = (e) => {
    e.stopPropagation();
    setShowEndCalendar(!showEndCalendar);
    setShowStartCalendar(false);
  };

  return (
    <div className="w-full border border-[#1544AB] rounded-lg p-6 bg-white mt-1 absolute z-20 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-[500] text-black">Advanced Search</h2>
        <button 
          onClick={onClose}
          className="text-[#1544AB]"
        >
          <FaCaretUp  className='h-8 w-8' />
        </button>
      </div>
      
      <p className="text-[#8D8D8D] mb-6 font-[400]">
        You Can Find Your Transactions Quickly With Detailed Search.
      </p>
      
      <div>
        <div className="mb-6">
          <label className="block text-xl font-[500] text-black mb-3">
            Purchase Date
          </label>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-[#1544AB] rounded w-56 h-12 px-4 font-[400]"
                readOnly
              />
              <button 
                type="button" 
                className="absolute right-3 top-3 text-[#1544AB]"
                onClick={toggleStartCalendar}
              >
                <FaCalendarAlt size={20} />
              </button>
              
              {showStartCalendar && (
                <div ref={startCalendarRef} className="absolute top-14 left-0 z-30">
                  <SimpleCalendar 
                    onSelectDate={(date) => {
                      setStartDate(date);
                      setShowStartCalendar(false);
                    }}
                    onClose={() => setShowStartCalendar(false)}
                    initialDate={startDate}
                  />
                </div>
              )}
            </div>
            
            <span className="mx-4 text-xl">-</span>
            
            <div className="relative">
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-[#1544AB] rounded w-56 h-12 px-4 font-[400]"
                readOnly
              />
              <button 
                type="button" 
                className="absolute right-3 top-3 text-[#1544AB]"
                onClick={toggleEndCalendar}
              >
                <FaCalendarAlt size={20} />
              </button>
              
              {showEndCalendar && (
                <div ref={endCalendarRef} className="absolute top-14 left-0 z-30">
                  <SimpleCalendar 
                    onSelectDate={(date) => {
                      setEndDate(date);
                      setShowEndCalendar(false);
                    }}
                    onClose={() => setShowEndCalendar(false)}
                    initialDate={endDate}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-xl font-[500] text-black mb-3">
            Status
          </label>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-[#1544AB] rounded text-[#1544AB] focus:ring-0"
                checked={statusFilters.completed}
                onChange={() => handleStatusChange('completed')}
              />
              <span className="ml-2 text-base font-[400]">Completed</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-[#1544AB] rounded text-[#1544AB] focus:ring-0"
                checked={statusFilters.reportBeingPrepared}
                onChange={() => handleStatusChange('reportBeingPrepared')}
              />
              <span className="ml-2 text-base font-[400]">Report Is Being Prepared</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-[#1544AB] rounded text-[#1544AB] focus:ring-0"
                checked={statusFilters.expertiseAwaited}
                onChange={() => handleStatusChange('expertiseAwaited')}
              />
              <span className="ml-2 text-base font-[400]">Expertise Awaited</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-[#1544AB] rounded text-[#1544AB] focus:ring-0"
                checked={statusFilters.cancellationRefund}
                onChange={() => handleStatusChange('cancellationRefund')}
              />
              <span className="ml-2 text-base font-[400]">Cancellation/Refund</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-xl font-[500] text-black mb-3">
            Search By Word
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#1544AB] rounded w-full h-12 px-4 font-[400]"
            placeholder=""
          />
        </div>
        
        <div>
          <button
            onClick={handleSearch}
            className="bg-[#1544AB] text-white py-3 px-10 rounded-lg font-[500] uppercase"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

function MyTransactions() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const searchInputRef = useRef(null);
  const advancedSearchRef = useRef(null);

  // Handle clicking outside to close advanced search
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showAdvancedSearch && 
        advancedSearchRef.current && 
        !advancedSearchRef.current.contains(event.target) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target)
      ) {
        setShowAdvancedSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAdvancedSearch]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <div className="w-full max-w-4xl p-4 font-poppins rounded bg-white ml-4 mt-5 relative">
        <div className="flex justify-between items-center mb-4">
      <h2 className="text-[25px] font-[500] mb-1 text-black">
        My Transactions
      </h2>
      <button className="bg-[#1544AB] text-white py-3 px-6 rounded-full font-[500] uppercase">
      BUY EXPERTISE
      </button>
    </div>
      <div className="mb-4 relative">
        <div
          ref={searchInputRef}
          onClick={toggleAdvancedSearch}
          className="w-full px-4 py-3 border border-[#1544AB] placeholder-[#8D8D8D] font-[400] text-[18px] rounded-md flex justify-between items-center cursor-pointer"
        >
          <span className="text-[#8D8D8D]">Click For Detailed Search</span>
          <FaCaretDown className="text-[#1544AB] w-8 h-8" />
        </div>

        {showAdvancedSearch && (
          <div ref={advancedSearchRef}>
            <AdvancedSearch onClose={() => setShowAdvancedSearch(false)} />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border border-[#1544AB] placeholder-[#8D8D8D] font-[400] text-[18px] rounded-md px-4 py-2">
        <div className="text-[#231E1C] font-[400] text-[18px]">
          No Ads Found
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center border border-[#1544AB] rounded bg-white w-[325px] h-8"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className="flex justify-between items-center w-full px-2">
              <span className="text-gray-700">{selectedOption || ""}</span>
              <FaCaretDown className="text-[#1544AB] w-8 h-8" />
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-[325px] bg-white border border-gray-300 rounded shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Date Descending")}
                >
                  Date Descending
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Date Ascending")}
                >
                  Date Ascending
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Price High to Low")}
                >
                  Price High to Low
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectOption("Price Low to High")}
                >
                  Price Low to High
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTransactions;