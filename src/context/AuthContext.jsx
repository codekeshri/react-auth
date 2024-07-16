import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  loggedIn: false,
});

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false);
  const loggedIn = setAuthState(true);
  const token = "";

  return (
    <AuthContext.Provider value={{ token, loggedIn, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
