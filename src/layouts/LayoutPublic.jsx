import React from "react";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import { FormModeProvider } from "../context/FormModeContext";
import { Bounce, ToastContainer } from "react-toastify";

const LayoutPublic = ({ children }) => {
  return (
    <FormModeProvider>
      <ThemeProvider>
        <Navbar />
        {children ? children : <Outlet></Outlet>}

        {/* Contenedor para las notificaciones */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce} // Define la transición de la notificación
        />
        <Footer />
      </ThemeProvider>
    </FormModeProvider>
  );
};

export default LayoutPublic;
