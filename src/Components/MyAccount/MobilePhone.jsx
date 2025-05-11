import React from 'react'

function MobilePhone() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Mobile Phone</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <h1 className="text-xl font-semibold text-black">
          Help Us Protect Your Account
        </h1>
        <p className="text-sm text-black font-normal">
          You can add your mobile phone number so that you can log in to your
          account when you forget your password or protect your account with SMS
          verification.
        </p>
        <div className="flex-1 gap-2 items-center mt-2">
          <text className="w-full ">Mobile Phone Number</text>
          <input
            type="text"
            placeholder="+90(__)__ ___"
            className="w-full px-4 py-3 border placeholder:text-black border-[#1544AB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          className="px-5 py-2 mt-2  capitalize bg-[#1544AB] text-white font-medium rounded-full"
        >
          add my phone number
        </button>
      </div>
    </div>
  );
}

export default MobilePhone