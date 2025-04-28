import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#231E1C] text-white py-10 px-4 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10">
        {/* Logo */}
        <div className="  flex flex-row  gap-[40rem]">
          <img src="assets/logo.svg" alt="Logo" className="h-12" />

          {/* Social Icons */}
          <div className="flex items-start space-x-4 mt-4">
            <div className="border border-white rounded-full p-2">
              <FaFacebookF className="text-white text-lg" />
            </div>
            <div className="border border-white rounded-full p-2">
              <FaTwitter className="text-white text-lg" />
            </div>
            <div className="border border-white rounded-full p-2">
              <FaLinkedinIn className="text-white text-lg" />
            </div>
            <div className="border border-white rounded-full p-2">
              <FaYoutube className="text-white text-lg" />
            </div>
            <div className="border border-white rounded-full p-2">
              <FaInstagram className="text-white text-lg" />
            </div>
          </div>
        </div>
        
        <div className=" max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        {/* Links Sections */}
        <div>
          <h3 className="font-bold mb-4 font-poppins">Institutional</h3>
          <ul className="space-y-2 text-sm font-[400] font-poppins">
            <li>About Us</li>
            <li>Sustainability</li>
            <li>Human Resources</li>
            <li>News</li>
            <li>Site Map</li>
            <li>Communication</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 font-poppins">Our Services</h3>
          <ul className="space-y-2 text-sm font-[400] font-poppins">
            <li>Doping</li>
            <li>Q - My Money is Safe</li>
            <li>Secure E-Commerce</li>
            <li>Advert</li>
            <li>Mobile</li>
            <li>Auto King</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 font-poppins">Shops</h3>
          <ul className="space-y-2 text-sm font-[400] font-poppins">
            <li>My Store</li>
            <li>I Want to Open a Store</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 font-poppins">Privacy and Use</h3>
          <ul className="space-y-2 text-sm font-[400] font-poppins">
            <li>Safe Shopping Tips</li>
            <li>Contracts and Rules</li>
            <li>Account Agreement</li>
            <li>Terms Of Use</li>
            <li>Protection of Personal Data</li>
            <li>Help and Operation Guide</li>
          </ul>
        </div>
      </div>
      </div>

      {/* Bottom Text */}
      <div className="relative right-[22rem] mt-10 text-left text-xs font-[400] text-white font-poppins">
        © 2024 Sahibinden Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
