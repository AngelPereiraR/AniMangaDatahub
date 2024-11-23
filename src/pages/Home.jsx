import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../context/FormModeContext";
import { EditScreenContext } from "../context/EditScreenContext";
import Button from "../components/shared/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(false);
  });

  return (
    <main className="home-main">
      <section className="main-intro">
        <h2 className="intro-title">
          Una base de datos interactiva con todos los animes y mangas del mundo.
        </h2>
        {user === null && (
          <div className="intro-buttons">
            <Button
              label="Iniciar sesión"
              className="buttons-button"
              onClick={() => navigate("/login")}
            ></Button>
            <Button
              label="Primeros pasos"
              className="buttons-button"
              variant="secondary"
              onClick={() => navigate("/register")}
            ></Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
