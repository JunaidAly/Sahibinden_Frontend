// import React, { useState } from 'react';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import CommentForm from '../Home/CommentForm';
// import CategorySearch from './CategorySearch';
// const CategorySelectionDetails = () => {
//   const [selectedOption, setSelectedOption] = useState('Housing');

//   const categoryColumns = [
//     {
//       id: 1,
//       options: [
//         { id: 'housing', label: 'Housing', selected: true },
//         { id: 'workplace', label: 'Workplace', selected: false },
//         { id: 'plot', label: 'Plot', selected: false },
//         { id: 'housingProjects', label: 'Housing Projects', selected: false },
//         { id: 'building', label: 'Building', selected: false },
//         { id: 'timeshare', label: 'Timeshare', selected: false },
//         { id: 'touristFacility', label: 'Tourist Facility', selected: false },
//       ]
//     },
//     {
//       id: 2,
//       options: [
//         { id: 'forSale', label: 'For Sale', selected: true },
//         { id: 'forRent', label: 'For Rent', selected: false },
//         { id: 'touristDailyRental', label: 'Tourist Daily Rental', selected: false },
//         { id: 'housingForSale', label: 'Housing For Sale', selected: false },
//       ]
//     },
//     {
//       id: 3,
//       options: [
//         { id: 'apartment', label: 'Apartment', selected: true },
//         { id: 'residence', label: 'Residence', selected: false },
//         { id: 'familyHouse', label: 'Family House', selected: false },
//         { id: 'villa', label: 'Villa', selected: false },
//         { id: 'farmhouse', label: 'Farmhouse', selected: false },
//         { id: 'mansion', label: 'Mansion & Mansion', selected: false },
//         { id: 'watersideApartment', label: 'Waterside Apartment', selected: false },
//         { id: 'summery', label: 'Summery', selected: false },
//       ]
//     }
//   ];

//   const handleOptionClick = (columnId, optionId) => {
//     // Logic to handle option selection
//     console.log(`Selected: Column ${columnId}, Option ${optionId}`);
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="max-w-[1300px] mx-auto p-8 mt-10 font-poppins bg-white rounded-xl shadow-custom">
//       <h1 className="text-2xl font-[500] text-black mb-4">Step by Step Select Catgory</h1>
//       <h2 className="text-xl text-[#888F9F] text-[20px] font-[500] mb-6">Real Estate</h2>
      
//       <div className="flex flex-wrap items-center ">
//         {/* Category Columns */}
//         <div className="flex flex-wrap w-full  lg:w-3/4">
//           {categoryColumns.map((column) => (
//             <div key={column.id} className="w-[282px] sm:w-1/3 p-2">
//               <div className="bg-white h-[300px]  w-[282px] rounded-lg shadow-custom">
//                 <div className="space-y-3 p-4">
//                   {column.options.map((option) => (
//                     <div key={option.id} className="flex items-center  ">
//                       {option.selected ? (
//                         <div className="bg-[#1544AB] text-white py-1 px-4 ml-4 rounded-r-full text-sm font-medium w-[144px] h-[30px]">
//                           {option.label}
//                         </div>
//                       ) : (
//                         <div className="text-black px-4 text-sm font-medium w-full">
//                           {option.label}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Confirmation Section */}
//         <div className="w-full lg:w-1/4 p-2 flex flex-col items-center justify-center shadow-custom h-[300px]  rounded-lg">
//           <div className="w-[50px] h-[50px] bg-[#1544AB] rounded-full flex items-center justify-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <p className="text-center text-black font-medium mb-2 w-[164px]">Category Selection is Complete</p>
//           <button className="bg-[#1544AB]  text-white py-3 px-6 rounded-md font-medium w-[148px]">
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//     <CategorySearch/>
//     <CommentForm/>
//     <Footer/>
//     </>
//   );
// };

// export default CategorySelectionDetails;





import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CommentForm from '../Home/CommentForm';
import CategorySearch from './CategorySearch';

