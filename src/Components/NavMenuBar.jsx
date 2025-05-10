import React from 'react'
import { Link } from "react-router";

function NavMenuBar() {
    const links = [
        { name: "Home", path:"/" },
        { name: "Ad Management", path:"/ad-management"  },
        { name: "My Shopping Transactions", path:"/" },
        { name: "Favorites", path:"/favorites" },
        { name: "Message and Notifications", path:"/" },
        { name: "Services", path:"/services" },
        { name: "My Account",path:"/"},
      ];
  return (
    <div className="flex items-center h-[70px] justify-center w-full max-w-7xl mx-auto">
      <div className="flex gap-8 cursor-pointer">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`text-[16px] font-[400] font-poppins ${
              link.active
                ? "text-[#1544AB]"
                : "text-[#231E1C] "
            }`}
           
          >
             {link.name}
          </Link>
        ))}
      </div>
      </div>
  )
}

export default NavMenuBar