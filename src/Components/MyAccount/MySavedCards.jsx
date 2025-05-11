import React from 'react'

function MySavedCards() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">My Saved Cards</h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-sm text-black font-normal">
        You can make your payments quickly by saving your card to Masterpass.
        </p>

        <button
          type="button"
          className="px-5 py-2 mt-2 uppercase bg-[#1544AB] text-white font-medium rounded-full"
        >
          My Saved Cards
        </button>
      </div>
    </div>
  )
}

export default MySavedCards