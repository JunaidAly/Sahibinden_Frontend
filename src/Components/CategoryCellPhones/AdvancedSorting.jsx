import React from 'react'

function AdvancedSorting() {
  return (
    <div className='flex items-center justify-center'>
        <input
              type="text"
              name="Advanced Sorting"
              placeholder="Advanced Sorting"      
              className="w-full p-3 border border-[#1544AB] font-poppins font-[700] text-[17px] placeholder-[#D9D9D9] rounded-md"
            />
            <img src="/assets/dropdown.svg" className='w-5 h-5 relative right-10' />
    </div>
  )
}

export default AdvancedSorting