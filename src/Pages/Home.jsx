import React from "react";
import { ProductsGrid } from "../Components/Home/ProductCard";
import { Stats } from "../Components/Home/ProductCard";
import Sidebar from "../Components/Home/Sidebar";
import Navbar from "../Components/Navbar";
import NavMenuBar from "../Components/NavMenuBar";
import Footer from "../Components/Footer";
import Auto360 from "../Components/Home/Auto360";
import RealEstate360 from "../Components/Home/RealEstate360";
import ShoppingBlog from "../Components/Home/ShoppingBlog";
import Testimonials from "../Components/Home/Testimonials";
import CommentForm from "../Components/Home/CommentForm";
import AboutUs from "../Components/Home/AboutUs";
function Home() {
  return (
    <>
    <div className="min-h-screen">
      <Navbar />
      <NavMenuBar />
      <div className="flex flex-col md:flex-row   ">
        <Sidebar />
        <main className="flex-1   p-6">
          <h2 className="text-4xl font-bold mb-6 uppercase text-center text-[#231E1C]">
            All Products
          </h2>
          <ProductsGrid />
        </main>
      </div>
      <div>
        <div className="flex flex-col gap-2 p-7 ">
          <h1 className="font-poppins font-[500] text-[25px]">Auto360</h1>
          <Auto360 />
        </div>
        <div className="flex flex-col gap-2 p-7">
          <h1 className="font-poppins font-[500] text-[25px]">
            Real Estate360
          </h1>
          <RealEstate360 />
        </div>
        <div className="flex flex-col gap-2 p-7">
          <h1 className="font-poppins font-[500] text-[25px]">Shopping Blog</h1>
          <ShoppingBlog />
        </div>
        <div className="flex pl-7 py-10  ">
          <Testimonials />
        </div>
        <AboutUs />
        <div className="flex justify-center items-center  ">

        <Stats />
        </div>
        <CommentForm />
      </div>
      <Footer />
      </div>
    </>
  );
}

export default Home;
