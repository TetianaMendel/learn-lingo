"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiBookOpen, FiHeart } from "react-icons/fi";
import type { Teacher } from "@/types/teacher";
import css from "./TeacherCard.module.css";

type TeacherCardProps = {
  teacher: Teacher;
};

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fullName = `${teacher.name} ${teacher.surname}`;

  return (
    <article className={css.card}>
      <div className={css.avatarColumn}>
        <div className={css.avatarWrapper}>
          <Image
            src={teacher.avatar_url}
            alt={fullName}
            width={96}
            height={96}
            className={css.avatar}
          />
          <span
            className={css.onlineDot}
            aria-label="Teacher is online"
          />
        </div>
      </div>
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.nameBlock}>
            <span className={css.caption}>Languages</span>
            <h2 className={css.name}>{fullName}</h2>
          </div>
          <div className={css.rightBlock}>
            <div className={css.meta}>
              <div className={css.metaItem}>
                <FiBookOpen
                  className={css.bookIcon}
                  aria-hidden="true"
                />
                <span>Lessons online</span>
              </div>
              <span className={css.divider} aria-hidden="true" />
              <div className={css.metaItem}>
                <span>
                  Lessons done: {teacher.lessons_done}
                </span>
              </div>
              <span className={css.divider} aria-hidden="true" />
              <div className={css.metaItem}>
                <FaStar
                  className={css.starIcon}
                  aria-hidden="true"
                />
                <span>Rating: {teacher.rating}</span>
              </div>
              <span className={css.divider} aria-hidden="true" />
              <div className={css.metaItem}>
                <span>
                  Price / 1 hour:{" "}
                  <span className={css.price}>
                    {teacher.price_per_hour}$
                  </span>
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`${css.favoriteButton} ${
                isFavorite ? css.favoriteButtonActive : ""
              }`}
              onClick={() => setIsFavorite((prev) => !prev)}
              aria-label={
                isFavorite
                  ? `Remove ${fullName} from favorites`
                  : `Add ${fullName} to favorites`
              }
              aria-pressed={isFavorite}
            >
              <FiHeart
                className={css.heartIcon}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className={css.details}>
          <p className={css.detail}>
            <span className={css.detailLabel}>Speaks: </span>
            <span className={css.languages}>
              {teacher.languages.join(", ")}
            </span>
          </p>

          <p className={css.detail}>
            <span className={css.detailLabel}>
              Lesson Info:{" "}
            </span>
            <span>{teacher.lesson_info}</span>
          </p>
          <p className={css.detail}>
            <span className={css.detailLabel}>
              Conditions:{" "}
            </span>
            <span>
              {Array.isArray(teacher.conditions)
                ? teacher.conditions.join(" ")
                : teacher.conditions}
            </span>
          </p>
        </div>

        {!isExpanded && (
          <button
            type="button"
            className={css.readMore}
            onClick={() => setIsExpanded(true)}
            aria-expanded={false}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={css.expandedContent}>
            <p className={css.experience}>
              {teacher.experience}
            </p>

            {teacher.reviews.length > 0 && (
              <ul className={css.reviews}>
                {teacher.reviews.map((review, index) => (
                  <li
                    key={`${teacher.id}-${index}`}
                    className={css.reviewItem}
                  >
                    <div className={css.reviewHeader}>
                      <div
                        className={css.reviewAvatar}
                        aria-hidden="true"
                      >
                        {review.reviewer_name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className={css.reviewAuthorInfo}>
                        <span className={css.reviewAuthorName}>
                          {review.reviewer_name}
                        </span>

                        <div className={css.reviewRating}>
                          <FaStar
                            className={css.reviewStar}
                            aria-hidden="true"
                          />

                          <span
                            className={css.reviewRatingValue}
                          >
                            {review.reviewer_rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={css.reviewText}>
                      {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <ul
          className={`${css.levels} ${
            isExpanded ? css.expandedLevels : ""
          }`}
        >
          {teacher.levels.map((level, index) => (
            <li
              key={level}
              className={`${css.level} ${
                index === 0 ? css.activeLevel : ""
              }`}
            >
              #{level}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <button
            type="button"
            className={css.bookButton}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </article>
  );
};

export default TeacherCard;