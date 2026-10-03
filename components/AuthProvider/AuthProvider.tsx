"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            username: firebaseUser.displayName ?? "",
          });
        } else {
          clearIsAuthenticated();
        }
      },
    );

    return unsubscribe;
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;