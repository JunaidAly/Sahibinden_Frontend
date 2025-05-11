import React from 'react'

function TwoStepVerification() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">2 Step Verification</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-lg text-black font-normal">
          When I log in from a new device, I would like to receive a
          verification code sent to my mobile phone or email address in addition
          to my password.
        </p>

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

export default TwoStepVerification