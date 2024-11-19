import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../../context/FormModeContext";

const Register = () => {
  const { updateFormMode } = useContext(FormModeContext);

  useEffect(() => {
    updateFormMode(true);
  });

  return <div>Register</div>;
};

export default Register;
