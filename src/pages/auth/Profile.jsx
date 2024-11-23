import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(true);

    if (user === null) {
      navigate("/login");
    }
  });

  return <div>Profile</div>;
};

export default Profile;
