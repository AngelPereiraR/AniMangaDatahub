import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../../context/FormModeContext";
import { EditScreenContext } from "../../context/EditScreenContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateFormMode(true);
    updateEditScreen(true);

    if (user === null) {
      navigate("/login");
    }
  });

  return <div>EditProfile</div>;
};

export default EditProfile;
