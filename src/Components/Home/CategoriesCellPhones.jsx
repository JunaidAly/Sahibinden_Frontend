import React from 'react'
import Navbar from '../Navbar'
import NavMenuBar from '../NavMenuBar'
import Footer from '../Footer'
import { ProductsGrid } from '../CategoryCellPhones/ProductCard';
import SideBar from '../CategoryCellPhones/MobilePhoneFilter';
import Testimonials from './Testimonials';
import AboutUs from './AboutUs';
import CommentForm from './CommentForm';
import { Stats } from '../CategoryCellPhones/ProductCard';
import AdvancedSorting from '../CategoryCellPhones/AdvancedSorting';
function CategoriesCellPhones() {
  return (
    <>
      <Navbar />
      <NavMenuBar />
      <div className="min-h-screen flex flex-col gap-10">
      <div className="flex flex-col md:flex-row   ">
        <SideBar />
        <main className="flex-1 p-6">
        <div className='flex gap-[18rem] items-center'>
          <h2 className="text-[30px] font-[600] ml-5  font-poppins  text-left text-[#231E1C]">
            Refurbished Cell Phones
          </h2>
          <AdvancedSorting />
          </div>
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
  )
}

export default CategoriesCellPhones