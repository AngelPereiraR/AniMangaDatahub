import { createContext, useEffect, useState } from "react";

export const ScreenWidthContext = createContext();

export const ScreenWidthProvider = ({ children }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 950);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 950);
    };

    // Agregar un event listener para actualizar el estado en cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpieza del event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenWidthContext.Provider value={{ isWideScreen }}>
      {children}
    </ScreenWidthContext.Provider>
  );
};
