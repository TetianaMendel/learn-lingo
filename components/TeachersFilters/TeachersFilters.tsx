"use client";

import FilterDropdown from "./FilterDropdown";

import css from "./TeachersFilters.module.css";

type TeachersFiltersProps = {
  language: string;
  level: string;
  price: string;
  onLanguageChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceChange: (value: string) => void;
};

const languageOptions = [
  { value: "", label: "All languages" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Mandarin Chinese", label: "Mandarin Chinese" },
  { value: "Italian", label: "Italian" },
  { value: "Korean", label: "Korean" },
  { value: "Vietnamese", label: "Vietnamese" },
];

const levelOptions = [
  { value: "", label: "All levels" },
  { value: "A1 Beginner", label: "A1 Beginner" },
  { value: "A2 Elementary", label: "A2 Elementary" },
  { value: "B1 Intermediate", label: "B1 Intermediate" },
  { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermediate" },
  { value: "C1 Advanced", label: "C1 Advanced" },
  { value: "C2 Proficient", label: "C2 Proficient" },
];

const priceOptions = [
  { value: "", label: "Any" },
  { value: "25", label: "25 $" },
  { value: "27", label: "27 $" },
  { value: "28", label: "28 $" },
  { value: "30", label: "30 $" },
  { value: "32", label: "32 $" },
  { value: "35", label: "35 $" },
];

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
      <FilterDropdown
        label="Languages"
        value={language}
        options={languageOptions}
        onChange={onLanguageChange}
        className={css.languages}
      />

      <FilterDropdown
        label="Level of knowledge"
        value={level}
        options={levelOptions}
        onChange={onLevelChange}
        className={css.level}
      />

      <FilterDropdown
        label="Price"
        value={price}
        options={priceOptions}
        onChange={onPriceChange}
        className={css.price}
      />
    </div>
  );
};

export default TeachersFilters;