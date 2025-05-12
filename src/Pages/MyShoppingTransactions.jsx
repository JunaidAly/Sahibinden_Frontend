import React from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import NavMenuBar from "../Components/NavMenuBar";
import Footer from "../Components/Footer";
import CommentForm from "../Components/Home/CommentForm";
import TransactionNavigationMenu from "../Components/MyShoppingTransactions/TransactionNavigationMenu";
import ContentShoppingTransaction from "../Components/MyShoppingTransactions/ContentShoppingTransaction";

function MyShoppingTransactions() {
  const [activeComponent, setActiveComponent] = useState("purchaseTransactions");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="mt-5 flex flex-row justify-center p-5 gap-5">
        <TransactionNavigationMenu onSectionChange={handleComponentChange} />
        <ContentShoppingTransaction activeComponent={activeComponent} />
      </div>
      <CommentForm />
      <Footer />
    </>
  );
}

export default MyShoppingTransactions;
