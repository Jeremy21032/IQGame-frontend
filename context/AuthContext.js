import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const loadAuthData = async () => {
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      const user = await AsyncStorage.getItem('user');
      if (isAuthenticated === 'true' && user) {
        setState({ isAuthenticated: true, user: JSON.parse(user) });
      }
    };
    loadAuthData();
  }, []);

  const login = async (user) => {
    //console.log("Usuario: ",user)
    setState({ isAuthenticated: true, user });
    await AsyncStorage.setItem('isAuthenticated', 'true');
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    setState({ isAuthenticated: false, user: null });
    await AsyncStorage.removeItem('isAuthenticated');
    await AsyncStorage.removeItem('user');
  };

  const updateUser = async (updatedUser) => {
    setState((prevState) => ({ ...prevState, user: updatedUser }));
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
