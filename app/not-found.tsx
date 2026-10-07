'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from "./not-found.module.css";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={css.page}>
      <div className={css.content}>
        <span className={css.errorCode}>404</span>

        <h1 className={css.title}>
          Page not found
        </h1>

        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
          You will be redirected to the home page in a few
          seconds.
        </p>
      </div>
    </main>
  );
};

export default NotFound;