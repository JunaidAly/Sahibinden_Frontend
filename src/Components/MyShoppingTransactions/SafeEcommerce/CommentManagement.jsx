import React from 'react'

function CommentManagement() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <div className="w-full flex flex-col justify-center gap-6">
        <h1 className="font-normal text-xl text-black">Comment Management</h1>
        <input
          type="text"
          placeholder="Products I Sell / Products i purchased"
          name="sellpurchaseproduct"
          className="w-full px-4 py-3 border border-[#1544AB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button className="px-6 py-2 max-w-32 bg-[#1544AB] text-white rounded-full ">
          SEARCH
        </button>

        <textarea
          className="shadow-custom-right p-5 rounded-xl mt-3"
          rows={8}
          name="comment"
          placeholder="Comments...."
        ></textarea>
      </div>
    </div>
  );
}

export default CommentManagement