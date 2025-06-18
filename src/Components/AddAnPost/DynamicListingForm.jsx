import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NavMenuBar from '../NavMenuBar';
import CommentForm from '../Home/CommentForm';
import ListingFormLogic from './ListingFormLogic';

export default function DynamicListingForm() {
  return (
    <>
      <Navbar />
      <NavMenuBar />
      <ListingFormLogic />
      <CommentForm />
      <Footer />
    </>
  );
}