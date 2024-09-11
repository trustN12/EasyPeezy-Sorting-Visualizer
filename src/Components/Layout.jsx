// src/Components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {

  const location = useLocation();

  const shouldShowFooter = location.pathname !== "/home";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
      
        <Outlet /> {/* This is where the routed components will be rendered */}
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
