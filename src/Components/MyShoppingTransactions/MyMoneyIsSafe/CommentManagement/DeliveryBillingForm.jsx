import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
const DeliveryBillingForm = () => {
  const [formData, setFormData] = useState({
    addressName: '',
    name: '',
    surname: '',
    country: '',
    province: '',
    district: '',
    neighbourhood: '',
    address: '',
    telephone: '',
    invoiceType: 'individual'
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-normal">My Delivery / Billing Addresses</h2>
        <button className="bg-[#1544AB] text-white px-4 py-2 rounded-full text-sm font-medium ">
          ADD NEW ADDRESS
        </button>
      </div>

      <div className="space-y-4 shadow-custom-right p-6 rounded-md bg-white">
        <div>
          <label className="block text-sm text-black mb-1">Address Name</label>
          <input
            type="text"
            name="addressName"
            value={formData.addressName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Country</label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 pr-10 border border-[#1544AB] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Telephone</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-2">Invoice Type</label>
          <div className="flex justify-end gap-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="invoiceType"
                value="individual"
                checked={formData.invoiceType === 'individual'}
                onChange={handleInputChange}
                className="mr-2 text-[#1544AB] focus:ring-[#1544AB]"
              />
              <span className="text-sm">Individual</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="invoiceType"
                value="institutional"
                checked={formData.invoiceType === 'institutional'}
                onChange={handleInputChange}
                className="mr-2 text-[#1544AB]  focus:ring-[#1544AB]"
              />
              <span className="text-sm">Institutional</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmit}
            className="max-w-[8rem] w-full bg-[#1544AB] text-white py-2 rounded-md font-medium "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBillingForm;