import React from 'react'

function AccountHolder() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">
        Account Holders / Blocked
      </h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-sm text-black font-normal">
          There is no account owner you have blocked.
        </p>
      </div>
    </div>
  );
}

export default AccountHolder