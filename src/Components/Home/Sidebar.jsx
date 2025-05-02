import React, { useState } from "react";
import { Link } from "react-router";
const Sidebar = () => {
  // State to track which categories are expanded
  const [expanded, setExpanded] = useState({
    auto: false,
    realEstate: true,
    constructionMachinery: false,
    secondHand: false,
    spareParts: false,
    vehicle: false,
    helpSeekers: true,
    animalKingdom: true,
    jobPostings: false,
    privateTutors: false,
    craftsmen: false,
  });

  // State for checkboxes (only for Help Seekers in this example)
  const [checked, setChecked] = useState({
    babysitter: false,
    elderly: false,
    cleaner: false,
  });

  // Toggle expanded state for a category
  const toggleExpand = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (checkboxName) => {
    setChecked((prev) => ({
      ...prev,
      [checkboxName]: !prev[checkboxName],
    }));
  };

  const imgSrchelp = <img src="/assets/sidebar/help.svg" alt="" />;
  const imgSrcCons = <img src="/assets/sidebar/construction.svg" alt="" />;
  const imgSrcAnimal = <img src="/assets/sidebar/animal.svg" alt="" />;
  const imgSrcAuto = <img src="/assets/sidebar/auto.svg" alt="" />;
  const imgSrcVehicle = <img src="/assets/sidebar/vehicle.svg" alt="" />;
  const imgSrcCraft = <img src="/assets/sidebar/craftsman.svg" alt="" />;
  const imgSrcHouse = <img src="/assets/sidebar/house.svg" alt="" />;
  const imgSrcJob = <img src="/assets/sidebar/job.svg" alt="" />;
  const imgSrcPrivate = <img src="/assets/private/help.svg" alt="" />;
  const imgSrcHand = <img src="/assets/private/hand.svg" alt="" />;
  const imgSrcSpare = <img src="/assets/private/spare.svg" alt="" />;

  return (
    <div className="w-64 bg-white shadow-custom h-full overflow-y-auto font-poppins">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-[#1544AB] font-monrope mb-4">
          Categories
        </h2>

        <ul className="space-y-5">
          {/* Original Categories */}
          <CategoryItem icon={imgSrcHouse} label="Urgent" />
          <CategoryItem icon={imgSrcHouse} label="Last 48 Hours / 1 Week" />
          <Link to={"/categories-cell-phones"}><CategoryItem icon={imgSrcHouse} label="Refurbished Devices With" /></Link>

          {/* Auto360 Category */}
          <li className="text-[#231E1C] font-[500] text-[18px]">
            <Link to={"/auto-360"}><CategoryHeader icon={imgSrcAuto} label="Auto360" /></Link>
            <ul className="ml-8 mt-2 space-y-3">
              <li className="text-[#231E1C] font-[400] font-monrope text-[15px]">Auto Expertise</li>
            </ul>
            <ToggleButton
              expanded={expanded.auto}
              onClick={() => toggleExpand("auto")}
            />
          </li>

          {/* Real Estate Categories */}
          <CategoryItem icon={imgSrcHouse} label="Real Estate360" />
          <li>
            <CategoryHeader
              icon={imgSrcHouse}
              label="Real Estate"
              count="766986"
            />
            {expanded.realEstate && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem label="Housing" count="766986" />
                <SubcategoryItem label="Workplace" count="766986" />
                <SubcategoryItem label="Land" count="766986" />
                <SubcategoryItem label="Housing Projects" count="766986" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.realEstate}
              onClick={() => toggleExpand("realEstate")}
            />
          </li>

          {/* Vehicle Category */}
          <li>
            <CategoryHeader
              icon={imgSrcVehicle}
              label="Vehicle"
              count="766986"
            />
            {expanded.vehicle && (
              <ul className="ml-8 mt-2 space-y-3">
                <Link to={"/categories-cars"}> <SubcategoryItem label="Cars" count="766986" /></Link>  
                <SubcategoryItem label="Off-Road" count="766986" />
                <SubcategoryItem label="Motorcycle" count="766986" />
                <SubcategoryItem label="Minivan & Panel Van" count="766986" />
                <SubcategoryItem label="Commercial Vehicles" count="766986" />
                <SubcategoryItem label="Electric Vehicles" count="766986" />
                <SubcategoryItem label="Rental Cars" count="766986" />
                <SubcategoryItem label="Marine Vehicles" count="766986" />
                <SubcategoryItem label="Damaged Vehicles" count="766986" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.vehicle}
              onClick={() => toggleExpand("vehicle")}
            />
          </li>

          {/* Spare Parts Category */}
          <li>
            <CategoryHeader
              icon={imgSrcSpare}
              label="Spare Parts, Accessories"
              count="766986"
            />
            {expanded.spareParts && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem label="Automotive Equipment" count="766986" />
                <SubcategoryItem label="Motorcycle Equipment" count="766986" />
                <SubcategoryItem label="Marine Equipment" count="766986" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.spareParts}
              onClick={() => toggleExpand("spareParts")}
            />
          </li>

          {/* Second Hand Category */}
          <li>
            <CategoryHeader
              icon={imgSrcHand}
              label="Second Hand and New Shop"
              count="766986"
            />
            {expanded.secondHand && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem label="Computer" count="766986" />
                <SubcategoryItem
                  label="Mobile Phone & Accessories"
                  count="766986"
                />
                <SubcategoryItem label="Photo & Camera" count="766986" />
                <SubcategoryItem label="Home Decoration" count="766986" />
                <SubcategoryItem label="Home Electronics" count="766986" />
                <SubcategoryItem label="Electrical Appliances" count="766986" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.secondHand}
              onClick={() => toggleExpand("secondHand")}
            />
          </li>

          {/* Brand New Category */}
          <li>
            <CategoryHeader
              icon={imgSrcVehicle}
              label="Brand New"
              count="766986"
            />
            <ul className="ml-8 mt-2 space-y-3">
              <SubcategoryItem
                label="Brand new technological Devices"
                count="76"
              />
            </ul>
          </li>

          {/* Construction Machinery Category */}
          <li>
            <CategoryHeader
              icon={imgSrcCons}
              label="Construction Machinery"
              count="766986"
            />
            {expanded.constructionMachinery && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem
                  label="Construction Machinery"
                  count="766986"
                />
                <SubcategoryItem
                  label="Agricultural Machinery"
                  count="766986"
                />
                <SubcategoryItem label="Electricity & Energy" count="766986" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.constructionMachinery}
              onClick={() => toggleExpand("constructionMachinery")}
            />
          </li>

          {/* Craftsmen & Services Category */}
          <li>
            <CategoryHeader
              icon={imgSrcCraft}
              label="Craftsmen & Services"
              count="766986"
            />
            {expanded.craftsmen && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem label="Home Renovation & Decoration" />
                <SubcategoryItem label="Vehicle Service & Maintenance" />
                <SubcategoryItem label="Repair & Technical Service" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.craftsmen}
              onClick={() => toggleExpand("craftsmen")}
            />
          </li>

          {/* Private Tutors Category */}
          <li>
            <CategoryHeader
              icon={imgSrcPrivate}
              label="Private Tutors"
              count="766986"
            />
            {expanded.privateTutors && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem label="High School and College" count="56" />
                <SubcategoryItem
                  label="Primary & Secondary School"
                  count="67"
                />
                <SubcategoryItem label="Foreign Language" count="78" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.privateTutors}
              onClick={() => toggleExpand("privateTutors")}
            />
          </li>

          {/* Job Postings Category */}
          <li>
            <CategoryHeader
              icon={imgSrcJob}
              label="Job Postings"
              count="766986"
            />
            {expanded.jobPostings && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem
                  label="Advocacy & Legal Consultancy"
                  count="56"
                />
                <SubcategoryItem label="Education" count="67" />
                <SubcategoryItem label="Fun & Activities" count="78" />
                <SubcategoryItem label="Beauty & Care" count="99" />
                <SubcategoryItem label="IT & Software Development" count="74" />
                <SubcategoryItem label="Human Resources" count="74" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.jobPostings}
              onClick={() => toggleExpand("jobPostings")}
            />
          </li>

          {/* Animal Kingdom Category */}
          <li>
            <CategoryHeader
              icon={imgSrcAnimal}
              label="Animal Kingdom"
              count="766986"
            />
            {expanded.animalKingdom && (
              <ul className="ml-8 mt-2 space-y-3">
                <SubcategoryItem label="Pets" count="56" />
                <SubcategoryItem label="Aquarium Fish" count="67" />
                <SubcategoryItem label="Accessories" count="78" />
                <SubcategoryItem label="Care Products" count="99" />
                <SubcategoryItem label="Food & Feed" count="74" />
                <SubcategoryItem label="Poultry" count="74" />
                <SubcategoryItem label="Cattle" count="74" />
                <SubcategoryItem label="Small Livestock" count="74" />
                <SubcategoryItem label="Marine Creatures" count="74" />
              </ul>
            )}
            <ToggleButton
              expanded={expanded.animalKingdom}
              onClick={() => toggleExpand("animalKingdom")}
            />
          </li>

          {/* Help Seekers Category with Checkboxes */}
          <li>
            <CategoryHeader
              icon={imgSrchelp}
              label="Help Seekers"
              count="766986"
            />
            {expanded.helpSeekers && (
              <ul className="ml-8 mt-2 space-y-3">
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id="babysitter"
                    className="mr-2 h-4 w-4 border-[#1544AB] "
                    checked={checked.babysitter}
                    onChange={() => handleCheckboxChange("babysitter")}
                  />
                  <label htmlFor="babysitter" className="text-[#231E1C] font-monrope text-[15px] font-[400]">
                    Babysitter & Nanny
                    <span className="text-[12px]">(56)</span>
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id="elderly"
                    className="mr-2 h-4 w-5 border-[#1544AB]"
                    checked={checked.elderly}
                    onChange={() => handleCheckboxChange("elderly")}
                  />
                  <label htmlFor="elderly" className="text-[#231E1C] font-monrope text-[15px] font-[400]">
                    Elderly & Patient Caregiver
                    <span className="text-[12px]">(67)</span>
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id="cleaner"
                    className="mr-2 h-4 w-5 border-[#1544AB]"
                    checked={checked.cleaner}
                    onChange={() => handleCheckboxChange("cleaner")}
                  />
                  <label htmlFor="cleaner" className="text-[#231E1C] font-monrope text-[15px] font-[400]">
                    Cleaner & Housekeeper
                    <span className="text-[12px]">(78)</span>
                  </label>
                </li>
              </ul>
            )}
            <ToggleButton
              expanded={expanded.helpSeekers}
              onClick={() => toggleExpand("helpSeekers")}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

// Category item with icon and label
const CategoryItem = ({ icon, label }) => (
  <li>
    <div className="flex items-center py-2">
      <span className="mr-3 w-6">{icon}</span>
      <span className="text-gray-800 font-medium">{label}</span>
    </div>
  </li>
);

// Category header with icon, label and optional count
const CategoryHeader = ({ icon, label, count }) => (
  <div className="flex items-center py-2">
    <span className="mr-3 w-6">{icon}</span>
    <span className="text-[#231E1C] font-medium font-poppins text-[18px]">
      {label}
      {count && <span className=" text-[12px]">({count})</span>}
    </span>
  </div>
);

// Subcategory item with label and count
const SubcategoryItem = ({ label, count }) => (
  <li className="text-[#231E1C] font-[400] font-monrope text-[15px]">
    {label}
    {count && <span className="text-[12px]">({count})</span>}
  </li>
);

// Toggle button for expanding/collapsing categories
const ToggleButton = ({ expanded, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center ml-8 mt-2 mb-2 text-[#231E1C] font-[400] font-monrope text-[18px]"
  >
    Show All
    <svg
      className={`ml-1 w-4 h-4 fill-current text-blue-700 transform ${
        expanded ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
    >
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </button>
);

export default Sidebar;
