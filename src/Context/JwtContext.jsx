import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const JwtContext = createContext();
export default function JwtContextProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || null,
  );

  function tokenDetails() {
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      setUserId(id);
    }
  }

  useEffect(() => {
    tokenDetails();
  }, [userToken]);

  return (
    <JwtContext.Provider
      value={{
        userName,
        userId,
        setUserName,
      }}
    >
      {children}
    </JwtContext.Provider>
  );
}
