import { get, ref } from "firebase/database";

import { database } from "./firebase";
import type { Teacher } from "../types/teacher";

export const getTeachers = async (): Promise<Teacher[]> => {
  const teachersRef = ref(database, "teachers");
  const snapshot = await get(teachersRef);

  if (!snapshot.exists()) {
    return [];
  }

  const teachers: Teacher[] = [];

  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.key;
    const data = childSnapshot.val();

    if (!id) {
      return;
    }

    teachers.push({
      ...data,
      id,
    });
  });

  return teachers;
};