"use client";

import { FiChevronDown } from "react-icons/fi";

import css from "./TeachersFilters.module.css";

type TeachersFiltersProps = {
  language: string;
  level: string;
  price: string;
  onLanguageChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceChange: (value: string) => void;
};

const TeachersFilters = ({
  language,
  level,
  price,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}: TeachersFiltersProps) => {
  return (
    <div className={css.filters}>
      <label className={css.filterGroup}>
        <span className={css.label}>Languages</span>

        <div className={`${css.selectWrapper} ${css.languages}`}>
          <select
            className={css.select}
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            <option value="">All languages</option>
            <option value="French">French</option>
            <option value="English">English</option>
            <option value="German">German</option>
            <option value="Mandarin Chinese">Mandarin Chinese</option>
            <option value="Spanish">Spanish</option>
          </select>

          <FiChevronDown
            className={css.selectIcon}
            aria-hidden="true"
          />
        </div>
      </label>

      <label className={css.filterGroup}>
        <span className={css.label}>Level of knowledge</span>

        <div className={`${css.selectWrapper} ${css.level}`}>
          <select
            className={css.select}
            value={level}
            onChange={(event) => onLevelChange(event.target.value)}
          >
            <option value="">All levels</option>
            <option value="A1 Beginner">A1 Beginner</option>
            <option value="A2 Elementary">A2 Elementary</option>
            <option value="B1 Intermediate">B1 Intermediate</option>
            <option value="B2 Upper-Intermediate">
              B2 Upper-Intermediate
            </option>
          </select>

          <FiChevronDown
            className={css.selectIcon}
            aria-hidden="true"
          />
        </div>
      </label>

      <label className={css.filterGroup}>
        <span className={css.label}>Price</span>

        <div className={`${css.selectWrapper} ${css.price}`}>
          <select
            className={css.select}
            value={price}
            onChange={(event) => onPriceChange(event.target.value)}
          >
            <option value="">Any</option>
            <option value="20">20 $</option>
            <option value="25">25 $</option>
            <option value="30">30 $</option>
            <option value="35">35 $</option>
            <option value="40">40 $</option>
          </select>

          <FiChevronDown
            className={css.selectIcon}
            aria-hidden="true"
          />
        </div>
      </label>
    </div>
  );
};

export default TeachersFilters;