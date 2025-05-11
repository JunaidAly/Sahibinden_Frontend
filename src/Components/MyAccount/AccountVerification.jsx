import React from 'react'

function AccountVerification() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">Account Verification</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-lg text-black font-normal">
          In accordance with the regulation published by the Ministry of Trade
          in order to increase reliability in the purchase, sale and rental of
          second-hand vehicles and real estate, you need to verify your account
          with e-Government once in order to publish your advertisement.
        </p>

        <button
          type="button"
          className="px-5 py-2 mt-2 capitalize bg-[#1544AB] text-white font-medium rounded-full"
        >
          Verify your account with e-government
        </button>
      </div>

      <h1 className="text-xl font-medium mt-2 text-black">
        E-commerce individual seller verification
      </h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-lg text-black font-normal">
          In order to increase the reliability of your S-Param Safe and GeT
          advertisements, you need to verify your information with
          e-Government once in each calendar year, as per the legal regulations
          published by the Ministry of Trade . In the following periods, if
          account holders do not complete the verification, it will not be
          possible for them to make sales.
        </p>
       

        <button
          type="button"
          className="px-5 py-2 mt-2 capitalize bg-[#1544AB] text-white font-medium rounded-full"
        >
          Verify your account with e-government
        </button>
      </div>
    </div>
  );
}

export default AccountVerification