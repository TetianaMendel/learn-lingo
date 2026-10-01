import type { Metadata } from "next";

import TeachersList from "@/components/TeachersList/TeachersList";

import css from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Teachers | LearnLingo",
    description: "Choose a language teacher and start learning online.",
    openGraph: {
      title: "Teachers | LearnLingo",
      description: "Choose a language teacher and start learning online.",
      type: "website",
    },
  };
}

export default function TeachersPage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <TeachersList />
      </div>
    </section>
  );
}