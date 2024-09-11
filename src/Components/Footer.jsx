// src/Components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="mb-10">
      <div className=" ">
        <p className="text-base text-gray-400">
          &copy; {new Date().getFullYear()} EasyPeezy. All rights reserved. Developed By Nabarun
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
