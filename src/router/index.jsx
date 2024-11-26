import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
// Importación de componentes y páginas necesarias para las rutas
import LayoutPublic from "../layouts/LayoutPublic";
import Home from "../pages/Home";

const Error404 = lazy(() => import("../pages/errors/Error404"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Profile = lazy(() => import("../pages/auth/Profile"));
const EditProfile = lazy(() => import("../pages/auth/EditProfile"));
const Anime = lazy(() => import("../pages/info/Anime"));
const SearchAnime = lazy(() => import("../pages/results/SearchAnime"));
const TopAnimes = lazy(() => import("../pages/results/TopAnimes"));
const AnimesBySeason = lazy(() => import("../pages/results/AnimesBySeason"));
const Manga = lazy(() => import("../pages/info/Manga"));
const SearchManga = lazy(() => import("../pages/results/SearchManga"));
const TopMangas = lazy(() => import("../pages/results/TopMangas"));
const MangasBySeason = lazy(() => import("../pages/results/MangasBySeason"));
const Contact = lazy(() => import("../pages/auth/Contact"));
const Seiyuu = lazy(() => import("../pages/info/Seiyuu"));
const Character = lazy(() => import("../pages/info/Character"));

// Definición del router con las rutas principales y anidadas
export const router = createBrowserRouter([
  {
    path: "/", // Ruta raíz
    element: <LayoutPublic />, // Componente de diseño principal para las rutas públicas
    errorElement: (
      <LayoutPublic>
        <Error404 /> {/* Página de error 404 en caso de ruta no encontrada */}
      </LayoutPublic>
    ),
    children: [
      {
        index: true, // Ruta por defecto para "/"
        element: <Home />, // Componente de la página de inicio
      },
      {
        path: "/login", // Ruta para iniciar sesión
        element: <Login />,
      },
      {
        path: "/register", // Ruta para registrarse
        element: <Register />,
      },
      {
        path: "/profile", // Ruta para el perfil del usuario
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "/profile/edit", // Subruta para editar el perfil
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/contact", // Ruta para la página de contacto
        element: <Contact />,
      },
      {
        path: "/anime", // Rutas relacionadas con animes
        children: [
          {
            path: "/anime/:id", // Ruta para información de un anime específico
            element: <Anime />,
          },
          {
            path: "/anime/search", // Ruta para buscar animes
            element: <SearchAnime />,
          },
          {
            path: "/anime/top", // Ruta para ver los animes más populares
            element: <TopAnimes />,
          },
          {
            path: "/anime/season", // Ruta para animes por temporada
            element: <AnimesBySeason />,
          },
        ],
      },
      {
        path: "/manga", // Rutas relacionadas con mangas
        children: [
          {
            path: "/manga/:id", // Ruta para información de un manga específico
            element: <Manga />,
          },
          {
            path: "/manga/search", // Ruta para buscar mangas
            element: <SearchManga />,
          },
          {
            path: "/manga/top", // Ruta para ver los mangas más populares
            element: <TopMangas />,
          },
          {
            path: "/manga/season", // Ruta para mangas por temporada
            element: <MangasBySeason />,
          },
        ],
      },
      {
        path: "/seiyuu/:id", // Ruta para información de un actor de voz específico
        element: <Seiyuu />,
      },
      {
        path: "/character/:id", // Ruta para información de un personaje específico
        element: <Character />,
      },
    ],
  },
]);
