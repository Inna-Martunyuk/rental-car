import css from "./LoadMore.module.css"
const LoadMore = ({ onClick }) => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button className={css.button} onClick={onClick}>Load More</button>
    </div>
  );
};

export default LoadMore;
