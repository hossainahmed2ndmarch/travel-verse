import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  // console.log(user);
  // Register
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    setLoading(true);
  };

  // Sign up with Google
  const signUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Forgot Password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  // Log-out
  const logOut = () => {
    return signOut(auth);

    setLoading(true);
  };
  // Log In
  const userLogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    setLoading(true);
  };
  // Observer Function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    createNewUser,
    signUpWithGoogle,
    forgotPassword,
    updateUserProfile,
    setUser,
    logOut,
    userLogIn,
    loading,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
