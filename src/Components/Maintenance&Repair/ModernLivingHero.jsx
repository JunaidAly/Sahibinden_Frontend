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
    <CarCareSection />
    <PeriodicSection />
    <CommentForm />
    <Footer />
    </>
  );
};

export default ModernLivingHero;