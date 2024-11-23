import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";
import { FormModeContext } from "../../context/FormModeContext";

const Profile = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(true);
  });

  return <div>Profile</div>;
};

export default Profile;
