const getFavoritesKey = (userId: string) =>
  `favorites_${userId}`;

export const getFavoriteIds = (
  userId: string,
): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const favorites = localStorage.getItem(
    getFavoritesKey(userId),
  );

  if (!favorites) {
    return [];
  }

  try {
    const parsedFavorites: unknown =
      JSON.parse(favorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter(
      (id): id is string => typeof id === "string",
    );
  } catch {
    return [];
  }
};

export const isFavoriteTeacher = (
  userId: string,
  teacherId: string,
): boolean => {
  return getFavoriteIds(userId).includes(teacherId);
};

export const addFavoriteTeacher = (
  userId: string,
  teacherId: string,
): void => {
  const favoriteIds = getFavoriteIds(userId);

  if (favoriteIds.includes(teacherId)) {
    return;
  }

  const updatedFavorites = [
    ...favoriteIds,
    teacherId,
  ];

  localStorage.setItem(
    getFavoritesKey(userId),
    JSON.stringify(updatedFavorites),
  );
};

export const removeFavoriteTeacher = (
  userId: string,
  teacherId: string,
): void => {
  const favoriteIds = getFavoriteIds(userId);

  const updatedFavorites = favoriteIds.filter(
    (id) => id !== teacherId,
  );

  localStorage.setItem(
    getFavoritesKey(userId),
    JSON.stringify(updatedFavorites),
  );
};