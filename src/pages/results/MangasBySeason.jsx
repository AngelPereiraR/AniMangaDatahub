import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";

const MangasBySeason = () => {
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateEditScreen(false);
  });
  return <div>MangasBySeason</div>;
};

export default MangasBySeason;
