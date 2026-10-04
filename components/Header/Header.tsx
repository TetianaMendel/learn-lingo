"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";

import LoginForm from "@/components/LoginForm/LoginForm";
import Modal from "@/components/Modal/Modal";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";

import styles from "./Header.module.css";

type AuthModal = "login" | "register" | null;

const Header = () => {
  const [authModal, setAuthModal] =
    useState<AuthModal>(null);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isMenuOpen]);

  const closeModal = () => {
    setAuthModal(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLogin = () => {
    closeMenu();
    setAuthModal("login");
  };

  const openRegistration = () => {
    closeMenu();
    setAuthModal("register");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      clearIsAuthenticated();
      closeMenu();
    } catch (error) {
      console.error(
        "Logout failed:",
        error,
      );
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link
            href="/"
            className={styles.logo}
            onClick={closeMenu}
          >
            <span
              className={styles.flag}
              aria-hidden="true"
            >
              <span
                className={styles.flagBlue}
              />
              <span
                className={styles.flagYellow}
              />
            </span>

            <span className={styles.logoText}>
              LearnLingo
            </span>
          </Link>

          <nav className={styles.navigation}>
            <Link
              href="/"
              className={styles.link}
            >
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
                  <span
                    className={
                      styles.userName
                    }
                  >
                    {user.username}
                  </span>
                )}

                <button
                  type="button"
                  className={
                    styles.logoutButton
                  }
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={
                    styles.loginButton
                  }
                  onClick={openLogin}
                >
                  <FiLogIn
                    className={
                      styles.loginIcon
                    }
                    aria-hidden="true"
                  />

                  <span>Log in</span>
                </button>

                <button
                  type="button"
                  className={
                    styles.registerButton
                  }
                  onClick={openRegistration}
                >
                  Registration
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() =>
              setIsMenuOpen(
                (current) => !current,
              )
            }
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div
            className={
              styles.mobileMenuContainer
            }
          >
            <div
              className={
                styles.mobileMenuHeader
              }
            >
              <Link
                href="/"
                className={styles.logo}
                onClick={closeMenu}
              >
                <span
                  className={styles.flag}
                  aria-hidden="true"
                >
                  <span
                    className={
                      styles.flagBlue
                    }
                  />
                  <span
                    className={
                      styles.flagYellow
                    }
                  />
                </span>

                <span
                  className={
                    styles.logoText
                  }
                >
                  LearnLingo
                </span>
              </Link>

              <button
                type="button"
                className={
                  styles.closeMenuButton
                }
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <div
              className={
                styles.mobileMenuContent
              }
            >
              <nav
                className={
                  styles.mobileNavigation
                }
              >
                <Link
                  href="/"
                  className={
                    styles.mobileLink
                  }
                  onClick={closeMenu}
                >
                  Home
                </Link>

                <Link
                  href="/teachers"
                  className={
                    styles.mobileLink
                  }
                  onClick={closeMenu}
                >
                  Teachers
                </Link>

                {isAuthenticated && (
                  <Link
                    href="/favorites"
                    className={
                      styles.mobileLink
                    }
                    onClick={closeMenu}
                  >
                    Favorites
                  </Link>
                )}
              </nav>

              <div
                className={
                  styles.mobileActions
                }
              >
                {isAuthenticated ? (
                  <>
                    {user?.username && (
                      <span
                        className={
                          styles.mobileUserName
                        }
                      >
                        {user.username}
                      </span>
                    )}

                    <button
                      type="button"
                      className={
                        styles.mobileActionButton
                      }
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className={
                        styles.mobileActionButton
                      }
                      onClick={openLogin}
                    >
                      Log in
                    </button>

                    <button
                      type="button"
                      className={
                        styles.mobileActionButton
                      }
                      onClick={
                        openRegistration
                      }
                    >
                      Registration
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {authModal === "login" && (
        <Modal onClose={closeModal}>
          <LoginForm
            onClose={closeModal}
          />
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