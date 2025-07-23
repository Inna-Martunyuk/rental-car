import { useState } from "react";
import css from "./Filter.module.css";

function Filter({ onFilter }) {
  const [brand, setBrand] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      brand,
      pricePerHour: Number(pricePerHour),
      mileageFrom: Number(mileageFrom),
      mileageTo: Number(mileageTo),
    });
  };

  const handleReset = () => {
    setBrand("");
    setPricePerHour("");
    setMileageFrom("");
    setMileageTo("");
    onFilter({}); // опційно скидає фільтр
  };

  return (
    <form className={css.filter} onSubmit={handleSubmit}>
      <div className={css.sectionForm}>
        <label className={css.label}>
          Car brand:
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={css.select}
          >
            <option value="">Choose a brand</option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Bentley">Bentley</option>
            <option value="Buick">Buick</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Chrysler">Chrysler</option>
            <option value="GMC">GMC</option>
            <option value="Hammer">Hammer</option>
          </select>
        </label>

        <label className={css.label}>
          Price / 1 hour:
          <select
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            className={css.select}
          >
            <option value="">Choose price</option>
            <option value="30">30$</option>
            <option value="40">40$</option>
            <option value="50">50$</option>
            <option value="60">60$</option>
            <option value="70">70$</option>
            <option value="80">80$</option>
          </select>
        </label>

        <label className={css.label}>
          Car mileage / km:
          <div className={css.inline}>
            <input
              className={css.inputAfter}
              type="number"
              placeholder="From"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
            />
            <div className={css.separator}></div>
            <input
              className={css.inputBeffore}
              type="number"
              placeholder="To"
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
            />
          </div>
        </label>
      </div>

      <div className={css.actions}>
        <button className={css.btn} type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default Filter;
