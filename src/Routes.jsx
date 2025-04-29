import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home";
import AdDetails from "./Pages/AdDetails";
import PostAnAdd from "./Pages/PostAnAdd";
import CategorySelectionDetails from "./Components/AddAnPost/CategorySelectionDetails";
const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/", element: <Home/> },
        { path: "/ad-details", element: <AdDetails/> },
        { path: "/post-an-add", element: <PostAnAdd/> },   
        { path: "/category-selection-details", element: <CategorySelectionDetails/> }, 
    ]);
    return element;
  };
  export default ProjectRoutes;
  