const CategorySelectionDetails = () => {
  const { categorySlug } = useParams();
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  // Define hierarchical category configurations
  const categoryConfigs = {
    "real-estate": {
      title: "Real Estate",
      level1: [
        { id: "housing", label: "Housing" },
        { id: "workplace", label: "Workplace" },
        { id: "plot", label: "Plot" },
        { id: "housingProjects", label: "Housing Projects" },
        { id: "building", label: "Building" },
        { id: "timeshare", label: "Timeshare" },
        { id: "housingforsale", label: "Tourist Facility" },
      ],
      level2: {
        housing: [
          { id: "forSale", label: "For Sale" },
          { id: "forRent", label: "For Rent" },
          { id: "touristDailyRental", label: "Tourist Daily Rental" },
          { id: "housingForSale", label: "Housing For Sale" },
        ],
        workplace: [
          { id: "officeForSale", label: "For Sale" },
          { id: "officeForRent", label: "For Rent" },
          { id: "officeForsale", label: "For sale" },
          { id: "subletForRent", label: "Sublet For Rent" },
        ],
        plot: [
          { id: "floorPlot", label: "For Sale in Exchange for Floor Plot" },
          { id: "forsale", label: "For sale" },
          { id: "forrent", label: "For rent" },
        ],
        housingProjects: [
          { id: "newProjects", label: "New Projects" },
          { id: "underConstruction", label: "Under Construction" },
          { id: "readyToMove", label: "Ready to Move" },
        ],
        building: [
          { id: "residentialBuilding", label: "Residential Building" },
          { id: "commercialBuilding", label: "Commercial Building" },
          { id: "mixedUse", label: "Mixed Use" },
        ],
        timeshare: [
          { id: "beach", label: "Beach Resort" },
          { id: "mountain", label: "Mountain Resort" },
          { id: "city", label: "City Resort" },
        ],
        touristFacility: [
          { id: "hotel", label: "Hotel" },
          { id: "resort", label: "Resort" },
          { id: "guesthouse", label: "Guest House" },
        ],
      },
      level3: {
        forSale: [
          { id: "apartment", label: "Apartment" },
          { id: "residence", label: "Residence" },
          { id: "familyHouse", label: "Family House" },
          { id: "villa", label: "Villa" },
          { id: "farmhouse", label: "Farmhouse" },
          { id: "mansion", label: "Mansion" },
          { id: "watersideApartment", label: "Waterside Apartment" },
          { id: "summery", label: "Summer House" },
        ],
        forRent: [
          { id: "apartment", label: "Apartment" },
          { id: "residence", label: "Residence" },
          { id: "familyHouse", label: "Family House" },
          { id: "villa", label: "Villa" },
          { id: "studio", label: "Studio" },
          { id: "sharedRoom", label: "Shared Room" },
        ],
        touristDailyRental: [
          { id: "apartment", label: "Apartment" },
          { id: "villa", label: "Villa" },
          { id: "summery", label: "Summer House" },
          { id: "cabin", label: "Cabin" },
        ],
        officeForRent: [
          { id: "fuelStation", label: "Fuel Station" },
          { id: "apartmentHouse", label: "Apartment House" },
          { id: "workshop", label: "Workshop" },
          { id: "shoppingMall", label: "Shopping Mall" },
          { id: "buffet", label: "Buffet" },
          { id: "bureauOffice", label: "Bureau & Office" },
          { id: "cafeBar", label: "Cafe & Bar" },
          { id: "farm", label: "Farm" },
          { id: "warehouseDepot", label: "Warehouse & Depot" },
          { id: "weddingHall", label: "Wedding Hall" },
          { id: "shopStore", label: "Shop & Store" },
          { id: "pharmacyMedical", label: "Pharmacy & Medical" },
          {
            id: "factoryProductionFacility",
            label: "Factory & Production Facility",
          },
          { id: "photoStudio", label: "Photo Studio" },
          { id: "garageParkingLot", label: "Garage & Parking Lot" },
          { id: "readyVirtualOffice", label: "Ready & Virtual Office" },
          {
            id: "businessCenterFloorOffice",
            label: "Business Center Floor & Office",
          },
          { id: "canteen", label: "Canteen" },
          { id: "countryBreakfastGarden", label: "Country & Breakfast Garden" },
          { id: "coffeehouse", label: "Coffeehouse" },
          { id: "completeBuilding", label: "Complete Building" },
          {
            id: "hairdresserBeautyCenter",
            label: "Hairdresser & Beauty Center",
          },
          { id: "mineQuarry", label: "Mine Quarry" },
          { id: "market", label: "Market" },
          { id: "surgery", label: "Surgery" },
          { id: "schoolCourse", label: "School & Course" },
          { id: "parking", label: "Parking" },
          { id: "carWashHairdresser", label: "Car Wash & Hairdresser" },
          {
            id: "patisserieBakeryDessert",
            label: "Patisserie & Bakery & Dessert",
          },
          { id: "marketplace", label: "Market place" },
          { id: "plaza", label: "Plaza" },
          { id: "plazaFloorOffice", label: "Plaza Floor & Office" },
          {
            id: "rehearsalRecordingStudio",
            label: "Rehearsal & Recording Studio",
          },
          { id: "radioStationTvChannel", label: "Radio Station & TV Channel" },
          { id: "restaurantDiner", label: "Restaurant & Diner" },
          { id: "residenceFloorOffice", label: "Residence Floor & Office" },
          { id: "healthCenter", label: "Health Center" },
          { id: "cinemaConferenceHall", label: "Cinema & Conference Hall" },
          { id: "spaTurkishBathSauna", label: "Spa, Turkish Bath & Sauna" },
          { id: "sportsFacility", label: "Sports Facility" },
          { id: "taxiStand", label: "Taxi Stand" },
          { id: "garage", label: "Garage" },
          { id: "villa", label: "Villa" },
          { id: "country", label: "Country" },
        ],
        officeForSale: [
          { id: "fuelStation", label: "Fuel Station" },
          { id: "apartmentHouse", label: "Apartment House" },
          { id: "workshop", label: "Workshop" },
          { id: "shoppingMall", label: "Shopping Mall" },
          { id: "buffet", label: "Buffet" },
          { id: "bureauOffice", label: "Bureau & Office" },
          { id: "cafeBar", label: "Cafe & Bar" },
          { id: "farm", label: "Farm" },
          { id: "warehouseDepot", label: "Warehouse & Depot" },
          { id: "weddingHall", label: "Wedding Hall" },
          { id: "shopStore", label: "Shop & Store" },
          { id: "pharmacyMedical", label: "Pharmacy & Medical" },
          {
            id: "factoryProductionFacility",
            label: "Factory & Production Facility",
          },
          { id: "photoStudio", label: "Photo Studio" },
          { id: "garageParkingLot", label: "Garage & Parking Lot" },
          { id: "readyVirtualOffice", label: "Ready & Virtual Office" },
          {
            id: "businessCenterFloorOffice",
            label: "Business Center Floor & Office",
          },
          { id: "canteen", label: "Canteen" },
          { id: "countryBreakfastGarden", label: "Country & Breakfast Garden" },
          { id: "coffeehouse", label: "Coffeehouse" },
          { id: "completeBuilding", label: "Complete Building" },
          {
            id: "hairdresserBeautyCenter",
            label: "Hairdresser & Beauty Center",
          },
          { id: "mineQuarry", label: "Mine Quarry" },
          { id: "market", label: "Market" },
          { id: "surgery", label: "Surgery" },
          { id: "schoolCourse", label: "School & Course" },
          { id: "parking", label: "Parking" },
          { id: "carWashHairdresser", label: "Car Wash & Hairdresser" },
          {
            id: "patisserieBakeryDessert",
            label: "Patisserie & Bakery & Dessert",
          },
          { id: "marketplace", label: "Market place" },
          { id: "plaza", label: "Plaza" },
          { id: "plazaFloorOffice", label: "Plaza Floor & Office" },
          {
            id: "rehearsalRecordingStudio",
            label: "Rehearsal & Recording Studio",
          },
          { id: "radioStationTvChannel", label: "Radio Station & TV Channel" },
          { id: "restaurantDiner", label: "Restaurant & Diner" },
          { id: "residenceFloorOffice", label: "Residence Floor & Office" },
          { id: "healthCenter", label: "Health Center" },
          { id: "cinemaConferenceHall", label: "Cinema & Conference Hall" },
          { id: "spaTurkishBathSauna", label: "Spa, Turkish Bath & Sauna" },
          { id: "sportsFacility", label: "Sports Facility" },
          { id: "taxiStand", label: "Taxi Stand" },
          { id: "garage", label: "Garage" },
          { id: "villa", label: "Villa" },
          { id: "country", label: "Country" },
        ],
        officeForsale: [
          { id: "privateOffice", label: "Private Office" },
          { id: "agency", label: "Agency" },
          { id: "fuelStation", label: "Fuel Station" },
          { id: "herbSpiceShop", label: "Herb & Spice Shop" },
          { id: "kindergartenNursery", label: "Kindergarten & Nursery" },
          { id: "apartmentHouse", label: "Apartment House" },
          { id: "vehicleShowroomService", label: "Vehicle Showroom & Service" },
          { id: "workshop", label: "Workshop" },
          { id: "shoppingMallStand", label: "Shopping Mall Stand" },
          { id: "fisherman", label: "Fisherman" },
          { id: "bar", label: "Bar" },
          { id: "bijouterie", label: "Bijouterie" },
          { id: "tuckshop", label: "Tuckshop" },
          { id: "buffet", label: "Buffet" },
          { id: "bureauOffice", label: "Bureau & Office" },
          { id: "cafe", label: "Cafe" },
          { id: "cdDvdStore", label: "CD & DVD Store" },
          { id: "mobilePhoneShop", label: "Mobile Phone Shop" },
          { id: "laundry", label: "Laundry" },
          { id: "teaHouse", label: "Tea House" },
          { id: "floristNursery", label: "Florist & Nursery" },
          { id: "farm", label: "Farm" },
          { id: "warehouseDepot", label: "Warehouse & Depot" },
          { id: "weddingHall", label: "Wedding Hall" },
          { id: "shopStore", label: "Shop & Store" },
          { id: "pharmacyMedical", label: "Pharmacy & Medical" },
          {
            id: "electricianHardwareStore",
            label: "Electrician & Hardware Store",
          },
          { id: "electronicsStore", label: "Electronics Store" },
          {
            id: "factoryProductionFacility",
            label: "Factory & Production Facility",
          },
          { id: "billingCenter", label: "Billing Center" },
          { id: "photoStudio", label: "Photo Studio" },
          { id: "nightClubDisco", label: "Night Club & Disco" },
          { id: "clothingStore", label: "Clothing Store" },
          { id: "optician", label: "Optician" },
          { id: "carpetWashing", label: "Carpet Washing" },
          { id: "nursingHome", label: "Nursing Home" },
          { id: "workshop2", label: "Workshop" },
          { id: "internetGameCafe", label: "Internet & Game Cafe" },
          { id: "businessCenter", label: "Business Center" },
          {
            id: "businessCenterFloorOffice",
            label: "Business Center Floor & Office",
          },
          { id: "butcher", label: "Butcher" },
          { id: "countryBreakfastGarden", label: "Country & Breakfast Garden" },
          { id: "coffeehouse", label: "Coffeehouse" },
          { id: "stationery", label: "Stationery" },
          { id: "cosmeticsStore", label: "Cosmetics Store" },
          {
            id: "hairdresserBeautyCenter",
            label: "Hairdresser & Beauty Center",
          },
          { id: "courseTrainingCenter", label: "Course & Training Center" },
          { id: "dryCleaning", label: "Dry Cleaning" },
          { id: "nutsSeller", label: "Nuts Seller" },
          { id: "jeweler", label: "Jeweler" },
          { id: "themePark", label: "Theme park" },
          { id: "mineQuarry", label: "Mine Quarry" },
          { id: "greengrocer", label: "Greengrocer" },
          { id: "market", label: "Market" },
          { id: "printingPress", label: "Printing press" },
          { id: "medicalMarket", label: "Medical Market" },
          { id: "fashionHouse", label: "Fashion House" },
          { id: "surgery", label: "Surgery" },
          { id: "shippingCargo", label: "Shipping & Cargo" },
          { id: "hardware", label: "Hardware" },
          { id: "schoolCourse", label: "School & Course" },
          { id: "parkingGarage", label: "Parking & Garage" },
          { id: "autoServiceMaintenance", label: "Auto Service & Maintenance" },
          { id: "autoSpareParts", label: "Auto Spare Parts" },
          { id: "carWashHairdresser", label: "Car Wash & Hairdresser" },
          { id: "studentDormitory", label: "Student Dormitory" },
          {
            id: "patisserieBakeryDessert",
            label: "Patisserie, Bakery & Dessert",
          },
          { id: "marketplace", label: "Market place" },
          { id: "petShop", label: "Pet Shop" },
          { id: "plaza", label: "Plaza" },
          { id: "plazaFloorOffice", label: "Plaza Floor & Office" },
          {
            id: "rehearsalRecordingStudio",
            label: "Rehearsal & Recording Studio",
          },
          { id: "radioStationTvChannel", label: "Radio Station & TV Channel" },
          { id: "restaurantDiner", label: "Restaurant & Diner" },
          { id: "residenceFloorOffice", label: "Residence Floor & Office" },
          { id: "watchShop", label: "Watch Shop" },
          { id: "healthCenter", label: "Health Center" },
          { id: "vegetableFruitMarket", label: "Vegetable & Fruit Market" },
          { id: "cinemaConferenceHall", label: "Cinema & Conference Hall" },
          { id: "coldStorage", label: "Cold Storage" },
          { id: "spaTurkishBathSauna", label: "SPA, Turkish Bath & Sauna" },
          { id: "sportsFacility", label: "Sports Facility" },
          { id: "waterTubeDealer", label: "Water & Tube Dealer" },
          { id: "gamesOfChanceDealer", label: "Games of Chance Dealer" },
          { id: "delicatessen", label: "Delicatessen" },
          { id: "taxiStand", label: "Taxi Stand" },
          { id: "garage", label: "Garage" },
          { id: "monopolyDealer", label: "Monopoly Dealer" },
          { id: "technicalService", label: "Technical Service" },
          { id: "tailor", label: "Tailor" },
          { id: "haberdashery", label: "Haberdashery" },
          { id: "toilet", label: "Toilet" },
          { id: "vet", label: "Vet" },
          { id: "glassware", label: "Glassware" },
        ],
        subletForRent: [
          { id: "privateOffice", label: "Private Office" },
          { id: "agency", label: "Agency" },
          { id: "fuelStation", label: "Fuel Station" },
          { id: "herbSpiceShop", label: "Herb & Spice Shop" },
          { id: "kindergartenNursery", label: "Kindergarten & Nursery" },
          { id: "apartmentHouse", label: "Apartment House" },
          { id: "vehicleShowroomService", label: "Vehicle Showroom & Service" },
          { id: "workshop", label: "Workshop" },
          { id: "shoppingMallStand", label: "Shopping Mall Stand" },
          { id: "fisherman", label: "Fisherman" },
          { id: "bar", label: "Bar" },
          { id: "bijouterie", label: "Bijouterie" },
          { id: "tuckshop", label: "Tuckshop" },
          { id: "buffet", label: "Buffet" },
          { id: "bureauOffice", label: "Bureau & Office" },
          { id: "cafe", label: "Cafe" },
          { id: "cdDvdStore", label: "CD & DVD Store" },
          { id: "mobilePhoneShop", label: "Mobile Phone Shop" },
          { id: "laundry", label: "Laundry" },
          { id: "teaHouse", label: "Tea House" },
          { id: "floristNursery", label: "Florist & Nursery" },
          { id: "farm", label: "Farm" },
          { id: "warehouseDepot", label: "Warehouse & Depot" },
          { id: "weddingHall", label: "Wedding Hall" },
          { id: "shopStore", label: "Shop & Store" },
          { id: "pharmacyMedical", label: "Pharmacy & Medical" },
          {
            id: "electricianHardwareStore",
            label: "Electrician & Hardware Store",
          },
          { id: "electronicsStore", label: "Electronics Store" },
          {
            id: "factoryProductionFacility",
            label: "Factory & Production Facility",
          },
          { id: "billingCenter", label: "Billing Center" },
          { id: "photoStudio", label: "Photo Studio" },
          { id: "nightClubDisco", label: "Night Club & Disco" },
          { id: "clothingStore", label: "Clothing Store" },
          { id: "optician", label: "Optician" },
          { id: "carpetWashing", label: "Carpet Washing" },
          { id: "nursingHome", label: "Nursing Home" },
          { id: "workshop2", label: "Workshop" },
          { id: "internetGameCafe", label: "Internet & Game Cafe" },
          { id: "businessCenter", label: "Business Center" },
          {
            id: "businessCenterFloorOffice",
            label: "Business Center Floor & Office",
          },
          { id: "butcher", label: "Butcher" },
          { id: "countryBreakfastGarden", label: "Country & Breakfast Garden" },
          { id: "coffeehouse", label: "Coffeehouse" },
          { id: "stationery", label: "Stationery" },
          { id: "cosmeticsStore", label: "Cosmetics Store" },
          {
            id: "hairdresserBeautyCenter",
            label: "Hairdresser & Beauty Center",
          },
          { id: "courseTrainingCenter", label: "Course & Training Center" },
          { id: "dryCleaning", label: "Dry Cleaning" },
          { id: "nutsSeller", label: "Nuts Seller" },
          { id: "jeweler", label: "Jeweler" },
          { id: "themePark", label: "Theme park" },
          { id: "mineQuarry", label: "Mine Quarry" },
          { id: "greengrocer", label: "Greengrocer" },
          { id: "market", label: "Market" },
          { id: "printingPress", label: "Printing press" },
          { id: "medicalMarket", label: "Medical Market" },
          { id: "fashionHouse", label: "Fashion House" },
          { id: "surgery", label: "Surgery" },
          { id: "shippingCargo", label: "Shipping & Cargo" },
          { id: "hardware", label: "Hardware" },
          { id: "schoolCourse", label: "School & Course" },
          { id: "parkingGarage", label: "Parking & Garage" },
          { id: "autoServiceMaintenance", label: "Auto Service & Maintenance" },
          { id: "autoSpareParts", label: "Auto Spare Parts" },
          { id: "carWashHairdresser", label: "Car Wash & Hairdresser" },
          { id: "studentDormitory", label: "Student Dormitory" },
          {
            id: "patisserieBakeryDessert",
            label: "Patisserie, Bakery & Dessert",
          },
          { id: "marketplace", label: "Market place" },
          { id: "petShop", label: "Pet Shop" },
          { id: "plaza", label: "Plaza" },
          { id: "plazaFloorOffice", label: "Plaza Floor & Office" },
          {
            id: "rehearsalRecordingStudio",
            label: "Rehearsal & Recording Studio",
          },
          { id: "radioStationTvChannel", label: "Radio Station & TV Channel" },
          { id: "restaurantDiner", label: "Restaurant & Diner" },
          { id: "residenceFloorOffice", label: "Residence Floor & Office" },
          { id: "watchShop", label: "Watch Shop" },
          { id: "healthCenter", label: "Health Center" },
          { id: "vegetableFruitMarket", label: "Vegetable & Fruit Market" },
          { id: "cinemaConferenceHall", label: "Cinema & Conference Hall" },
          { id: "coldStorage", label: "Cold Storage" },
          { id: "spaTurkishBathSauna", label: "SPA, Turkish Bath & Sauna" },
          { id: "sportsFacility", label: "Sports Facility" },
          { id: "waterTubeDealer", label: "Water & Tube Dealer" },
          { id: "gamesOfChanceDealer", label: "Games of Chance Dealer" },
          { id: "delicatessen", label: "Delicatessen" },
          { id: "taxiStand", label: "Taxi Stand" },
          { id: "garage", label: "Garage" },
          { id: "monopolyDealer", label: "Monopoly Dealer" },
          { id: "technicalService", label: "Technical Service" },
          { id: "tailor", label: "Tailor" },
          { id: "haberdashery", label: "Haberdashery" },
          { id: "toilet", label: "Toilet" },
          { id: "vet", label: "Vet" },
          { id: "glassware", label: "Glassware" },
        ],
        housingForSale: [
          { id: "apartment", label: "Apartment" },
          { id: "villa", label: "Villa" },
        ],
        // Add more level3 options for other level2 categories...
      },
    },
    vehicle: {
      title: "Vehicle",
      level1: [
        { id: "car", label: "Car" },
        { id: "motorcycle", label: "Motorcycle" },
        { id: "truck", label: "Truck" },
        { id: "bus", label: "Bus" },
        { id: "bicycle", label: "Bicycle" },
        { id: "boat", label: "Boat" },
      ],
      level2: {
        car: [
          { id: "forSale", label: "For Sale" },
          { id: "forRent", label: "For Rent" },
          { id: "lease", label: "Lease" },
        ],
        motorcycle: [
          { id: "forSale", label: "For Sale" },
          { id: "forRent", label: "For Rent" },
        ],
        truck: [
          { id: "forSale", label: "For Sale" },
          { id: "forRent", label: "For Rent" },
          { id: "lease", label: "Lease" },
        ],
        // Add more...
      },
      level3: {
        forSale: [
          { id: "sedan", label: "Sedan" },
          { id: "suv", label: "SUV" },
          { id: "hatchback", label: "Hatchback" },
          { id: "coupe", label: "Coupe" },
          { id: "convertible", label: "Convertible" },
          { id: "pickup", label: "Pickup" },
        ],
        forRent: [
          { id: "economy", label: "Economy" },
          { id: "luxury", label: "Luxury" },
          { id: "suv", label: "SUV" },
          { id: "van", label: "Van" },
        ],
        // Add more...
      },
    },
    "spare-parts": {
      title: "Spare Parts, Accessories, Hardware & Tuning",
      level1: [
        { id: "carParts", label: "Car Parts" },
        { id: "motorcycleParts", label: "Motorcycle Parts" },
        { id: "truckParts", label: "Truck Parts" },
        { id: "accessories", label: "Accessories" },
        { id: "tools", label: "Tools" },
      ],
      level2: {
        carParts: [
          { id: "engine", label: "Engine Parts" },
          { id: "body", label: "Body Parts" },
          { id: "electrical", label: "Electrical" },
          { id: "interior", label: "Interior" },
          { id: "suspension", label: "Suspension" },
        ],
        motorcycleParts: [
          { id: "engine", label: "Engine Parts" },
          { id: "body", label: "Body Parts" },
          { id: "electrical", label: "Electrical" },
        ],
        // Add more...
      },
      level3: {
        engine: [
          { id: "pistons", label: "Pistons" },
          { id: "valves", label: "Valves" },
          { id: "filters", label: "Filters" },
          { id: "belts", label: "Belts" },
        ],
        body: [
          { id: "bumpers", label: "Bumpers" },
          { id: "doors", label: "Doors" },
          { id: "lights", label: "Lights" },
          { id: "mirrors", label: "Mirrors" },
        ],
        // Add more...
      },
    },
    shopping: {
      title: "Second Hand And New Shopping",
      level1: [
        { id: "electronics", label: "Electronics" },
        { id: "clothing", label: "Clothing" },
        { id: "furniture", label: "Furniture" },
        { id: "books", label: "Books" },
        { id: "toys", label: "Toys" },
        { id: "sports", label: "Sports & Outdoors" },
      ],
      level2: {
        electronics: [
          { id: "mobile", label: "Mobile Phones" },
          { id: "computers", label: "Computers" },
          { id: "gaming", label: "Gaming" },
          { id: "appliances", label: "Home Appliances" },
        ],
        clothing: [
          { id: "mens", label: "Men's Clothing" },
          { id: "womens", label: "Women's Clothing" },
          { id: "kids", label: "Kids Clothing" },
          { id: "shoes", label: "Shoes" },
        ],
        // Add more...
      },
      level3: {
        mobile: [
          { id: "smartphone", label: "Smartphone" },
          { id: "feature", label: "Feature Phone" },
          { id: "accessories", label: "Accessories" },
        ],
        computers: [
          { id: "laptop", label: "Laptop" },
          { id: "desktop", label: "Desktop" },
          { id: "tablet", label: "Tablet" },
          { id: "accessories", label: "Accessories" },
        ],
        // Add more...
      },
    },
    // Default fallback
    default: {
      title: "Category Details",
      level1: [
        { id: "option1", label: "Option 1" },
        { id: "option2", label: "Option 2" },
        { id: "option3", label: "Option 3" },
      ],
      level2: {
        option1: [
          { id: "sub1", label: "Sub Option 1" },
          { id: "sub2", label: "Sub Option 2" },
        ],
      },
      level3: {
        sub1: [
          { id: "subsub1", label: "Sub Sub Option 1" },
          { id: "subsub2", label: "Sub Sub Option 2" },
        ],
      },
    },
  };

  useEffect(() => {
    // Set category data based on slug
    const config = categoryConfigs[categorySlug] || categoryConfigs['default'];
    setCategoryData(config);
    
    // Reset selections when category changes
    setSelectedLevel1(null);
    setSelectedLevel2(null);
    setSelectedLevel3(null);
  }, [categorySlug]);

  const handleLevel1Click = (optionId) => {
    setSelectedLevel1(optionId);
    setSelectedLevel2(null); // Reset level 2 selection
    setSelectedLevel3(null); // Reset level 3 selection
  };

  const handleLevel2Click = (optionId) => {
    setSelectedLevel2(optionId);
    setSelectedLevel3(null); // Reset level 3 selection
  };

  const handleLevel3Click = (optionId) => {
    setSelectedLevel3(optionId);
  };

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  // Get current level options
  const level1Options = categoryData.level1 || [];
  const level2Options = selectedLevel1 ? (categoryData.level2?.[selectedLevel1] || []) : [];
  const level3Options = selectedLevel2 ? (categoryData.level3?.[selectedLevel2] || []) : [];

  // Check if selection is complete
  const isSelectionComplete = selectedLevel1 && selectedLevel2 && (level3Options.length === 0 || selectedLevel3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1300px] mx-auto p-8 mt-10 font-poppins bg-white rounded-xl shadow-custom">
        <h1 className="text-2xl font-[500] text-black mb-4">Step by Step Select Category</h1>
        <h2 className="text-xl text-[#888F9F] text-[20px] font-[500] mb-6">{categoryData.title}</h2>
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span>{categoryData.title}</span>
          {selectedLevel1 && (
            <>
              <span className="mx-2">→</span>
              <span className="text-blue-600">{level1Options.find(opt => opt.id === selectedLevel1)?.label}</span>
            </>
          )}
          {selectedLevel2 && (
            <>
              <span className="mx-2">→</span>
              <span className="text-blue-600">{level2Options.find(opt => opt.id === selectedLevel2)?.label}</span>
            </>
          )}
          {selectedLevel3 && (
            <>
              <span className="mx-2">→</span>
              <span className="text-blue-600">{level3Options.find(opt => opt.id === selectedLevel3)?.label}</span>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap items-start">
          {/* Category Columns */}
          <div className="flex flex-wrap w-full lg:w-3/4 gap-4">
            
            {/* Level 1 Column */}
            <div className="w-[282px] p-2">
              <div className="bg-white rounded-lg shadow-custom">
                <div className="p-4 bg-blue-50 rounded-t-lg">
                  <h3 className="font-medium text-gray-800">Select Category</h3>
                </div>
                <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
                  {level1Options.map((option) => (
                    <div 
                      key={option.id} 
                      className="flex items-center cursor-pointer py-2 px-2 rounded hover:bg-gray-50"
                      onClick={() => handleLevel1Click(option.id)}
                    >
                      {selectedLevel1 === option.id ? (
                        <div className="bg-[#1544AB] text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center">
                          {option.label}
                        </div>
                      ) : (
                        <div className="text-black text-sm font-medium w-full hover:text-[#1544AB] transition-colors">
                          {option.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level 2 Column */}
            {level2Options.length > 0 && (
              <div className="w-[282px] p-2">
                <div className="bg-white rounded-lg shadow-custom">
                  <div className="p-4 bg-blue-50 rounded-t-lg">
                    <h3 className="font-medium text-gray-800">Select Type</h3>
                  </div>
                  <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
                    {level2Options.map((option) => (
                      <div 
                        key={option.id} 
                        className="flex items-center cursor-pointer py-2 px-2 rounded hover:bg-gray-50"
                        onClick={() => handleLevel2Click(option.id)}
                      >
                        {selectedLevel2 === option.id ? (
                          <div className="bg-[#1544AB] text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center">
                            {option.label}
                          </div>
                        ) : (
                          <div className="text-black text-sm font-medium w-full hover:text-[#1544AB] transition-colors">
                            {option.label}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Level 3 Column */}
            {level3Options.length > 0 && (
              <div className="w-[282px] p-2">
                <div className="bg-white rounded-lg shadow-custom">
                  <div className="p-4 bg-blue-50 rounded-t-lg">
                    <h3 className="font-medium text-gray-800">Select Subtype</h3>
                  </div>
                  <div className="space-y-1 p-4 max-h-[300px] overflow-y-auto">
                    {level3Options.map((option) => (
                      <div 
                        key={option.id} 
                        className="flex items-center cursor-pointer py-2 px-2 rounded hover:bg-gray-50"
                        onClick={() => handleLevel3Click(option.id)}
                      >
                        {selectedLevel3 === option.id ? (
                          <div className="bg-[#1544AB] text-white py-2 px-4 rounded-r-full text-sm font-medium w-full text-center">
                            {option.label}
                          </div>
                        ) : (
                          <div className="text-black text-sm font-medium w-full hover:text-[#1544AB] transition-colors">
                            {option.label}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Confirmation Section */}
          <div className="w-full lg:w-1/4 p-2 flex flex-col items-center justify-center shadow-custom h-[300px] rounded-lg">
            <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
              isSelectionComplete ? 'bg-[#1544AB]' : 'bg-gray-300'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-center text-black font-medium mb-2 w-[164px]">
              {isSelectionComplete ? 'Category Selection is Complete' : 'Please select all required options'}
            </p>
            <button 
              className={`text-white py-3 px-6 rounded-md font-medium w-[148px] transition-colors ${
                isSelectionComplete 
                  ? 'bg-[#1544AB] hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isSelectionComplete}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <CategorySearch/>
      <CommentForm/>
      <Footer/>
    </div>
  );
};

export default CategorySelectionDetails;