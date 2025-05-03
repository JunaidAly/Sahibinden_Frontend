import React, { useState } from 'react';
import Navbar from '../Navbar';
import NavbarMenu from './NavbarMenu';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';
import ComparePlans from '../AdManagement/ComparePlans';



 const DetailedInformation = () => {
  return (
    <div className="max-w-7xl mx-auto font-poppins  py-12 px-4  ">
      <h2 className="text-[30px] font-[500] text-black mb-8">
        Why should I get expert service from sahibinden.com?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            Get Comprehensive Service at an Affordable Price
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            Choose from our expert packages and have a comprehensive expert
            assessment done at an affordable price.
          </p>
        </div>

        {/* Vehicle Detail Inquiry Section */}
        <div className="shadow-custom-diagonal rounded-lg p-6">
          <h3 className="text-[20px]  font-[500] text-black mb-4">
            Choose Professional Service
          </h3>
          <p className="text-[15px]  font-[500] text-black leading-relaxed">
            Selected for you by sahibinden.com to Get professional and quality
            service by choosing one of our kspertiz business partner Auto King
            Auto Expertise branches.
          </p>
        </div>
      </div>
    </div>
  );
};

function index() {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  return (
    <>
    <Navbar/>
    <NavbarMenu/>
    <div className="max-w-5xl ml-5 p-4 font-poppins bg-white rounded">
      <h2 className="text-[30px] font-[500] text-black">Auto Expertise</h2>
      <p className="mt-2 font-[400] text-[20px] leading-7 text-black">
        If you are wondering where to get expertise service: choose one of the branches of sahibinden.com's
        professional business partner Auto King Auto Expertise and get comprehensive expertise packages at
        affordable prices.
      </p>
      <p className="mt-3 font-[400] text-[20px] leading-6  text-black">
        Log in with your corporate account to receive special offers for Vehicle Store users.
      </p>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="w-full sm:w-36">
          <select 
            className="w-full px-3 py-2  font-[400] text-sm border border-[#1544AB] rounded "
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="" disabled selected>Province</option>
            <option value="istanbul">Istanbul</option>
            <option value="ankara">Ankara</option>
            <option value="izmir">Izmir</option>
          </select>
        </div>
        
        <div className="w-full sm:w-36">
          <select 
            className="w-full px-3 py-2 font-[400]  text-sm border border-[#1544AB] rounded"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
             {/* <FaCaretDown className='w-8 h-8' /> */}
            <option value="" disabled selected>District</option>
            <option value="kadikoy">Kadikoy</option>
            <option value="besiktas">Besiktas</option>
            <option value="sisli">Sisli</option>
           
          </select>
          
        </div>
        
        <div className="flex-grow">
          <button 
            className="w-[300px] px-3 font-Inter font-[400] py-2 text-sm text-white bg-[#1544AB] rounded"
          >
            Select branch and purchase
          </button>
        </div>
      </div>
    </div>
    <ComparePlans/>
    <DetailedInformation/>
    <CommentForm/>
    <Footer/>
    </>
  )
}

export default index