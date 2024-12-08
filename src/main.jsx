import { createRoot } from "react-dom/client"; // Importa createRoot para renderizar la aplicación en el DOM
import "./scss/index.scss"; // Archivo de estilos globales
import { RouterProvider } from "react-router-dom"; // Componente RouterProvider para gestionar las rutas de la aplicación
import { router } from "./router/index.jsx"; // Importa la configuración de las rutas desde un archivo router/index.jsx
import { Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Renderiza la aplicación en el DOM dentro del elemento con id="root"
createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Cargando...</div>}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Suspense>
);
