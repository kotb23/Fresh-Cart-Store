import { createContext, useState } from "react";

export const ForgettenEmailContext = createContext();

export function ForgettenEmailContextProvider({ children }) {
  const [forgettnEmail, setForgettnEmail] = useState("");

  return (
    <ForgettenEmailContext.Provider value={{ forgettnEmail, setForgettnEmail }}>
      {children}
    </ForgettenEmailContext.Provider>
  );
}
