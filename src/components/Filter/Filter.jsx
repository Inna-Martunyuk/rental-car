import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarBrands } from "../../redux/filters/slice"; 
import css from "./Filter.module.css"; 

const Filter = ({ onFilter }) => {
  const dispatch = useDispatch();
  const { brands, brand, priceFrom,  mileage } = useSelector(
    (state) => state.filters
  ); 
  const [localBrand, setLocalBrand] = useState(brand); 
  const [localPriceFrom, setLocalPriceFrom] = useState(priceFrom || ""); 
  const [localMileageFrom, setLocalMileageFrom] = useState(mileage?.from || ""); 
  const [localMileageTo, setLocalMileageTo] = useState(mileage?.to || ""); 

  useEffect(() => {
    dispatch(fetchCarBrands()); 
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

 
    const filters = {
      brand: localBrand,
      rentalPrice: localPriceFrom ? String(localPriceFrom) : null, 
      minMileage: localMileageFrom ? String(localMileageFrom) : null, 
      maxMileage: localMileageTo ? String(localMileageTo) : null, 
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
