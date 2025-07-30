import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarBrands } from "../../redux/filters/operations.js";
import css from "./Filter.module.css";

const Filter = ({ onFilter }) => {
  const dispatch = useDispatch();
  const { brands, brand, priceFrom, mileage } = useSelector(
    (state) => state.filters
  );
  const [localBrand, setLocalBrand] = useState(brand);
  const [localPriceFrom, setLocalPriceFrom] = useState(priceFrom || "");
  const [localMileageFrom, setLocalMileageFrom] = useState(mileage?.from || "");
  const [localMileageTo, setLocalMileageTo] = useState(mileage?.to || "");

  const formatNumber = (value) => {
    // Форматування числа з комами
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    dispatch(fetchCarBrands());
  }, [dispatch]);

  // Обробка зміни пробігу
  const handleMileageChange = (e, setState) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Очищаємо від нечислових символів
    value = value ? formatNumber(value) : ""; // Форматуємо число з комами
    setState(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      brand: localBrand || null,
      rentalPrice: localPriceFrom || null,
      minMileage: localMileageFrom ? localMileageFrom.replace(/,/g, "") : null, // Видаляємо коми перед відправкою
      maxMileage: localMileageTo || null,
    };

    onFilter(filters);
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
            <option className={css.option} value="30">
              30$
            </option>
            <option className={css.option} value="40">
              40$
            </option>
            <option className={css.option} value="50">
              50$
            </option>
            <option className={css.option} value="60">
              60$
            </option>
            <option className={css.option} value="70">
              70$
            </option>
            <option className={css.option} value="80">
              80$
            </option>
          </select>
        </label>

        <label className={css.label}>
          Car mileage / km:
          <div className={css.inline}>
            <input
              className={css.inputAfter}
              type="text"
              placeholder="From"
              value={localMileageFrom ? `From ${localMileageFrom}` : "From"}
              onChange={(e) => handleMileageChange(e, setLocalMileageFrom)}
            />
            <div className={css.separator}></div>
            <input
              className={css.inputBeffore}
              type="text"
              placeholder="To"
              value={localMileageTo ? `To ${localMileageTo}` : "To"}
              onChange={(e) => handleMileageChange(e, setLocalMileageTo)}
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
