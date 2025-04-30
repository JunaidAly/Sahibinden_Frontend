import React, { useState, useRef, useEffect } from 'react';
import RelatedCategories from './RelatedCategories';
const CustomScrollbar = ({ children, maxHeight = '400px' }) => {
  const contentRef = useRef(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrollbarHeight, setScrollbarHeight] = useState(100);
  
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    const calculateScrollbar = () => {
      const { scrollHeight, clientHeight, scrollTop } = content;
      const scrollable = scrollHeight > clientHeight;
      setShowScrollbar(scrollable);
      
      if (scrollable) {
        // Calculate scrollbar thumb height
        const thumbPercentage = (clientHeight / scrollHeight) * 100;
        setScrollbarHeight(thumbPercentage);
        
        // Calculate scrollbar position
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(scrollPercentage);
      }
    };
    
    calculateScrollbar();
    content.addEventListener('scroll', calculateScrollbar);
    window.addEventListener('resize', calculateScrollbar);
    
    return () => {
      content.removeEventListener('scroll', calculateScrollbar);
      window.removeEventListener('resize', calculateScrollbar);
    };
  }, []);
  
  return (
    <div className="relative">
      <div 
        ref={contentRef}
        className="overflow-y-auto scrollbar-hide"
        style={{ maxHeight }}
      >
        {children}
      </div>
      
      {showScrollbar && (
        <div className="absolute top-0 right-0 w-2 h-full">
          <div 
            className="w-2 bg-[#1544AB] rounded-full"
            style={{ 
              height: `${scrollbarHeight}%`, 
              transform: `translateY(${scrollPercentage}%)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        </div>
      )}
    </div>
  );
};

// Demo component
const SideBar= () => {
  return (
    <div className="w-[330px] h-[1220px] flex flex-col gap-5 bg-white shadow-custom rounded-lg ">
      <div className="p-4">
        <h2 className="text-xl font-[600] font-monrope  text-[#1544AB] mb-3">Car</h2>
        
        <CustomScrollbar maxHeight="400px">
          <ul className="space-y-6 pr-3 font-monrope font-[400] text-[15px]">
            <li className="text-[#231E1C]">Aion</li>
            <li className="text-[#231E1C]">Alfa Romeo</li>
            <li className="text-[#231E1C]">Anatolia</li>
            <li className="text-[#231E1C]">Aro</li>
            <li className="text-[#231E1C]">Audi</li>
            <li className="text-[#231E1C]">BMW</li>
            <li className="text-[#231E1C]">Bentley</li>
            <li className="text-[#231E1C]">BYD</li>
            <li className="text-[#231E1C]">Cadillac</li>
            <li className="text-[#231E1C]">Daewoo</li>
            <li className="text-[#231E1C]">Daihatsu</li>
            <li className="text-[#231E1C]">Ferrari <span className='text-[12px]'>(766986)</span></li>
            <li className="text-[#231E1C]">Ford <span className='text-[12px]'>(766986)</span></li>
            <li className="text-[#231E1C]">Lamborghini <span className='text-[12px]'>(766986)</span></li>
            <li className="text-[#231E1C]">Mercedes <span className='text-[12px]'>(766986)</span></li>
            <li className="text-[#231E1C]">Nissan <span className='text-[12px]'>(766986)</span></li>
            <li className="text-[#231E1C]">VolksWagen <span className='text-[12px]'>(766986)</span></li>
            <li className="text-[#231E1C]">Toyota <span className='text-[12px]'>(766986)</span></li>
          </ul>
        </CustomScrollbar>
      </div>
      <RelatedCategories />
    </div>
  );
};

export default SideBar;