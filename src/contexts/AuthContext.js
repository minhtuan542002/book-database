import { createContext, useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { 
  login as apiLogin, 
  logout as apiLogout, 
  refreshToken as apiRefreshToken 
} from '../api/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      const { IdToken, AccessToken, RefreshToken} = response.data.AuthenticationResult;

      const decodedUser = jwtDecode(IdToken);
      setAuthToken(AccessToken);
      setUser(decodedUser);
      setRefreshToken(RefreshToken);

      return decodedUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await apiLogout(authToken);
    } finally {
      setAuthToken(null);
      setUser(null);
      setRefreshToken(null);
    }
  };
  
  const handleRefreshToken = async () => {
    // try {
    //   await apiRefreshToken(refreshToken);
    // } finally {
    //   setAuthToken(null);
    //   setUser(null);
    //   setRefreshToken(null);
    // }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      authToken, 
      refreshToken: handleRefreshToken,
      login: handleLogin,
      logout: handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);