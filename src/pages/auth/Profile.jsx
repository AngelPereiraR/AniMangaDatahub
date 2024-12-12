import React, { useContext, useEffect, useState } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/shared/Heading";
import Carousel from "../../components/shared/Carousel";
import { ThemeContext } from "../../context/ThemeContext";

const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { user } = useContext(UserContext);
  const [firebaseEmail, setFirebaseEmail] = useState("");
  const [carouselCardCount, setCarouselCardCount] = useState(4); // Inicialmente 4

  const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(true);

    if (user === null) {
      navigate("/login");
    } else {
      setFirebaseEmail(user?.email);
    }

    // Establecer la cantidad de tarjetas a mostrar según el ancho de la pantalla
    const updateCardCount = () => {
      const width = window.innerWidth;
      if (width > 1900) {
        setCarouselCardCount(6);
      } else if (width < 710) {
        setCarouselCardCount(2);
      } else if (width > 1050 && width < 1901) {
        setCarouselCardCount(5);
      } else {
        setCarouselCardCount(4);
      }
    };

    // Llamar a la función de ajuste del número de tarjetas
    updateCardCount();

    // Añadir un listener para detectar cambios en el tamaño de la ventana
    window.addEventListener("resize", updateCardCount);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", updateCardCount);
    };
  }, [updateEditScreen, updateFormMode, navigate, user]);

  return (
    <main className="profile">
      <Heading title="Perfil" className="profile__heading" />

      <section className="profile__info">
        <Heading title="Nombre de usuario" />
        {usersData[firebaseEmail] ? (
          <p
            className={`profile__info__value ${
              darkMode ? "profile__info__value--dark" : ""
            }`}
          >
            {usersData[firebaseEmail].username}
          </p>
        ) : (
          <p
            className={`profile__info__placeholder ${
              darkMode ? "profile__info__placeholder--dark" : ""
            }`}
          >
            {user?.displayName
              ? user.displayName
              : "Por favor, edita tu perfil para mostrar la información requerida"}
          </p>
        )}

        <Heading title="Correo electrónico" />
        {usersData[firebaseEmail] ? (
          <p
            className={`profile__info__value ${
              darkMode ? "profile__info__value--dark" : ""
            }`}
          >
            {usersData[firebaseEmail].email}
          </p>
        ) : (
          <p
            className={`profile__info__placeholder ${
              darkMode ? "profile__info__placeholder--dark" : ""
            }`}
          >
            {user?.email}
          </p>
        )}

        <Heading title="País" />
        {usersData[firebaseEmail] ? (
          <p
            className={`profile__info__value ${
              darkMode ? "profile__info__value--dark" : ""
            }`}
          >
            {usersData[firebaseEmail].country}
          </p>
        ) : (
          <p
            className={`profile__info__placeholder ${
              darkMode ? "profile__info__placeholder--dark" : ""
            }`}
          >
            Por favor, edita tu perfil para mostrar la información requerida
          </p>
        )}

        <Heading title="Dirección" />
        {usersData[firebaseEmail] ? (
          <p
            className={`profile__info__value ${
              darkMode ? "profile__info__value--dark" : ""
            }`}
          >
            {usersData[firebaseEmail].address}
          </p>
        ) : (
          <p
            className={`profile__info__placeholder ${
              darkMode ? "profile__info__placeholder--dark" : ""
            }`}
          >
            Por favor, edita tu perfil para mostrar la información requerida
          </p>
        )}

        <Heading title="Fecha de nacimiento" />
        {usersData[firebaseEmail] ? (
          <p
            className={`profile__info__value ${
              darkMode ? "profile__info__value--dark" : ""
            }`}
          >
            {usersData[firebaseEmail].day} - {usersData[firebaseEmail].month} -{" "}
            {usersData[firebaseEmail].year}
          </p>
        ) : (
          <p
            className={`profile__info__placeholder ${
              darkMode ? "profile__info__placeholder--dark" : ""
            }`}
          >
            Por favor, edita tu perfil para mostrar la información requerida
          </p>
        )}
      </section>

      <Heading title="Favoritos" />
      <Carousel data={favorites} cardNumbers={carouselCardCount} />
    </main>
  );
};

export default Profile;
