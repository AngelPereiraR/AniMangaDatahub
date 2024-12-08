import React, { useContext, useEffect, useState } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/shared/Heading";

const Profile = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { user } = useContext(UserContext);
  const [firebaseEmail, setFirebaseEmail] = useState("");
  const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(true);

    console.log(user);

    if (user === null) {
      navigate("/login");
    }

    setFirebaseEmail(user?.email);
  });

  return (
    <main>
      <Heading title="Perfil" className="heading-subtitle" />
      <Heading title="Nombre de usuario" />
      {usersData[firebaseEmail] ? (
        <p>{usersData[firebaseEmail].username}</p>
      ) : (
        <p>
          {user.displayName
            ? user.displayName
            : "Por favor, edita tu perfil para mostrar la información requerida"}
        </p>
      )}
      <Heading title="Correo electrónico" />
      {usersData[firebaseEmail] ? (
        <p>{usersData[firebaseEmail].email}</p>
      ) : (
        <p>{user?.email}</p>
      )}
      <Heading title="País" />
      {usersData[firebaseEmail] ? (
        <p>{usersData[firebaseEmail].country}</p>
      ) : (
        <p>Por favor, edita tu perfil para mostrar la información requerida</p>
      )}
      <Heading title="Dirección" />
      {usersData[firebaseEmail] ? (
        <p>{usersData[firebaseEmail].address}</p>
      ) : (
        <p>Por favor, edita tu perfil para mostrar la información requerida</p>
      )}
      <Heading title="Fecha de nacimiento" />
      {usersData[firebaseEmail] ? (
        <p>
          {usersData[firebaseEmail].day} - {usersData[firebaseEmail].month} -{" "}
          {usersData[firebaseEmail].year}
        </p>
      ) : (
        <p>Por favor, edita tu perfil para mostrar la información requerida</p>
      )}
      <Heading title="Favoritos" className="heading-subtitle" />
    </main>
  );
};

export default Profile;
