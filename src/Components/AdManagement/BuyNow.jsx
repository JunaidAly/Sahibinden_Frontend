import React from "react";
import Navbar from "../Navbar";
import NavMenuBar from "../NavMenuBar";
import Footer from "../Footer";
import CommentForm from "../Home/CommentForm";
import ComparePlans from "./ComparePlans";
function BuyNow() {

  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="min-h-screen">
        <ComparePlans />
      </div>
      <CommentForm />
      <Footer />
    </>
  );
}

export default BuyNow;
