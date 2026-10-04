"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/authStore";

const FavoritesPage = () => {
  const router = useRouter();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/teachers");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section>
      <h1>Favorites</h1>
    </section>
  );
};

export default FavoritesPage;