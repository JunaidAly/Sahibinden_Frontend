import React from 'react';
import { Link } from 'react-router';
const CategorySelection = () => {
  const categories = [
    {
      id: 1,
      title: "Real Estate",
      icon: "/assets/addpost/1.png",
    },
    {
      id: 2,
      title: "Vehicle",
      icon: "/assets/addpost/2.png",
    },
    {
      id: 3,
      title: "Spare Parts, Accessories, Hardware & Tuning",
      icon: "/assets/addpost/3.png",
    },
    {
      id: 4,
      title: "Second Hand And New Shopping",
      icon: "/assets/addpost/4.png",
    },
    {
      id: 5,
      title: "Construction Machinery & Industry",
      icon: "/assets/addpost/5.png",
    },
    {
      id: 6,
      title: "Masters And Services",
      icon: "/assets/addpost/6.png",
    },
    {
      id: 7,
      title: "Private Tutors",
      icon: "/assets/addpost/7.png",
    },
    {
      id: 8,
      title: "Job Postings",
      icon: "/assets/addpost/8.png",
    },
    {
      id: 9,
      title: "Animal Kingdom",
      icon: "/assets/addpost/9.png",
    },
    {
      id: 10,
      title: "Those Seeking Help",
      icon: "/assets/addpost/10.png",
    },
  ];

  return (
    <div className="max-w-[1300px] mx-auto p-6 h-[644px] font-poppins bg-white rounded-lg shadow-custom">
      <h2 className="text-2xl font-[500] text-black  mb-6">Step By Step Select Category</h2>
      <Link to={"/category-selection-details"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
       
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white p-6 w-[246px] h-[236px] rounded-lg shadow-custom  cursor-pointer flex flex-col items-center justify-center text-center"
          >
            <div className="mb-4">
              <img 
                src={category.icon} 
                alt={category.title} 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h3 className="font-medium text-[19px] text-black">{category.title}</h3>
          </div>
        ))}
      </div>
      </Link>

    </div>
  );
};

export default CategorySelection;