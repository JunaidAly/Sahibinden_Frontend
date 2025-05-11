import React from 'react'

function Email() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Email</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-sm text-black font-normal">
          To ensure that you receive important emails regarding your listings,
          favorites and messages, please make sure that your current email
          address is registered.
        </p>
        <h2 className="text-black text-lg font-normal mt-3">
          Your registered email address:{" "}
          <span className="font-semibold"> mhagdp1542@gmail.com</span>
        </h2>

        <button
          type="button"
          className="px-5 py-2 mt-2 bg-[#1544AB] text-white font-medium rounded-full"
        >
          Change my email
        </button>
      </div>
    </div>
  );
}

export default Email