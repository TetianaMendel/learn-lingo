"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as yup from "yup";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./RegistrationForm.module.css";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type RegistrationFormData = yup.InferType<typeof schema>;

type RegistrationFormProps = {
  onClose: () => void;
};

const RegistrationForm = ({
  onClose,
}: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (
    data: RegistrationFormData,
  ) => {
    try {
      setFirebaseError("");

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? data.email,
        username: data.name,
      });

      onClose();
    } catch (error) {
      console.error(error);

      setFirebaseError(
        "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>
        Registration
      </h2>

      <p className={css.description}>
        Thank you for your interest in our platform! In order to
        register, we need some information. Please provide us with
        the following information.
      </p>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={css.field}>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            autoComplete="name"
            {...register("name")}
          />

          {errors.name && (
            <p className={css.error}>
              {errors.name.message}
            </p>
          )}
        </div>

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
              autoComplete="new-password"
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
          {isSubmitting
            ? "Registering..."
            : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;