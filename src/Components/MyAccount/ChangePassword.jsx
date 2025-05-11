import React from 'react'

function ChangePassword() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Password Change</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <h1 className="text-xl font-semibold text-black">
          To change your password, enter your current and new password.
        </h1>
       
        <div className="flex flex-col gap-2 items-center mt-2">
          <label className="w-full capitalize ">current Password</label>
          <input
            type="text"
            placeholder="teuser44"
            className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label className="w-full ">New Password</label>
          <input
            type="text"
            placeholder="teuser44"
            className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label className="w-full ">Retype Password</label>
          <input
            type="text"
            placeholder="teuser44"
            className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          className="px-5 py-2 mt-2 capitalize bg-[#1544AB] text-white font-medium rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default ChangePassword