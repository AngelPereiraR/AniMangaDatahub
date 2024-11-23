import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";

const TopAnimes = () => {
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateEditScreen(false);
  });
  return <div>TopAnimes</div>;
};

export default TopAnimes;
