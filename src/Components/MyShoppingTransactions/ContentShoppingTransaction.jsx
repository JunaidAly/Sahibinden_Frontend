import React from 'react'
import MyPurchaseTransactions from './MyMoneyIsSafe/MyPurchaseTransactions'
import MySalesTransactions from './MyMoneyIsSafe/MySalesTransactions'
import DeliveryBillingForm from './MyMoneyIsSafe/CommentManagement/DeliveryBillingForm';
import MyBankInformation from './MyMoneyIsSafe/CommentManagement/MyBankInformation';
import MyHeadOfficeAddress from './MyMoneyIsSafe/CommentManagement/MyHeadOfficeAddress';
import DevicePurchasePageAlt from './BrandNewTransactions/DevicePurchasePage';
import DeviceSellPage from './BrandNewTransactions/DeviceSellPage';
import Summary from './SafeEcommerce/Summary';
import MyCurrentOrders from './SafeEcommerce/MyOrders/MyCurrentOrders';

function ContentShoppingTransaction({ activeComponent }) {
  return (
    <>
      {activeComponent === "purchaseTransactions" && <MyPurchaseTransactions />}
      {activeComponent === "mySalesTransactions" && <MySalesTransactions />}
      {activeComponent === "billingAddress" && <DeliveryBillingForm />}
      {activeComponent === "myBankInformation" && <MyBankInformation />}
      {activeComponent === "headOfficeAddress" && <MyHeadOfficeAddress />}
      {activeComponent === "devicePurchasePage" && <DevicePurchasePageAlt />}
      {activeComponent === "deviceSellPage" && <DeviceSellPage />}
      {activeComponent === "summary" && <Summary />}
      {activeComponent === "myCurrentOrders" && <MyCurrentOrders />}
    </>
  );
}

export default ContentShoppingTransaction