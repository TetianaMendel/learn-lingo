import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";

import { database } from "./firebase";
import type { Teacher } from "../types/teacher";

const PAGE_SIZE = 4;

export interface TeachersPage {
  teachers: Teacher[];
  lastKey: string | null;
  hasMore: boolean;
}

export const getTeachersPage = async (
  lastKey: string | null = null,
): Promise<TeachersPage> => {
  const teachersRef = ref(database, "teachers");

  const teachersQuery = lastKey
    ? query(
        teachersRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE + 1),
      )
    : query(
        teachersRef,
        orderByKey(),
        limitToFirst(PAGE_SIZE + 1),
      );

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return {
      teachers: [],
      lastKey: null,
      hasMore: false,
    };
  }

  const loadedTeachers: Teacher[] = [];

  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.key;
    const data = childSnapshot.val();

    if (!id) {
      return;
    }

    loadedTeachers.push({
      ...data,
      id,
    });
  });

  const hasMore = loadedTeachers.length > PAGE_SIZE;

  const teachers = hasMore
    ? loadedTeachers.slice(0, PAGE_SIZE)
    : loadedTeachers;

  const newLastKey =
    teachers.length > 0
      ? teachers[teachers.length - 1].id
      : null;

  return {
    teachers,
    lastKey: newLastKey,
    hasMore,
  };
};