import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";

const TopMangas = () => {
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateEditScreen(false);
  });
  return <div>TopMangas</div>;
};

export default TopMangas;
