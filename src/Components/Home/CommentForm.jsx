import React from "react";

const CommentForm = () => {
  return (
    <section className="max-w-4xl mx-auto p-12 bg-white rounded-2xl ">
      {/* Heading */}
      <h2 className="text-[28px] font-poppins leading-[100%] font-bold mb-2 text-[#434343]">Leave A Reply</h2>
      

      {/* Name & Email Fields */}
      <div className="flex flex-col gap-4">
      <p className="text-[#717171] font-poppins mb-6 text-[22px] leading-8">Your Email Address Will Not Be Published.</p>

      {/* Comment Field */}
      <div className="flex flex-col gap-4">
        <label className="text-[#717171] font-poppins font-[500]  text-[26px] leading-8 mb-2">Comment</label>
        <textarea
          className="w-full h-40 p-4 border shadow-md placeholder-[#BDBDBD] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Comment"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 border shadow-md placeholder-[#BDBDBD] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 border placeholder-[#BDBDBD] rounded-lg focus:outline-none shadow-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div> 
      {/* Submit Button */}
      <button className="bg-[#1544AB]  mx-64  text-white py-3 px-8 rounded-lg shadow-md transition">
        Post Comment
      </button>
      </div>
      
    </section>
  );
};

export default CommentForm;
