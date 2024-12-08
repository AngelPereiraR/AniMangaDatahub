import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";
import { FormModeProvider } from "../context/FormModeContext";
import { Bounce, ToastContainer } from "react-toastify";
import { ScreenWidthProvider } from "../context/ScreenWidthContext";
import { UserProvider } from "../context/UserContext";
import { EditScreenProvider } from "../context/EditScreenContext";

const LayoutPublic = ({ children }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  // Manejador de scroll para mostrar/ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Transición suave
    });
  };

  return (
    <FormModeProvider>
      <EditScreenProvider>
        <ScreenWidthProvider>
          <UserProvider>
            <Navbar />
            {children ? children : <Outlet />}
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
              transition={Bounce}
            />
            <Footer />

            {/* Botón de scroll hacia arriba */}
            {showScrollButton && (
              <button
                onClick={scrollToTop}
                className={`scroll-button ${
                  darkMode ? "scroll-button--dark" : ""
                }`}
                aria-label="Volver al principio"
              >
                ↑ Volver al principio
              </button>
            )}
          </UserProvider>
        </ScreenWidthProvider>
      </EditScreenProvider>
    </FormModeProvider>
  );
};

export default LayoutPublic;
