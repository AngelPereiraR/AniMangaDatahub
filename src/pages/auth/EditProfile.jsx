import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../../context/FormModeContext";

const EditProfile = () => {
  const { updateFormMode } = useContext(FormModeContext);

  useEffect(() => {
    updateFormMode(true);
  });
  return <div>EditProfile</div>;
};

export default EditProfile;
