"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import css from "./TeachersFilters.module.css";

type Option = {
  value: string;
  label: string;
};

type FilterDropdownProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className: string;
};

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  className,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  const selectedIndex = options.findIndex(
    (option) => option.value === value,
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const openDropdown = (focusIndex?: number) => {
    setIsOpen(true);

    if (focusIndex !== undefined) {
      requestAnimationFrame(() => {
        optionRefs.current[focusIndex]?.focus();
      });
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      const index =
        selectedIndex >= 0
          ? selectedIndex
          : 0;

      openDropdown(index);
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      optionRefs.current[
        (index + 1) % options.length
      ]?.focus();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      optionRefs.current[
        (index - 1 + options.length) % options.length
      ]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      optionRefs.current[0]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      optionRefs.current[options.length - 1]?.focus();
    }
  };

  return (
    <div className={css.filterGroup}>
      <span className={css.label}>{label}</span>

      <div
        ref={wrapperRef}
        className={`${css.selectWrapper} ${className}`}
      >
        <button
          ref={buttonRef}
          type="button"
          className={css.select}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleButtonKeyDown}
        >
          <span className={css.selectedText}>
            {selectedOption?.label ?? options[0].label}
          </span>

          <FiChevronDown
            className={`${css.selectIcon} ${
              isOpen ? css.iconOpen : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div
            className={css.dropdown}
            role="listbox"
            aria-label={label}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={`${css.option} ${
                  value === option.value
                    ? css.optionSelected
                    : ""
                }`}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(event) =>
                  handleOptionKeyDown(event, index)
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;