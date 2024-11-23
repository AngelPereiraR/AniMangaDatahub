import React, { useContext, useEffect } from "react";
import { EditScreenContext } from "../../context/EditScreenContext";

const SearchAnime = () => {
  const { updateEditScreen } = useContext(EditScreenContext);

  useEffect(() => {
    updateEditScreen(false);
  });
  return <div>SearchAnime</div>;
};

export default SearchAnime;
