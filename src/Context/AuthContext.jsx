import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setuserToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken != null) {
      setuserToken(userToken);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        setuserToken,
        userToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
