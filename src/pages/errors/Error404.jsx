import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../../context/FormModeContext";
import { EditScreenContext } from "../../context/EditScreenContext";
import Button from "../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import image_head from "./../../assets/error404-mash-head.png";
import image_body from "./../../assets/error404-mash-body.png";

const Error404 = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(false);
  });
  return (
    <main className="error__main">
      <section className="main__section">
        <h2 className="main__title">Error 404</h2>
        <p className="main__message">Recurso no encontrado</p>
        <p className="main__message">No se pudo cargar la página solicitada</p>
        <div>
          <Button
            label="Volver al menú principal"
            onClick={() => navigate("/")}
            className="main__button"
          ></Button>
        </div>
      </section>
      <aside className="main__aside">
        <img
          className="aside__image"
          src={image_head}
          alt="Mash Kyrielight avergonzada de que no se haya podido cargar la página solicitada"
        />
        <img
          className="aside__image"
          src={image_body}
          alt="Mash Kyrielight avergonzada de que no se haya podido cargar la página solicitada"
        />
      </aside>
    </main>
  );
};

export default Error404;
