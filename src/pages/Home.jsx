import React, { useContext, useEffect } from "react";
import { FormModeContext } from "../context/FormModeContext";

const Home = () => {
  const { updateFormMode } = useContext(FormModeContext);

  useEffect(() => {
    updateFormMode(false);
  });

  return <div>Home</div>;
};

export default Home;
