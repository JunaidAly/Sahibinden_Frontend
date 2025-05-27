

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#231E1C] w-full  text-white py-12 px-4"> 
      <div className="max-w-6xl mx-auto w-full">
        {/* Logo and Social Icons */}
        <div className="flex flex-row justify-between items-center w-full mb-12">
          <img src="assets/logo.svg" alt="Logo" className="h-12" />

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <div className="border border-white rounded-full p-2 hover:bg-white hover:text-[#231E1C] transition-colors cursor-pointer">
              <FaFacebookF className="text-lg" />
            </div>
            <div className="border border-white rounded-full p-2 hover:bg-white hover:text-[#231E1C] transition-colors cursor-pointer">
              <FaTwitter className="text-lg" />
            </div>
            <div className="border border-white rounded-full p-2 hover:bg-white hover:text-[#231E1C] transition-colors cursor-pointer">
              <FaLinkedinIn className="text-lg" />
            </div>
            <div className="border border-white rounded-full p-2 hover:bg-white hover:text-[#231E1C] transition-colors cursor-pointer">
              <FaYoutube className="text-lg" />
            </div>
            <div className="border border-white rounded-full p-2 hover:bg-white hover:text-[#231E1C] transition-colors cursor-pointer">
              <FaInstagram className="text-lg" />
            </div>
          </div>
        </div>
        
        {/* Links Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-6 font-poppins text-lg">Institutional</h3>
            <ul className="space-y-3 text-sm font-[400] font-poppins">
              <li className="hover:text-gray-300 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Human Resources</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">News</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Site Map</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Communication</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 font-poppins text-lg">Our Services</h3>
            <ul className="space-y-3 text-sm font-[400] font-poppins">
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Doping</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Q - My Money is Safe</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Secure E-Commerce</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Advert</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Mobile</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Auto King</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 font-poppins text-lg">Shops</h3>
            <ul className="space-y-3 text-sm font-[400] font-poppins">
              <li className="hover:text-gray-300 cursor-pointer transition-colors">My Store</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">I Want to Open a Store</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 font-poppins text-lg">Privacy and Use</h3>
            <ul className="space-y-3 text-sm font-[400] font-poppins">
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Safe Shopping Tips</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Contracts and Rules</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Account Agreement</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Terms Of Use</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Protection of Personal Data</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">Help and Operation Guide</li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div>
          <p className="text-sm font-[400] text-gray-300 font-poppins text-left">
            © 2024 Sahibinden Ltd. All rights reserved.
          </p>      
        </div>
      </div>
    </footer>
  );
};

export default Footer;