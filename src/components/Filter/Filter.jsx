import { useState } from "react";
import css from "./Filter.module.css";

function Filter({ onFilter }) {
  const [brand, setBrand] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [mileage, setMileage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ brand, priceFrom, priceTo, mileage });
  };

  return (
    <form className={css.filter} onSubmit={handleSubmit}>
      <label className={css.label}>
        Car brand:
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={css.select}
        >
          <option className={css.option} value="">Choose a brand</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Tesla">Tesla</option>
        </select>
      </label>

      <label className={css.label}>
        Price / 1 hour:
        <select
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          className={css.select}
        >
          <option value="">Choose mileage</option>
          <option value="low">до 50 000</option>
          <option value="medium">50 000–100 000</option>
          <option value="high">100 000+</option>
        </select>
      </label>

      <label className={css.label}>
        Car mileage / km:
        <div className={css.inline}>
          <input
            className={css.inputAfter}
            type="number"
            placeholder="From"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <div className={css.separator}></div>
          <input
            className={css.inputBeffore}
            type="number"
            placeholder="To"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
      </label>

      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}

export default Filter;
