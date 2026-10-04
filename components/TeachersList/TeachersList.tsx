"use client";

import { useEffect, useMemo, useState } from "react";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
import { getTeachersPage } from "@/lib/teachers";
import type { Teacher } from "@/types/teacher";
import css from "./TeachersList.module.css";

const TeachersList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const [lastKey, setLastKey] = useState<string | null>(
    null,
  );

  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  const [isLoadingFilters, setIsLoadingFilters] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null,
  );

  const hasActiveFilters =
    language !== "" ||
    level !== "" ||
    price !== "";

  useEffect(() => {
    const loadInitialTeachers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const {
          teachers: firstTeachers,
          lastKey: newLastKey,
          hasMore: moreAvailable,
        } = await getTeachersPage();

        setTeachers(firstTeachers);
        setLastKey(newLastKey);
        setHasMore(moreAvailable);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load teachers. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadInitialTeachers();
  }, []);

  useEffect(() => {
    if (
      !hasActiveFilters ||
      !hasMore ||
      isLoading
    ) {
      return;
    }

    const loadAllTeachersForFilters =
      async () => {
        try {
          setIsLoadingFilters(true);
          setError(null);

          let currentLastKey: string | null =
            lastKey;

          let moreAvailable: boolean = hasMore;

          const allTeachers = [...teachers];

          while (
            moreAvailable &&
            currentLastKey
          ) {
            const {
              teachers: nextTeachers,
              lastKey: newLastKey,
              hasMore: nextHasMore,
            } = await getTeachersPage(
              currentLastKey,
            );

            const existingIds = new Set(
              allTeachers.map(
                (teacher) => teacher.id,
              ),
            );

            nextTeachers.forEach(
              (teacher) => {
                if (
                  !existingIds.has(teacher.id)
                ) {
                  allTeachers.push(teacher);
                  existingIds.add(
                    teacher.id,
                  );
                }
              },
            );

            currentLastKey = newLastKey;
            moreAvailable = nextHasMore;
          }

          setTeachers(allTeachers);
          setLastKey(currentLastKey);
          setHasMore(moreAvailable);
        } catch (error) {
          console.error(error);

          setError(
            "Unable to load teachers for filtering.",
          );
        } finally {
          setIsLoadingFilters(false);
        }
      };

    void loadAllTeachersForFilters();
  }, [
    hasActiveFilters,
    hasMore,
    isLoading,
    lastKey,
    teachers,
  ]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesLanguage =
        language === "" ||
        teacher.languages.includes(language);

      const matchesLevel =
        level === "" ||
        teacher.levels.includes(level);

      const matchesPrice =
        price === "" ||
        teacher.price_per_hour ===
          Number(price);

      return (
        matchesLanguage &&
        matchesLevel &&
        matchesPrice
      );
    });
  }, [
    teachers,
    language,
    level,
    price,
  ]);

  const handleLoadMore = async () => {
    if (
      !lastKey ||
      !hasMore ||
      isLoadingMore ||
      hasActiveFilters
    ) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError(null);

      const {
        teachers: nextTeachers,
        lastKey: newLastKey,
        hasMore: moreAvailable,
      } = await getTeachersPage(lastKey);

      setTeachers((currentTeachers) => {
        const existingIds = new Set(
          currentTeachers.map(
            (teacher) => teacher.id,
          ),
        );

        const uniqueNewTeachers =
          nextTeachers.filter(
            (teacher) =>
              !existingIds.has(teacher.id),
          );

        return [
          ...currentTeachers,
          ...uniqueNewTeachers,
        ];
      });

      setLastKey(newLastKey);
      setHasMore(moreAvailable);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load more teachers. Please try again.",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return (
      <p className={css.status}>
        Loading teachers...
      </p>
    );
  }

  if (
    error &&
    teachers.length === 0
  ) {
    return (
      <p className={css.error}>
        {error}
      </p>
    );
  }

  return (
    <>
      <TeachersFilters
        language={language}
        level={level}
        price={price}
        onLanguageChange={setLanguage}
        onLevelChange={setLevel}
        onPriceChange={setPrice}
      />

      {isLoadingFilters && (
        <p className={css.status}>
          Filtering teachers...
        </p>
      )}

      {!isLoadingFilters &&
        filteredTeachers.length > 0 && (
          <>
            <div className={css.list}>
              {filteredTeachers.map(
                (teacher) => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                  />
                ),
              )}
            </div>

            {error && (
              <p className={css.error}>
                {error}
              </p>
            )}

            {!hasActiveFilters &&
              hasMore && (
                <button
                  type="button"
                  className={css.loadMore}
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore
                    ? "Loading..."
                    : "Load more"}
                </button>
              )}
          </>
        )}

      {!isLoadingFilters &&
        filteredTeachers.length === 0 && (
          <p className={css.empty}>
            No teachers found for the
            selected filters.
          </p>
        )}
    </>
  );
};

export default TeachersList;