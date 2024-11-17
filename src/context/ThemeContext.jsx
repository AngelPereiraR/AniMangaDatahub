import React, { createContext, useState, useEffect } from "react";

// Crear el contexto para el tema de la aplicación
export const ThemeContext = createContext();

// Proveedor del contexto de tema
export const ThemeProvider = ({ children }) => {
  // Estado para manejar si el modo oscuro está activo o no, inicializado según el almacenamiento local
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // useEffect para sincronizar el estado del tema con el DOM y el almacenamiento local
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]); // Se ejecuta cada vez que cambia el estado de darkMode

  // Función para alternar entre modo oscuro y claro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Proveer el contexto de tema con el estado y la función para alternar el tema
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children} {/* Renderiza los componentes hijos */}
    </ThemeContext.Provider>
  );
};
