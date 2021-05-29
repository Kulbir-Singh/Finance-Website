import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  //this loading is used to prevent the app from loading if the user isnt defined
  const [loading, setLoading] = useState(true);
  // this is a built in function from firebase to create a user and password
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  // this use effect will set the current user and will
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {/* if loading is true then it will not display the app ***further 
      explaination--> https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified @ 26:30 mark */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
