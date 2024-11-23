import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";

const Manga = () => {
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateEditScreen(false);
  });
  return <div>Manga</div>;
};

export default Manga;
