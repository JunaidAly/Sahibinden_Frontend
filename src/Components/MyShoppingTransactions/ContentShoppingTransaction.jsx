import React from 'react'
import MyPurchaseTransactions from './MyMoneyIsSafe/MyPurchaseTransactions'
import MySalesTransactions from './MyMoneyIsSafe/MySalesTransactions'
import DeliveryBillingForm from './MyMoneyIsSafe/CommentManagement/DeliveryBillingForm';

function ContentShoppingTransaction({ activeComponent }) {
  return (
    <>
      {activeComponent === "purchaseTransactions" && <MyPurchaseTransactions />}
      {activeComponent === "mySalesTransactions" && <MySalesTransactions />}
      {activeComponent === "billingAddress" && <DeliveryBillingForm />}
    </>
  );
}

export default ContentShoppingTransaction