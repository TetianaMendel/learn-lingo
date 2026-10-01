"use client";

import { useEffect, useMemo, useState } from "react";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
import { getTeachers } from "@/lib/teachers";
import type { Teacher } from "@/types/teacher";
import css from "./TeachersList.module.css";

const ITEMS_PER_PAGE = 4;

const TeachersList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const [visibleCount, setVisibleCount] =
    useState(ITEMS_PER_PAGE);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error(error);
        setError(
          "Unable to load teachers. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesLanguage =
        !language ||
        teacher.languages.includes(language);

      const matchesLevel =
        !level || teacher.levels.includes(level);

      const matchesPrice =
        !price ||
        teacher.price_per_hour <= Number(price);

      return (
        matchesLanguage &&
        matchesLevel &&
        matchesPrice
      );
    });
  }, [teachers, language, level, price]);

  const visibleTeachers = filteredTeachers.slice(
    0,
    visibleCount,
  );

  const hasMore =
    visibleCount < filteredTeachers.length;

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      setError(null);

      const freshTeachers = await getTeachers();

      setTeachers(freshTeachers);

      setVisibleCount(
        (current) => current + ITEMS_PER_PAGE,
      );
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

  if (error && teachers.length === 0) {
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
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        onPriceChange={handlePriceChange}
      />

      {visibleTeachers.length > 0 ? (
        <>
          <div className={css.list}>
            {visibleTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
              />
            ))}
          </div>

          {error && (
            <p className={css.error}>
              {error}
            </p>
          )}

          {hasMore && (
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
      ) : (
        <p className={css.empty}>
          No teachers found for the selected filters.
        </p>
      )}
    </>
  );
};

export default TeachersList;