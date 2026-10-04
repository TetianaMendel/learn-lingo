"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as yup from "yup";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./LoginForm.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof schema>;

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setFirebaseError("");

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? data.email,
        username: userCredential.user.displayName ?? "",
      });

      onClose();
    } catch (error) {
      console.error(error);

      setFirebaseError("Invalid email or password.");
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Log In</h2>

      <p className={css.description}>
        Welcome back! Please enter your credentials to access your
        account and continue your search for an teacher.
      </p>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={css.field}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email && (
            <p className={css.error}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={css.field}>
          <div className={css.passwordWrapper}>
            <input
              className={css.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              {...register("password")}
            />

            <button
              type="button"
              className={css.passwordButton}
              onClick={() =>
                setShowPassword((current) => !current)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <FiEyeOff aria-hidden="true" />
              ) : (
                <FiEye aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className={css.error}>
              {errors.password.message}
            </p>
          )}
        </div>

        {firebaseError && (
          <p className={css.error}>
            {firebaseError}
          </p>
        )}

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;