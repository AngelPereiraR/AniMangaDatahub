import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../../context/FormModeContext";
import { EditScreenContext } from "../../context/EditScreenContext";

const EditProfile = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateFormMode(true);
    updateEditScreen(true);
  });
  return <div>EditProfile</div>;
};

export default EditProfile;
