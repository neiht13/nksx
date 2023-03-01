import {createContext, useContext, useState} from 'react';

const AuthContext = createContext({
  saveAuth: () => null,
  auth: null
});


export function AuthWrapper({ children }) {
  const [auth, setAuth] = useState()

  const saveAuth = user => {
    setAuth(user)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

