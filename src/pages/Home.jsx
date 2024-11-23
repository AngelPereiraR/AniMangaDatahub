import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../context/FormModeContext";
import { EditScreenContext } from "../context/EditScreenContext";

const Home = () => {
  const { updateFormMode } = useContext(FormModeContext);
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateFormMode(false);
    updateEditScreen(false);
  });

  return <div>Home</div>;
};

export default Home;
