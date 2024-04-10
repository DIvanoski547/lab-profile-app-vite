import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/auth.service';

const AuthContext = React.createContext();
const API_URL = 'http://localhost:5173';

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Function to store token in the local storage of the browser after login
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  // Function to authenticate the user and update the
  const authenticateUser = () => {
    // update the authentication state variables according to whether
    // there's a token in localStorage or not
    // if there's a token ---> validate the token ---> update the state variables
    // else ---> update the state variables accordingly
    const storedToken = localStorage.getItem('authToken');
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        // authService.verify()
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // Function to remove the token from browser's local storage after logout
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  //Function to logout the user, remove the token and update the state
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser(); // after the page loads, check if there's a token in localStorage
    // ---> update the state variables accordingly
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
