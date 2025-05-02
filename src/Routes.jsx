import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import PostAnAdd from "./Pages/PostAnAdd";
import CategorySelectionDetails from "./Components/AddAnPost/CategorySelectionDetails";
import CategoriesCars from "./Components/Home/CategoriesCars";
import CategoriesCellPhones from "./Components/Home/CategoriesCellPhones";
import AdManagement from "./Pages/AdManagement";
import BuyNow from "./Components/AdManagement/BuyNow";
import Auto360 from "./Components/Auto360";
import VehicleComparisonComponent from "./Components/WhileBuying/VehicleComparisonComponent";
import VehicleValuationComponent from "./Components/WhileBuying/VehicleValuation";
import VehicleDamageInquiry from "./Components/WhileBuying/VehicleDamageInquiry";
const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/", element: <Home/> },
        { path: "/ad-details", element: <AdDetails/> },
        { path: "/post-an-add", element: <PostAnAdd/> },   
        { path: "/category-selection-details", element: <CategorySelectionDetails/> }, 
        { path: "/categories-cars", element: <CategoriesCars/> },
        { path: "/categories-cell-phones", element: <CategoriesCellPhones/> },
        { path: "/ad-management", element: <AdManagement/> },
        { path: "/buy-now", element: <BuyNow/> },
        { path: "/auto-360", element: <Auto360/> },
        { path: "/vehicle-comparison", element: <VehicleComparisonComponent/> },
        { path: "/vehicle-valuation", element: <VehicleValuationComponent/> },
        { path: "/vehicle-damage-inquiry", element: <VehicleDamageInquiry/> },
    ]);
    return element;
  };
  export default ProjectRoutes;
  