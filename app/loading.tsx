import Loader from "@/components/Loader/Loader";

import css from "./loading.module.css";

const Loading = () => {
  return (
    <div className={css.loaderWrapper}>
      <Loader text="Loading..." />
    </div>
  );
};

export default Loading;