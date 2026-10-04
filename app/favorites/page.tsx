"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { getFavoriteIds } from "@/lib/favorites";
import { getTeachersByIds } from "@/lib/teachers";
import { useAuthStore } from "@/lib/store/authStore";
import type { Teacher } from "@/types/teacher";

import css from "./page.module.css";

const FavoritesPage = () => {
  const router = useRouter();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const isAuthInitialized = useAuthStore(
    (state) => state.isAuthInitialized,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthInitialized) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace("/teachers");
      return;
    }

    const loadFavorites = async () => {
      try {
        setIsLoading(true);

        const favoriteIds = getFavoriteIds(user.uid);

        const favoriteTeachers =
          await getTeachersByIds(favoriteIds);

        setTeachers(favoriteTeachers);
      } catch (error) {
        console.error(
          "Failed to load favorite teachers:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadFavorites();
  }, [
    isAuthInitialized,
    isAuthenticated,
    user,
    router,
  ]);

  const handleFavoriteChange = (
    teacherId: string,
    isFavorite: boolean,
  ) => {
    if (isFavorite) {
      return;
    }

    setTeachers((currentTeachers) =>
      currentTeachers.filter(
        (teacher) =>
          teacher.id !== teacherId,
      ),
    );
  };

  if (!isAuthInitialized) {
    return (
      <section className={css.page}>
        <div className={css.container}>
          <p className={css.status}>
            Loading favorites...
          </p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <section className={css.page}>
        <div className={css.container}>
          <p className={css.status}>
            Loading favorites...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={css.page}>
      <div className={css.container}>
        {teachers.length > 0 ? (
          <div className={css.list}>
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onFavoriteChange={
                  handleFavoriteChange
                }
              />
            ))}
          </div>
        ) : (
          <p className={css.empty}>
            You haven&apos;t added any teachers
            to your favorites yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;