import React from 'react'

function RecoveryEmail() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Recovery Email</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-lg text-black font-normal mb-4">
          If you forget your password, you can use your recovery email address
          to help you access your account.
        </p>

        <h1 className="text-lg text-black font-normal">You do not have a registered recovery email address .</h1>

        <button
          type="button"
          className="px-5 py-2 mt-2 bg-[#1544AB] text-white font-medium rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default RecoveryEmail