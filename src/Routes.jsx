import React from "react";
import { useRoutes } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import SignInForm from "./Pages/LoginForm";
import Home from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import PostAnAdd from "./Pages/PostAnAdd";
import CategorySelectionDetails from "./Components/AddAnPost/CategorySelectionDetails";
import CategoriesCars from "./Components/Home/CategoriesCars";
import CategoriesCellPhones from "./Components/Home/CategoriesCellPhones";
import AdManagement from "./Pages/AdManagement";
import BuyNow from "./Components/AdManagement/BuyNow";
import Auto360Page from "./Components/Auto360/Auto360Page";
import VehicleComparisonComponent from "./Components/WhileBuying/VehicleComparisonComponent";
import VehicleValuationComponent from "./Components/WhileBuying/VehicleValuation";
import VehicleDamageInquiry from "./Components/WhileBuying/VehicleDamageInquiry";
import PastQueries from "./Components/WhileBuying/PastQueries";
import AutoExpertise from "./Components/WhileBuying/AutoExpertise"
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
import MaintenanceAndRepair from "./Components/Maintenance&Repair/ModernLivingHero";
import Credit from "./Components/Credit/Credit";
import ZeroVehicleWorld from "./Components/ZeroVehicleWorld/ZeroVehicleWorld";
import CompareNewVehicle from "./Components/ZeroVehicleWorld/CompareNewVehicle";
import ZeroVehicleLaunchSchedule from "./Components/ZeroVehicleWorld/ZeroVehicleLaunchSchedule";
import CampaignVehicle from "./Components/ZeroVehicleWorld/CampaignVehicle";
import AuthorizedDealer from "./Components/ZeroVehicleWorld/AuthorizedDealer";
import ElectricVehicle from "./Components/ZeroVehicleWorld/ElectricVehicle";
import Services from "./Pages/Services";
import Favorites from "./Pages/Favorites";
import MassageAndNotifications from "./Pages/MassageAndNotifications";
import MyAccount from "./Pages/MyAccount";
import MyShoppingTransactions from "./Pages/MyShoppingTransactions";
import RealEstate from "./Components/RealEstate/RealEstate";
import CreditRealEstate from "./Components/RealEstate/Credit";
import RealEstateExpertise from "./Components/RealEstate/RealEstateExpertise/ExpertisePage";
import RealEstateIndex from "./Components/RealEstate/RealEstateIndex/IndexPage";
import BuyingGuidePage from "./Components/RealEstate/PropertyBuyingGuide/BuyingGuidePage";
import SellingGuides from "./Components/RealEstate/PropertyBuyingGuide/SellingGuides";
import PurchaseDetailsRealEstate from "./Components/RealEstate/PropertyBuyingGuide/PurchaseDetails";
import PurchaseDetailsOverview from "./Components/RealEstate/PropertyBuyingGuide/PurchaseDetailsOverview";
import RealEstateDictionary from "./Components/RealEstate/PropertyBuyingGuide/RealEstateDictionary";
import RentalGuidePage from "./Components/RealEstate/WhenRenting/PropertyRentalGuide/RentalGuidePage";
import RentingGuides from "./Components/RealEstate/WhenRenting/PropertyRentalGuide/RentingGuides";
import BeforeRenting from "./Components/RealEstate/WhenRenting/PropertyRentalGuide/BeforeRenting";
import AfterLease from "./Components/RealEstate/WhenRenting/PropertyRentalGuide/AfterLease";
import BeforeRentingOverview from "./Components/RealEstate/WhenRenting/PropertyRentalGuide/BeforeRentingOverview";
import AfterLeaseOverview from "./Components/RealEstate/WhenRenting/PropertyRentalGuide/AfterLeaseOverview";
import SellingGuidePage from "./Components/RealEstate/WhenSelling/SellingGuidePage";
import PreSales from "./Components/RealEstate/WhenSelling/PreSales";
import PreSalesOverview from "./Components/RealEstate/WhenSelling/PreSalesOverview";
import CartPage from "./Components/Cart/CartPage";
const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/", element: <Home/> },
        { path: "/signup", element: <SignUpForm/> },
        { path: "/signin", element: <SignInForm/> },
        { path: "/ad-details", element: <AdDetails/> },
        { path: "/post-an-add", element: <PostAnAdd/> },   
        { path: "/category-selection-details/:categorySlug", element: <CategorySelectionDetails/> }, 
        { path: "/categories-cars", element: <CategoriesCars/> },
        { path: "/categories-cell-phones", element: <CategoriesCellPhones/> },
        { path: "/ad-management", element: <AdManagement/> },
        { path: "/buy-now", element: <BuyNow/> },
        { path: "/auto360-page", element: <Auto360Page/> },
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
        { path: "/maintenance-and-repair", element: <MaintenanceAndRepair/> },
        { path: "/credit", element: <Credit/> },
        { path: "/zero-vehicle-world", element: <ZeroVehicleWorld/> },
        { path: "/compare-new-vehicle", element: <CompareNewVehicle/> },
        { path: "/zero-vehicle-launch-schedule", element: <ZeroVehicleLaunchSchedule/> },
        { path: "/campaign-vehicles", element: <CampaignVehicle/> },
        { path: "/authorized-dealer", element: <AuthorizedDealer/> },
        { path: "/electric-vehicle", element: <ElectricVehicle/> },
        { path: "/services", element: <Services/> },
        { path: "/favorites", element: <Favorites/> },
        { path: "/massage-and-notifications", element: <MassageAndNotifications/> },
        { path: "/my-account", element: <MyAccount/> },
        { path: "/my-shopping-transactions", element: <MyShoppingTransactions/> },
        { path: "/real-estate", element: <RealEstate/> },
        { path: "/credit-estate", element: <CreditRealEstate/> },
        { path: "/real-estate-expertise", element: <RealEstateExpertise/> },
        { path: "/real-estate-index", element: <RealEstateIndex/> },
        { path: "/property-buying-guide", element: <BuyingGuidePage/> },
        { path: "/selling-guides", element: <SellingGuides/> },
        { path: "/purchase-details-real-estate", element: <PurchaseDetailsRealEstate/> },
        { path: "/purchase-details-overview", element: <PurchaseDetailsOverview/> },
        { path: "/real-estate-dictionary", element: <RealEstateDictionary/> },
        { path: "/property-rental-guide", element: <RentalGuidePage/> },
        { path: "/renting-guides", element: <RentingGuides/> },
        { path: "/before-renting", element: <BeforeRenting/> },
        { path: "/after-lease", element: <AfterLease/> },
        { path: "/before-renting-overview", element: <BeforeRentingOverview/> },
        { path: "/after-lease-overview", element: <AfterLeaseOverview/> },
        { path: "/selling-guides-page", element: <SellingGuidePage/> },
        { path: "/pre-sales", element: <PreSales/> },
        { path: "/pre-sales-overview", element: <PreSalesOverview/> },
        { path: "/cart", element: <CartPage/> },
        
    ]);
    return element;
  };
  export default ProjectRoutes;
  