import React, { useState } from 'react';
import Navbar from '../Navbar';
import NavbarMenu from './NavbarMenu';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';
import ComparePlans from '../AdManagement/ComparePlans';
// import { FaCaretDown } from "react-icons/fa";
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
    <CommentForm/>
    <Footer/>
    </>
  )
}

export default index