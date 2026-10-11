import css from "./Loader.module.css";

type LoaderProps = {
  size?: "small" | "medium";
  text?: string;
};

const Loader = ({
  size = "medium",
  text,
}: LoaderProps) => {
  return (
    <div className={css.wrapper} role="status">
      <span
        className={`${css.spinner} ${
          size === "small" ? css.small : css.medium
        }`}
        aria-hidden="true"
      />

      {text && <p className={css.text}>{text}</p>}

      <span className={css.srOnly}>
        {text || "Loading..."}
      </span>
    </div>
  );
};

export default Loader;