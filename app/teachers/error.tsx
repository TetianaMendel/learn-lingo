"use client";

import css from "./error.module.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const TeachersError = ({ reset }: Props) => {
  return (
    <section className={css.section}>
      <div className={css.content}>
        <span className={css.errorCode}>
          Oops!
        </span>

        <h1 className={css.title}>
          Something went wrong
        </h1>

        <p className={css.description}>
          We couldn&apos;t load the teachers.
          Please try again.
        </p>

        <button
          type="button"
          className={css.retryButton}
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </section>
  );
};

export default TeachersError;