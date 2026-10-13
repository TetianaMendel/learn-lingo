"use client";

import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
import { getTeachersPage } from "@/lib/teachers";
import css from "./TeachersList.module.css";

const PAGE_SIZE = 4;

const TeachersList = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filterError, setFilterError] = useState(false);

  const hasActiveFilters =
    language !== "" || level !== "" || price !== "";

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["teachers"],
    queryFn: ({ pageParam }) => getTeachersPage(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore && lastPage.lastKey
        ? lastPage.lastKey
        : undefined,
    retry: false,
  });

  const teachers = useMemo(() => {
    const allTeachers =
      data?.pages.flatMap((page) => page.teachers) ?? [];

    return Array.from(
      new Map(
        allTeachers.map((teacher) => [teacher.id, teacher]),
      ).values(),
    );
  }, [data]);

  useEffect(() => {
    if (
      !hasActiveFilters ||
      !hasNextPage ||
      isPending ||
      isFetchingNextPage ||
      filterError
    ) {
      return;
    }

    let cancelled = false;

    const loadNextPage = async () => {
      const result = await fetchNextPage();

      if (!cancelled && result.isError) {
        setFilterError(true);
      }
    };

    void loadNextPage();

    return () => {
      cancelled = true;
    };
  }, [
    hasActiveFilters,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    filterError,
    fetchNextPage,
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
        teacher.price_per_hour === Number(price);

      return (
        matchesLanguage &&
        matchesLevel &&
        matchesPrice
      );
    });
  }, [teachers, language, level, price]);

  const visibleTeachers = useMemo(
    () => filteredTeachers.slice(0, visibleCount),
    [filteredTeachers, visibleCount],
  );

  const isLoadingFilters =
    hasActiveFilters &&
    hasNextPage &&
    !filterError;

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setVisibleCount(PAGE_SIZE);
    setFilterError(false);
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
    setVisibleCount(PAGE_SIZE);
    setFilterError(false);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    setVisibleCount(PAGE_SIZE);
    setFilterError(false);
  };

  const handleLoadMore = async () => {
    if (isFetchingNextPage) return;

    if (filteredTeachers.length > visibleCount) {
      setVisibleCount((count) => count + PAGE_SIZE);
      return;
    }

    if (!hasNextPage) return;

    const result = await fetchNextPage();

    if (!result.isError) {
      setVisibleCount((count) => count + PAGE_SIZE);
    }
  };

  const shouldShowLoadMore =
    filteredTeachers.length > visibleCount ||
    (!hasActiveFilters && hasNextPage);

  if (isPending) {
    return (
      <div className={css.loadingWrapper}>
        <Loader text="Loading teachers..." />
      </div>
    );
  }

  if (isError && teachers.length === 0) {
    return (
      <p className={css.error}>
        Unable to load teachers. Please try again.
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

      {isLoadingFilters && (
        <div className={css.loadingWrapper}>
          <Loader text="Filtering teachers..." />
        </div>
      )}

      {!isLoadingFilters && visibleTeachers.length > 0 && (
        <>
          <div className={css.list}>
            {visibleTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
              />
            ))}
          </div>

          {(isError || filterError) && (
            <p className={css.error}>
              {error?.message ||
                "Unable to load teachers. Please try again."}
            </p>
          )}

          {shouldShowLoadMore && (
            <button
              type="button"
              className={css.loadMore}
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Loader size="small" />
              ) : (
                "Load more"
              )}
            </button>
          )}
        </>
      )}

      {!isLoadingFilters && visibleTeachers.length === 0 && (
        <p className={css.empty}>
          No teachers found for the selected filters.
        </p>
      )}
    </>
  );
};

export default TeachersList;