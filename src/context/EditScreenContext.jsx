import { createContext, useState } from "react";

export const EditScreenContext = createContext();

export const EditScreenProvider = ({ children }) => {
  const [editScreen, setEditScreen] = useState(
    localStorage.getItem("editScreen") ?? false
  );

  const updateEditScreen = (mode) => {
    setEditScreen(mode);
    localStorage.setItem("editScreen", mode);
  };

  return (
    <EditScreenContext.Provider value={{ editScreen, updateEditScreen }}>
      {children}
    </EditScreenContext.Provider>
  );
};
