import React from "react";

const AboutUs = () => {
  return (
    <section className="relative left-[7rem] w-full  ">
    <div className="w-[1126px] h-[600px]">
      {/* Background Image */}
      <img
        src="/assets/bg-about.png"
        alt="Luxury Apartments"
        className="w-full h-full rounded-[15px] object-cover"
      />

      {/* Blue Overlay Content */}
      <div className="absolute bottom-10 md:right-[9rem] left-0 md:left-auto p-8 bg-[#1544AB]  w-full md:w-[660px] h-[250px] text-white">
        <h2 className="text-[40px] md:text-4xl font-poppins font-[900] leading-[100%] mb-4">
          ABOUT US
        </h2>
        <p className="text-sm md:text-base font-[400] mb-6 leading-relaxed  font-poppins ">
          Vector team main thumbnail vertical scrolling polygon align create
          arrange. Align link editor fill ipsum figjam. Device italic mask clip
          export selection figjam.
        </p>
        <button className="border border-white text-[16px] font-poppins py-3 px-6 rounded-full ">
          SEE ALL PROPERTIES
        </button>
      </div>
      </div>
    </section>
  );
};

export default AboutUs;
