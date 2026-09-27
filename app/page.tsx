import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import css from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "LearnLingo | Find your language tutor",
    description:
      "Find experienced language tutors and improve your language skills.",
    openGraph: {
      title: "LearnLingo",
      description:
        "Find experienced language tutors and improve your language skills.",
      type: "website",
    },
  };
}

const statistics = [
  {
    value: "32,000 +",
    text: (
      <>
        Experienced
        <br />
        tutors
      </>
    ),
  },
  {
    value: "300,000 +",
    text: (
      <>
        5-star tutor
        <br />
        reviews
      </>
    ),
  },
  {
    value: "120 +",
    text: (
      <>
        Subjects
        <br />
        taught
      </>
    ),
  },
  {
    value: "200 +",
    text: (
      <>
        Tutor
        <br />
        nationalities
      </>
    ),
  },
];

export default function Home() {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.heroTop}>
          <div className={css.content}>
            <h1 className={css.title}>
              Unlock your potential with the best{" "}
              <span className={css.highlight}>language</span> tutors
            </h1>

            <p className={css.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <Link href="/teachers" className={css.startButton}>
              Get started
            </Link>
          </div>

          <div className={css.imageWrapper}>
            <Image
              src="/images/hero-girl.png"
              alt="Language tutor"
              width={678}
              height={678}
              priority
              className={css.girl}
            />

            <Image
              src="/images/hero-mac.svg"
              alt=""
              width={360}
              height={176}
              className={css.mac}
            />
          </div>
        </div>

        <div className={css.stats}>
          <div className={css.statsList}>
            {statistics.map((item) => (
              <div className={css.statItem} key={item.value}>
                <span className={css.statValue}>{item.value}</span>
                <span className={css.statText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


