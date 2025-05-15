import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";


function AppraisalForm() {
    const [formData, setFormData] = useState({
    name: '',
    maturity: '',
    phone: '',
    email: '',
    province: '',
    district: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  return (
     <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-custom-diagonal overflow-hidden">
          <div className="flex flex-row  gap-14 p-8">
            {/* Left Side - Form */}
            <div className=" max-w-md w-full p-6 rounded-lg shadow-custom-diagonal">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primaryBlue placeholder:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <input
                      type="text"
                      name="maturity"
                      placeholder="Maturity"
                      value={formData.maturity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primaryBlue placeholder:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Mobile Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primaryBlue placeholder:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primaryBlue placeholder:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Property Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Information On The Property You Will Buy</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-primaryBlue placeholder:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Province</option>
                        <option value="province1">Province 1</option>
                        <option value="province2">Province 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <FaCaretDown size={24}  className='text-primaryBlue'/>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-primaryBlue placeholder:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">District</option>
                        <option value="district1">District 1</option>
                        <option value="district2">District 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                         <FaCaretDown size={24}  className='text-primaryBlue'/>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primaryBlue text-white font-semibold rounded-lg "
                >
                  Send An Expert Request
                </button>

                <div className="text-center">
                  <a href="#" className="text-primaryBlue hover:underline">Sample Expert Report</a>
                </div>
              </form>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-row  justify-between">
              <div className='max-w-md w-full'>
                <h1 className="text-3xl font-bold mb-6 leading-tight">
                  Get A Real Estate Appraisal Before Buying Your Home, Easily Learn What You Need To Know!
                </h1>
                
                <p className="text-black mb-6">
                  In addition to title deed information, you can learn comprehensive information such as current zoning status, factors affecting value, and price valuation.
                </p>
                
                <p className="text-sm text-primarygray mb-8">
                  *Prices vary depending on the type and size of the property and municipality fees. Pricing specific to our users was last revised on 01.01.2025.
                </p>
                
                <p className="text-sm text-primarygray">
                  Real Estate Expertise service within the scope of cooperation. It is provided by Real Estate Appraisal Consultancy Inc. The information received will be shared with Eva CYD Inc. to provide you with information on the subject. You can access detailed information about the protection of personal data{' '}
                  <a href="#" className="text-primaryBlue hover:underline">here</a>.
                </p>
              </div>

              {/* Illustration */}
              <div className="flex justify-center mt-8">
                <img
                  src="/assets/creditform.png"
                  alt="Illustration"
                  className="w-full max-w-xs h-96 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppraisalForm