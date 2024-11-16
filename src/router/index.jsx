import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic";
import Error404 from "../pages/errors/Error404";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/auth/Profile";
import EditProfile from "../pages/auth/EditProfile";
import Anime from "../pages/info/Anime";
import SearchAnime from "../pages/results/SearchAnime";
import TopAnimes from "../pages/results/TopAnimes";
import AnimesBySeason from "../pages/results/AnimesBySeason";
import Manga from "../pages/info/Manga";
import SearchManga from "../pages/results/SearchManga";
import TopMangas from "../pages/results/TopMangas";
import MangasBySeason from "../pages/results/MangasBySeason";
import Contact from "../pages/info/Contact";
import Seiyuu from "../pages/info/Seiyuu";
import Character from "../pages/info/Character";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: (
      <LayoutPublic>
        <Error404 />
      </LayoutPublic>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/edit",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/anime",
        children: [
          {
            path: "/anime/:id",
            element: <Anime />,
          },
          {
            path: "/anime/search",
            element: <SearchAnime />,
          },
          {
            path: "/anime/top",
            element: <TopAnimes />,
          },
          {
            path: "/anime/season",
            element: <AnimesBySeason />,
          },
        ],
      },
      {
        path: "/manga",
        children: [
          {
            path: "/manga/:id",
            element: <Manga />,
          },
          {
            path: "/manga/search",
            element: <SearchManga />,
          },
          {
            path: "/manga/top",
            element: <TopMangas />,
          },
          {
            path: "/manga/season",
            element: <MangasBySeason />,
          },
        ],
      },
      {
        path: "/seiyuu/:id",
        element: <Seiyuu />,
      },
      {
        path: "/character/:id",
        element: <Character />,
      },
    ],
  },
]);
