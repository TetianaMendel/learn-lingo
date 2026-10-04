"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

import LoginForm from "@/components/LoginForm/LoginForm";
import Modal from "@/components/Modal/Modal";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";

import styles from "./Header.module.css";

type AuthModal = "login" | "register" | null;

const Header = () => {
  const [authModal, setAuthModal] = useState<AuthModal>(null);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const closeModal = () => {
    setAuthModal(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearIsAuthenticated();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.flag} aria-hidden="true">
              <span className={styles.flagBlue}></span>
              <span className={styles.flagYellow}></span>
            </span>

            <span className={styles.logoText}>
              LearnLingo
            </span>
          </Link>

          <nav className={styles.navigation}>
            <Link href="/" className={styles.link}>
              Home
            </Link>

            <Link
              href="/teachers"
              className={styles.link}
            >
              Teachers
            </Link>

            {isAuthenticated && (
              <Link
                href="/favorites"
                className={styles.link}
              >
                Favorites
              </Link>
            )}
          </nav>

          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                {user?.username && (
                  <span className={styles.userName}>
                    {user.username}
                  </span>
                )}

                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={() => setAuthModal("login")}
                >
                  <FiLogIn
                    className={styles.loginIcon}
                    aria-hidden="true"
                  />

                  <span>Log in</span>
                </button>

                <button
                  type="button"
                  className={styles.registerButton}
                  onClick={() =>
                    setAuthModal("register")
                  }
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {authModal === "login" && (
        <Modal onClose={closeModal}>
          <LoginForm onClose={closeModal} />
        </Modal>
      )}

      {authModal === "register" && (
        <Modal onClose={closeModal}>
          <RegistrationForm
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Header;