import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Initially, no user is authenticated

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = () => {
    // Clear the user data upon logout
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
