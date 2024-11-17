import { StrictMode } from "react"; // Importación de StrictMode de React para ayudar en el desarrollo
import { createRoot } from "react-dom/client"; // Importa createRoot para renderizar la aplicación en el DOM
import "./index.css"; // Archivo de estilos globales
import { RouterProvider } from "react-router-dom"; // Componente RouterProvider para gestionar las rutas de la aplicación
import { router } from "./router/index.jsx"; // Importa la configuración de las rutas desde un archivo router/index.jsx

// Renderiza la aplicación en el DOM dentro del elemento con id="root"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />{" "}
    {/* Provee el objeto router a la aplicación, manejando el enrutamiento */}
  </StrictMode>
);
