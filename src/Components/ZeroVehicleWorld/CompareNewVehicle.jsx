import React from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavbarMenu from '../Auto360/NavbarMenu';
import CommentForm from '../Home/CommentForm';
import VehicleComparisonComponent from './VehicleComparisonComponent';

function CompareNewVehicle() {
  return (
    <>
      <Navbar />
      <NavbarMenu />
      <VehicleComparisonComponent />
      <CommentForm />
      <Footer />
    </>
  );
}

export default CompareNewVehicle;