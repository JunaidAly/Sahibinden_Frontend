import React from 'react'
import MyPurchaseTransactions from './MyMoneyIsSafe/MyPurchaseTransactions'
import MySalesTransactions from './MyMoneyIsSafe/MySalesTransactions'
import MyDeliveryAddressMoneySafe from './MyMoneyIsSafe/CommentManagement/MyDeliveryAddress';
import MyBankInformation from './MyMoneyIsSafe/CommentManagement/MyBankInformation';
import MyHeadOfficeAddress from './MyMoneyIsSafe/CommentManagement/MyHeadOfficeAddress';
import ProductPurchased from './MyMoneyIsSafe/CommentManagement/ProductPurchased';
import ProductSell from './MyMoneyIsSafe/CommentManagement/ProductSell';
import DevicePurchasePageAlt from './BrandNewTransactions/DevicePurchasePage';
import DeviceSellPage from './BrandNewTransactions/DeviceSellPage';
import Summary from './SafeEcommerce/Summary';
import MyCurrentOrders from './SafeEcommerce/MyOrders/MyCurrentOrders';
import ReturnAndCancellationProcedures from './SafeEcommerce/MyOrders/ReturnAndCancellationProcedures';
import MyCompletedOrders from './SafeEcommerce/MyOrders/MyCompletedOrders';
import MyDistanceContracts from './SafeEcommerce/MyOrders/MyDistanceContracts';
import MyProductOnSale from './SafeEcommerce/MySalesTransaction/MyProductOnSale';
import WhatIWillShip from './SafeEcommerce/MySalesTransaction/WhatIWillShip';
import ApprovalFromTheBuyer from './SafeEcommerce/MySalesTransaction/ApprovalFromTheBuyer';
import MySuccessfulSales from './SafeEcommerce/MySalesTransaction/MySuccessfulSales';
import ReturnsAndCancellations from './SafeEcommerce/MySalesTransaction/ReturnsAndCancellations';
import MyProductsNotOnSale from './SafeEcommerce/MySalesTransaction/MyProductsNotOnSale';
import MyDistanceContractsSales from './SafeEcommerce/MySalesTransaction/MyDistanceContracts';
import MyBankInformationSales from './SafeEcommerce/MySalesTransaction/MyBankInformation';
import MyHeadOfficeAddressSales from './SafeEcommerce/MySalesTransaction/MyHeadOfficeAddress';
import MyDeliveryAddress from './SafeEcommerce/MyDeliveryBillingAddress/MyDeliveryAddress';
import CommentManagement from './SafeEcommerce/CommentManagement';

function ContentShoppingTransaction({ activeComponent }) {
  return (
    <>
      {activeComponent === "purchaseTransactions" && <MyPurchaseTransactions />}
      {activeComponent === "mySalesTransactions" && <MySalesTransactions />}
      {activeComponent === "billingAddress" && <MyDeliveryAddressMoneySafe/>}
      {activeComponent === "myBankInformation" && <MyBankInformation />}
      {activeComponent === "headOfficeAddress" && <MyHeadOfficeAddress />}
      {activeComponent === "devicePurchasePage" && <DevicePurchasePageAlt />}
      {activeComponent === "deviceSellPage" && <DeviceSellPage />}
      {activeComponent === "summary" && <Summary />}
      {activeComponent === "myCurrentOrders" && <MyCurrentOrders />}
      {activeComponent === "returnAndCancellationProcedures" && <ReturnAndCancellationProcedures />}
      {activeComponent === "myCompletedOrders" && <MyCompletedOrders />}
      {activeComponent === "myDistanceContracts" && <MyDistanceContracts />}
      {activeComponent === "myProductOnSale" && <MyProductOnSale />}
      {activeComponent === "WhatIWillShip" && <WhatIWillShip />}
      {activeComponent === "approvalFromTheBuyer" && <ApprovalFromTheBuyer />}
      {activeComponent === "mySuccessfulSales" && <MySuccessfulSales />}
      {activeComponent === "returnsAndCancellation" && <ReturnsAndCancellations />}
      {activeComponent === "myProductsThatAreNotOnSale" && <MyProductsNotOnSale />}
      {activeComponent === "myDistanceContractsSales" && <MyDistanceContractsSales/>}
      {activeComponent === "mybankInformationSales" && <MyBankInformationSales/>}
      {activeComponent === "myHeadOfficeSalesAddress" && <MyHeadOfficeAddressSales/>}
      {activeComponent === "myDeliveryBillingAddresses" && <MyDeliveryAddress/>}
      {activeComponent === "commentManagementSafeEcom" && <CommentManagement/>}
      {activeComponent === "productIPurchased" && <ProductPurchased/>}
      {activeComponent === "productISell" && <ProductSell/>}
    </>
  );
}

export default ContentShoppingTransaction