import React from 'react';
import { MapPin, ChevronDown, Search , ArrowRight,} from 'lucide-react';
import Navbar from '../Navbar';
import NavbarMenu from '../Auto360/NavbarMenu';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';


const CarCareSection = () => {
    return (
      <div className="w-full max-w-7xl  mx-auto p-8 bg-white shadow-custom-diagonal mt-10 rounded-lg">
        <div className='font-poppins ' >
          <h2 className="font-[600] text-[30px] text-black mb-4">Car Care and Maintenance</h2>
          
          <p className="text-[24px] font-[400] text-black mb-6">
            Benefit from a variety of services such as detailed interior and exterior cleaning, ceramic coating, rim
            and engine cleaning; hood, wax polish and paint protection, window film coating.
          </p>
          
          <a href="#details" className="text-[#1544AB] font-medium text-[20px]">
            Detailed Information
          </a>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between ">
          <div className="w-full md:w-[30%] md:pr-10 mb-6 ">
            <img 
              src="/assets/vehicledamage.png" 
              alt="Black SUV car" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-[500] text-black mb-2">
                Ceramic Coating at Auto King is only 9,900 TL
              </h3>
            </div>
            
            <div>
              <a  
                className="inline-flex items-center justify-center text-[16px]  bg-[#1544AB]  text-white font-medium px-6 py-3 rounded-full "
              >
                Join The Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

const PeriodicSection = () => {
    return (
      <div className="w-full max-w-7xl  mx-auto p-8 bg-white shadow-custom-diagonal mt-10 rounded-lg">
        <div className="font-poppins ">
          <h2 className="font-[600] text-[30px] text-black mb-4">
            Periodic Maintenance
          </h2>

          <p className="text-[24px] font-[400] text-black mb-6">
            Have all general checks of your vehicle, including brake, electrical
            systems, fluid and oil checks, and have a safe journey.
          </p>

          <a href="#details" className="text-[#1544AB] font-medium text-[20px]">
            Detailed Information
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between ">
          <div className="w-full md:w-[30%] md:pr-10 mb-6 ">
            <img
              src="/assets/vehicledamage.png"
              alt="Black SUV car"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-[500] text-black mb-2">
                Periodic Maintenance at Auto King is only 4,950 TL
              </h3>
            </div>

            <div>
              <a className="inline-flex items-center justify-center text-[16px]  bg-[#1544AB]  text-white font-medium px-6 py-3 rounded-full ">
                Join The Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };


  

const ModernLivingHero = () => {
  return (
    <>
    <Navbar />
    <NavbarMenu />
    <div className="relative w-full overflow-hidden mt-10 bg-white">
      {/* Dot pattern background
      <div className="absolute top-0 right-0 w-[35%] h-full z-0">
        <div className="grid grid-cols-12 md:grid-cols-20 gap-2">
          {Array.from({ length: 408 }).map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-[#E1E1EC]"></div>
          ))}
        </div>
      </div> */}

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center relative z-10">
        {/* Left content */}
        <div className="w-full  font-poppins md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
        <div className='ml-14'>
          <h1 className="text-5xl md:text-6xl font-bold text-[#091638] leading-tight mb-6">
            Modern living<br />for everyone
          </h1>
          <p className="text-lg text-[#091638] mb-12 max-w-lg">
            We provide a complete service for the sale, purchase or rental of various items. We have been operating in Spain more than 15 years.
          </p>
          </div>

          {/* Search form */}
          <div className="bg-white relative left-28 p-5 rounded-md shadow-lg">
            <div className="flex flex-col md:flex-row gap-5 ">
              {/* Location input */}
              <div className="relative flex-grow">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#888F9F]">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-4 pl-12 pr-4 border placeholder:text-[17px] placeholder:font-[400] border-gray-200 rounded-l-md"
                />
              </div>

              {/* Property type dropdown */}
              <div className="relative border rounded-[4px] w-[250px]   border-gray-200 flex-grow">
                <select className="w-full py-4 px-4 appearance-none text-[#888F9F] ">
                  <option>Property type</option>
                  <option>Houses</option>
                  <option>Apartments</option>
                  <option>Cars</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={20} className="text-[#888F9F]" />
                </div>
              </div>

              {/* Search button */}
              <button className="bg-[#1544AB] text-white rounded-[4px]   font-medium text-[17px] py-4 px-8 flex items-center justify-center ">
                <Search size={20} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="w-full md:w-[40%]">
          <div className="rounded-lg overflow-hidden">
            <img
              src="/assets/Container.png"
              alt="Luxury car with headlights on at sunset"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    <CarCareSection />
    <PeriodicSection />
    <CommentForm />
    <Footer />
    </>
  );
};

export default ModernLivingHero;