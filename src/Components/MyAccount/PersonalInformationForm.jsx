import { useState } from 'react';

function PersonalInformationForm() {
  const [formData, setFormData] = useState({
    username: 'Teuser44',
    surname: 'Test User',
    homePhone: '-',
    workPhone: '-'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl w-full h-max p-5 mx-auto font-poppins  bg-white">
      <h1 className="text-lg font-medium text-black mb-6">My Personal Information</h1>
      
      <div className="flex justify-center w-full mb-6">
        <div className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center text-[#1544AB]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs mt-1">Add Photo</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 w-full">
        <div>
          <label htmlFor="username" className="  text-sm font-medium text-black ">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div >
          <label htmlFor="surname" className="block w-full text-sm font-medium text-black mb-1">Name Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="homePhone" className="block text-sm font-medium text-black mb-1">Home Phone</label>
          <input
            type="text"
            id="homePhone"
            name="homePhone"
            value={formData.homePhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="workPhone" className="block text-sm font-medium text-black mb-1">Work Phone</label>
          <input
            type="text"
            id="workPhone"
            name="workPhone"
            value={formData.workPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-8 py-2 bg-[#1544AB] text-white font-medium rounded-full"
        >
          EDIT
        </button>
      </div>
    </div>
  );
}

export default PersonalInformationForm;