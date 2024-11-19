import { createContext, useState } from "react";

export const FormModeContext = createContext();

export const FormModeProvider = ({ children }) => {
  const [formMode, setFormMode] = useState(
    localStorage.getItem("formMode") ?? false
  );

  const updateFormMode = (mode) => {
    setFormMode(mode);
    localStorage.setItem("formMode", mode);
  };

  return (
    <FormModeContext.Provider value={{ formMode, updateFormMode }}>
      {children}
    </FormModeContext.Provider>
  );
};
