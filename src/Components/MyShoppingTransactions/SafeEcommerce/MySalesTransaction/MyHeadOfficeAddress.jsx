import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";

function MyHeadOfficeAddress() {
    const [formData, setFormData] = useState({
        nameSurname: '',
        telephone: '',
        trIdNumber: '',
        country: '',
        province: '',
        district: '',
        neighbourhood: '',
        address: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = () => {
        console.log('Form data:', formData);
      };
    
      const countries = ['Turkey', 'United States', 'Germany', 'France', 'Italy'];
      const provinces = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];
      const districts = ['Kadikoy', 'Besiktas', 'Uskudar', 'Fatih', 'Beyoglu'];
      const neighbourhoods = ['Merkez', 'Sahil', 'Park', 'Bahce', 'Carsı'];
  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white font-poppins">
      <h2 className="text-xl font-normal mb-6">Add My Center Address</h2>

      <div className="space-y-4 shadow-custom-right p-6 rounded-md bg-white">
        <div>
          <label className="block text-sm text-black mb-1">Name Surname</label>
          <input
            type="text"
            name="nameSurname"
            value={formData.nameSurname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Telephone</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">TR ID Number</label>
          <input
            type="text"
            name="trIdNumber"
            value={formData.trIdNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Country</label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Province</label>
          <div className="relative">
            <select
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Province</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-black mb-1">District</label>
          <div className="relative">
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select District</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Neighbourhood</label>
          <div className="relative">
            <select
              name="neighbourhood"
              value={formData.neighbourhood}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Neighbourhood</option>
              {neighbourhoods.map(neighbourhood => (
                <option key={neighbourhood} value={neighbourhood}>{neighbourhood}</option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1544AB] pointer-events-none" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-[#1544AB] text-white rounded-md font-medium "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyHeadOfficeAddress