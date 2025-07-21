import css from "./HomePage.module.css";
import { Link } from "react-router-dom";

function HomePage() {
    return (
      <>
        <div className={css.hero}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link to="/catalog" className={css.button}>
            View Catalog
          </Link>
        </div>
      </>
    );
}

export default HomePage;
