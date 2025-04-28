import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    text: "I had the pleasure of working with ABC Realty to find my dream home, and I couldn't be happier with the entire experience. From the moment I walked into their office, I felt welcomed and supported by their friendly team.",
    name: "Sarah M.",
    title: "Property consultation",
    image: "/assets/testimonials/1.png",
  },
  {
    text: "Once we found the perfect home, Sarah guided me through every step of the buying process, making it feel effortless on my part. She was an excellent negotiator, and thanks to her skills, I was able to secure a fantastic deal on my new home.",
    name: "Esther Howard",
    title: "Property consultation",
    image: "/assets/testimonials/2.png",
  },
];

const Testimonials = () => {
  return (
    <section className="flex items-center justify-center px-10 py-16  bg-[#EFF2F799]">
      {/* Left Side */}
      <div className=" flex flex-col justify-center items-baseline gap-14 w-[451px] h-[223px]">
        <h2 className="text-[61px] font-[400] leading-[111%] text-[#010101] ">
          Our <span className="text-[#010101] font-[500]">Customers</span> <br /> Think We’re <br /> The Best
        </h2>

        {/* Arrows */}
        <div className="flex gap-4 ">
          <button className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#6E00FF1A] text-[#1544AB]">
            <IoMdArrowBack className="w-5 h-5" />
          </button>
          <button className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#1544AB] text-white">
            <IoMdArrowForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl  w-96 flex-shrink-0">
            <div className="flex justify-between items-start mb-4">
              <img src="/assets/testimonials/black.svg" alt="" />
              <div className="flex text-yellow-400 ">
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <span key={idx} ><FaStar className="w-[26px] h-[26px]" /></span>
                  ))}
              </div>
            </div>
            <p className="font-[400] text-[#010101] font-poppins text-[16px] mb-6">{item.text}</p>
            <div className="flex items-center gap-6">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
              <div >
                <p className="font-[400] text-[#010101] font-poppins text-[18px]">{item.name}</p>
                <p className="font-[400] text-[#010101] font-poppins text-[15px]">{item.title}</p>
              </div>
              <RiVerifiedBadgeFill className='w-5 h-5' />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
