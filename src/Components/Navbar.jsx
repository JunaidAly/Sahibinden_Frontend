

import { FaShoppingCart, FaEnvelope, FaBell, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the path to your Firebase config

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear any additional local storage data if you're storing user info locally
      localStorage.removeItem('user');
      localStorage.removeItem('userProfile');
      sessionStorage.clear();
      
      console.log("User signed out successfully");
      
      // Redirect to signin page
      navigate('/signin');
      
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="flex flex-col items-center justify-center mx-auto w-full gap-2 bg-white">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <Link to={"/"}>
          <div className="flex items-center">
            <img 
              src="/assets/logo.svg" 
              alt="Logo" 
              className="h-[80px] w-[150px]"
              onError={(e) => {
                console.error('Logo failed to load:', e.target.src);
                // Fallback handling
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<div class="h-[80px] w-[150px] bg-blue-600 text-white flex items-center justify-center font-bold">LOGO</div>';
              }}
            />
          </div>
        </Link>
        
        {/* Center: Search Bar */}
        <div className="flex-1 mx-8">
          <div className="flex items-center w-[464px] border border-[#1544AB] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Type the content you want to search"
              className="w-[464px] px-4 py-2 outline-none font-sans font-[700] text-gray-700 placeholder-[#D9D9D9]"
            />
            <button className="px-3 text-[#1544AB]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Icons + Button */}
        <div className="flex items-center space-x-6 mr-10">
          {/* Notification Icons */}
          <Link to={"/cart"}>
            <div className="relative">
              <FaShoppingCart className="text-[#1544AB] text-xl" />
              <span className="absolute -top-2 -right-2 bg-[#1544AB] text-white rounded-full text-xs px-1">1</span>
            </div>
          </Link>

          <Link to={"/massage-and-notifications"}>
            <div className="relative">
              <FaEnvelope className="text-[#1544AB] text-xl" />
              <span className="absolute -top-2 -right-2 bg-[#1544AB] text-white rounded-full text-xs px-1">1</span>
            </div>
          </Link>

          <Link to={"/massage-and-notifications"}>
            <div className="relative">
              <FaBell className="text-[#1544AB] text-xl" />
              <span className="absolute -top-2 -right-2 bg-[#1544AB] text-white rounded-full text-xs px-1">1</span>
            </div>
          </Link>

          <Link to={"/favorites"}>
            <div>
              <FaStar className="text-[#1544AB] text-xl" />
            </div>
          </Link>

          {/* Logout Button */}
          <button onClick={handleLogout} className="cursor-pointer">
            <img src="/assets/logout.svg" className="h-6 w-6" alt="Logout" />
          </button>

          {/* Post Ad Button */}
          <Link to={"/post-an-add"}>
            <button className="bg-[#1544AB] text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2">
              POST AN AD FOR FREE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L21 12l-3.75 5.25M3 12h18"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>     
    </nav>
  );
};

export default Navbar;