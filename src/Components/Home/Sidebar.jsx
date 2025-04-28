import React from "react";
import { ChevronDown } from "lucide-react"; // optional for dropdown icon

const categories = [
  {
    title: "Urgent",
    icon: "🚨",
  },
  {
    title: "Last 48 Hours / 1 Week",
    icon: "🕒",
  },
  {
    title: "Refurbished Devices With",
    icon: "🔧",
  },
  {
    title: "Auto360",
    icon: "🚗",
  },
  {
    title: "Auto Expertise",
    children: ["Housing", "Workplaces", "Land", "Housing Projects"],
  },
  {
    title: "Real Estate360",
    icon: "🏠",
  },
  {
    title: "Real Estate",
    icon: "🏠",
    children: ["Housing", "Workplaces", "Land", "Housing Projects"],
  },
  {
    title: "Vehicle",
    icon: "🚙",
    children: [
      "Cars",
      "Off-Road",
      "Motorcycle",
      "Commercial Vehicles",
      "Electric Vehicles",
    ],
  },
  {
    title: "Spare Parts, Accessories",
    icon: "🛠️",
  },
  {
    title: "Second Hand and New Shop",
    icon: "🏕️",
  },
  {
    title: "Brand New",
    icon: "🆕",
  },
  {
    title: "Construction Machinery",
    icon: "🏗️",
  },
  {
    title: "Craftsmen & Services",
    icon: "🛠️",
  },
  {
    title: "Private Tutors",
    icon: "👨‍🏫",
  },
  {
    title: "Job Postings",
    icon: "🧑‍💼",
  },
  {
    title: "Animal Kingdom",
    icon: "🐾",
  },
  {
    title: "Help Seekers",
    icon: "🤝",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-[329px] h-[3380px] p-4  bg-white shadow rounded-lg overflow-y-auto ">
      <h2 className="text-[25px] leading-[34px] font-[600] font-ManropeSemiBold text-[#1544AB] mb-2">
        Categories
      </h2>

      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-semibold text-gray-800">{category.title}</span>
              </div>
              {category.children && (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </div>

            {category.children && (
              <ul className="ml-8 mt-2 space-y-1">
                {category.children.map((child, childIndex) => (
                  <li key={childIndex} className="text-sm text-gray-600">
                    {child}
                  </li>
                ))}
                <li className="flex items-center gap-1 text-sm text-blue-600 cursor-pointer">
                  Show All
                  <ChevronDown className="h-4 w-4" />
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
