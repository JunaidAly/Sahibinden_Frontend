import React from 'react'

function AccountCancellation() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
    <h1 className="text-xl font-medium text-black">Account Cancellation</h1>
    <div className='w-full shadow-custom-right rounded-lg p-5 mt-5'>
     <h2 className=" font-normal text-black mb-4">
        We are sorry that you want to cancel your sahibinden.com account.
      </h2>
      
      <p className=" font-normal text-black mb-4">
        If you cancel your account;
      </p>
      
      <ul className="list-disc pl-10 mb-6 space-y-2">
        <li className=" font-normal text-black">Your account cannot be reactivated.</li>
        <li className=" font-normal text-black">All your published ads will be removed from publication and no refunds will be made.</li>
        <li className=" font-normal text-black">If you have an ad in which you use doping, no refunds will be made.</li>
        <li className=" font-normal text-black">You cannot use your e-mail address in a new sahibinden.com account for 10 years.</li>
      </ul>
      
      <p className="font-normal text-black mb-8">
        If you have any questions or concerns about your account, you can contact us via the Support Center before closing your account. If you still want to cancel, please select the reason you want to cancel your account in order to maintain our service quality.
      </p>
      
      <div className="flex">
        <button
          className="px-8 py-3 bg-[#1544AB] text-white font-medium rounded-full text-lg  "
        >
          CANCEL ACCOUNT
        </button>
      </div>
      </div>
    </div>
  )
}

export default AccountCancellation