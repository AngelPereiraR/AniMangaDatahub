import React from "react";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import { ThemeProvider } from "../context/ThemeContext";

const LayoutPublic = ({ children }) => {
  return (
    <ThemeProvider>
      <Navbar />
      {children ? children : <Outlet></Outlet>}
      <Footer />
    </ThemeProvider>
  );
};

export default LayoutPublic;
