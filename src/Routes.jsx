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
import PastQueries from "./Components/WhileBuying/PastQueries";
import AutoExpertise from "./Components/Auto360/index"
import WhileBuyingGuide from "./Components/WhileBuying/WhileBuyingGuide";
import WhileSellingGuide from "./Components/WhileSelling/WhileSellingGuide";
import DuringPurchase from "./Components/WhileBuying/DuringPurchase";
import BeforePurchase from "./Components/WhileBuying/BeforePurchase";
import AfterPurchase from "./Components/WhileBuying/AfterPurchase";
import PurchaseDetails from "./Components/WhileBuying/PurchaseDetails";
import VehicleGuide from "./Components/WhileBuying/VehicleGuide";
import VehicleGuideSelling from "./Components/WhileSelling/VehicleGuide";
import AutoDictionary from "./Components/WhileBuying/AutoDictionary";
import PreSale from "./Components/WhileSelling/PreSale";
import DuringSales from "./Components/WhileSelling/DuringSales";
import SaleDetails from "./Components/WhileSelling/SaleDetails";
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
        { path: "/past-queries", element: <PastQueries/> },
        { path: "/auto-expertise", element: <AutoExpertise/> },
        { path: "/vehicle-buying-guide", element: <WhileBuyingGuide/> },
        { path: "/vehicle-selling-guide", element: <WhileSellingGuide/> },
        { path: "/during-purchase", element: <DuringPurchase/> },
        { path: "/before-purchase", element: <BeforePurchase/> },
        { path: "/after-purchase", element: <AfterPurchase/> },
        { path: "/purchase-details", element: <PurchaseDetails/> },
        { path: "/vehicle-guide", element: <VehicleGuide/> },
        { path: "/auto-dictionary", element: <AutoDictionary/> },
        { path: "/vehicle-guide-selling", element: <VehicleGuideSelling/> },
        { path: "/pre-sale", element: <PreSale/> },
        { path: "/during-sales", element: <DuringSales/> },
        { path: "/sale-details", element: <SaleDetails/> },
        
        
    ]);
    return element;
  };
  export default ProjectRoutes;
  