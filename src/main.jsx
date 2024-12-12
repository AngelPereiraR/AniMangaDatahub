import { createRoot } from "react-dom/client"; // Importa createRoot para renderizar la aplicación en el DOM
import { RouterProvider } from "react-router-dom"; // Componente RouterProvider para gestionar las rutas de la aplicación
import { router } from "./router/index.jsx"; // Importa la configuración de las rutas desde un archivo router/index.jsx
import { Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Aquí estamos importando nuestra hoja de estilos global, siendo una forma de añadir estilos CSS de forma directa. Esta es la forma recomendada, ya que podemos customizar el CSS de varias clases y reutilizarlas a lo largo de nuestro proyecto.
import "./scss/index.scss";

// Renderiza la aplicación en el DOM dentro del elemento con id="root"
createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Cargando...</div>}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Suspense>
);
