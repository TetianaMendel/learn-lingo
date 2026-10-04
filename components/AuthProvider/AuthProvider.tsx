"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const setAuthInitialized = useAuthStore(
    (state) => state.setAuthInitialized,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            username:
              firebaseUser.displayName ?? "",
          });
        } else {
          clearIsAuthenticated();
        }

        setAuthInitialized(true);
      },
    );

    return unsubscribe;
  }, [
    setUser,
    clearIsAuthenticated,
    setAuthInitialized,
  ]);

  return (
    <>
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default AuthProvider;