import React from 'react'
import Navbar from '../Navbar'
import NavMenuBar from '../NavMenuBar'
import Footer from '../Footer'
import { ProductsGrid } from '../CategoryCars/ProductCard';
import SideBar from '../CategoryCars/SideBar';
import Testimonials from './Testimonials';
import AboutUs from './AboutUs';
import CommentForm from './CommentForm';
import { Stats } from '../CategoryCars/ProductCard';
function CategoriesCars() {
  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="min-h-screen flex flex-col gap-10">
      <div className="flex flex-col md:flex-row   ">
        <SideBar />
        <main className="flex-1   p-6">
          <h2 className="text-4xl font-bold mb-6 uppercase text-center text-[#231E1C]">
            Vehicles
          </h2>
          <ProductsGrid />     
        </main>
      </div>
      <Testimonials />
        <AboutUs />
        <div className='flex items-center justify-center'>
        <Stats />
        </div>
        <CommentForm />
      </div>
      <Footer />
    </>
  );
}

export default CategoriesCars