import React, { useState } from "react";

function BankInfoForm() {
  const [formData, setFormData] = useState({
    tridnumber: "",
    iban: "",
    surname: "",
    officeaddress: "",
    accountname: "",
    currentaccount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-normal">My Bank Information</h2>
        <button  className="bg-[#1544AB] text-white px-4 py-2 rounded-full  uppercase text-sm font-medium ">
          Add new bank
        </button>
      </div>

      <div className="space-y-4 shadow-custom-right p-6 rounded-md bg-white">
        <div>
          <label className="block text-sm text-black mb-1">TR ID Number</label>
          <input
            type="text"
            name="tridnumber"
            value={formData.tridnumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">IBAN</label>
          <input
            type="text"
            name="iban"
            value={formData.iban}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Name Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">
            Office Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.officeaddress}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Account Name</label>
          <input
            type="text"
            name="accountname"
            value={formData.accountname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-2">
            Current Account
          </label>
          <div className="flex justify-end gap-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="currentaccount"
                value="currentaccount"
                checked={formData.invoiceType === "currentaccount"}
                onChange={handleInputChange}
                className="mr-2 text-[#1544AB] focus:ring-[#1544AB]"
              />
              <span className="text-sm">Save as my current Account</span>
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
}

export default BankInfoForm;
