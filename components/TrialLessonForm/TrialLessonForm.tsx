"use client";

import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import type { Teacher } from "@/types/teacher";
import css from "./TrialLessonForm.module.css";

const schema = yup.object({
  reason: yup
    .string()
    .required("Please choose a reason"),

  fullName: yup
    .string()
    .trim()
    .required("Full name is required"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required"),
});

type TrialLessonFormData = yup.InferType<typeof schema>;

type TrialLessonFormProps = {
  teacher: Teacher;
  onClose: () => void;
};

const TrialLessonForm = ({
  teacher,
  onClose,
}: TrialLessonFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TrialLessonFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      reason: "career",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const fullName = `${teacher.name} ${teacher.surname}`;

  const onSubmit = async () => {
    toast.success(
      `Trial lesson with ${fullName} booked successfully!`,
    );

    onClose();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.intro}>
        <h2 className={css.title}>
          Book trial lesson
        </h2>

        <p className={css.description}>
          Our experienced tutor will assess your current
          language level, discuss your learning goals, and
          tailor the lesson to your specific needs.
        </p>

        <div className={css.teacher}>
          <Image
            src={teacher.avatar_url}
            alt={fullName}
            width={44}
            height={44}
            className={css.avatar}
          />

          <div className={css.teacherInfo}>
            <span className={css.teacherLabel}>
              Your teacher
            </span>

            <span className={css.teacherName}>
              {fullName}
            </span>
          </div>
        </div>
      </div>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>

          <div className={css.radioGroup}>
            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                value="career"
                {...register("reason")}
              />

              <span className={css.customRadio} />

              <span>
                Career and business
              </span>
            </label>

            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                value="children"
                {...register("reason")}
              />

              <span className={css.customRadio} />

              <span>
                Lesson for kids
              </span>
            </label>

            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                value="abroad"
                {...register("reason")}
              />

              <span className={css.customRadio} />

              <span>
                Living abroad
              </span>
            </label>

            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                value="exams"
                {...register("reason")}
              />

              <span className={css.customRadio} />

              <span>
                Exams and coursework
              </span>
            </label>

            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                value="culture"
                {...register("reason")}
              />

              <span className={css.customRadio} />

              <span>
                Culture, travel or hobby
              </span>
            </label>
          </div>

          {errors.reason && (
            <p className={css.error}>
              {errors.reason.message}
            </p>
          )}
        </fieldset>

        <div className={css.inputs}>
          <div className={css.field}>
            <input
              className={css.input}
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              {...register("fullName")}
            />

            {errors.fullName && (
              <p className={css.error}>
                {errors.fullName.message}
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
            <input
              className={css.input}
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
              {...register("phone")}
            />

            {errors.phone && (
              <p className={css.error}>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Booking..."
            : "Book"}
        </button>
      </form>
    </div>
  );
};

export default TrialLessonForm;