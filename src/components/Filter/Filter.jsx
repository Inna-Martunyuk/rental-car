import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarBrands, setFilters } from "../../redux/filters/slice"; // Імпортуємо асинхронний запит
import css from "./Filter.module.css"; // Імпортуємо стилі

const Filter = ({ onFilter }) => {
  const dispatch = useDispatch();
  const { brands, brand, priceFrom, priceTo, mileage } = useSelector(
    (state) => state.filters
  ); // Отримуємо список брендів з Redux

  // Ініціалізація локальних стейтів
  const [localBrand, setLocalBrand] = useState(brand); // Локальний стан для фільтра бренду
  const [localPriceFrom, setLocalPriceFrom] = useState(priceFrom || ""); // Локальний стан для priceFrom
  const [localPriceTo, setLocalPriceTo] = useState(priceTo || ""); // Локальний стан для priceTo
  const [localMileageFrom, setLocalMileageFrom] = useState(mileage?.from || ""); // Локальний стан для mileageFrom
  const [localMileageTo, setLocalMileageTo] = useState(mileage?.to || ""); // Локальний стан для mileageTo

  useEffect(() => {
    dispatch(fetchCarBrands()); // Завантажуємо бренди при монтуванні компонента
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Передача фільтрів, включаючи mileage
    onFilter({
      brand: localBrand,
      priceFrom: localPriceFrom ? Number(localPriceFrom) : null,
      priceTo: localPriceTo ? Number(localPriceTo) : null,
      mileageFrom: localMileageFrom ? Number(localMileageFrom) : null,
      mileageTo: localMileageTo ? Number(localMileageTo) : null,
    });
  };

  return (
    <form className={css.filter} onSubmit={handleSubmit}>
      <div className={css.sectionForm}>
        <label className={css.label}>
          Car brand:
          <select
            value={localBrand}
            onChange={(e) => setLocalBrand(e.target.value)}
            className={css.select}
          >
            <option value="">Choose a brand</option>
            {brands.length === 0 ? (
              <option value="">Loading brands...</option>
            ) : (
              brands.map((brand) => (
                <option key={brand} className={css.option} value={brand}>
                  {brand}
                </option>
              ))
            )}
          </select>
        </label>

        <label className={css.label}>
          Price / 1 hour:
          <select
            value={localPriceFrom}
            onChange={(e) => setLocalPriceFrom(e.target.value)}
            className={css.select}
          >
            <option value="">Choose price</option>
            <option className={css.option} value="30">30$</option>
            <option className={css.option} value="40">40$</option>
            <option className={css.option} value="50">50$</option>
            <option className={css.option} value="60">60$</option>
            <option className={css.option} value="70">70$</option>
            <option className={css.option} value="80">80$</option>
          </select>
        </label>

        <label className={css.label}>
          Car mileage / km:
          <div className={css.inline}>
            <input
              className={css.inputAfter}
              type="number"
              placeholder="From"
              value={localMileageFrom}
              onChange={(e) => setLocalMileageFrom(e.target.value)}
            />
            <div className={css.separator}></div>
            <input
              className={css.inputBeffore}
              type="number"
              placeholder="To"
              value={localMileageTo}
              onChange={(e) => setLocalMileageTo(e.target.value)}
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
};

export default Filter;
