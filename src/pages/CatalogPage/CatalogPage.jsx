import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/opetations.js";
import { incrementPage, resetCars, setPage } from "../../redux/cars/slice";
import CarList from "../../components/CarList/CarList";
import Filter from "../../components/Filter/Filter";
import LoadMore from "../../components/LoadMore/LoadMore";
import { setFilters } from "../../redux/filters/slice";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, page, limit, hasMore } = useSelector(
    (state) => state.cars
  );
  const filters = useSelector((state) => state.filters);

 
  useEffect(() => {
    dispatch(resetCars());
    dispatch(setPage(1));
  }, [filters, dispatch]);


  useEffect(() => {
    if (filters) {
      dispatch(fetchCars({ filters, page, limit }));
    }
  }, [dispatch, filters, page, limit]);

  return (
    <div>
      {isLoading && <Loader />}

  
      {error && <p className={css.errorMessage}>Error: {error}</p>}

      <Filter onFilter={(filters) => dispatch(setFilters(filters))} />
      <CarList cars={items} />

      {hasMore && !isLoading && (
        <LoadMore onClick={() => dispatch(incrementPage())} />
      )}

      {!hasMore && !isLoading && items.length > 0 && (
        <p className={css.noMoreCarsMessage}>No more cars found</p>
      )}

      {!isLoading && items.length === 0 && (
        <p className={css.NoCarsMessage}>No cars available</p>
      )}
    </div>
  );
};

export default CatalogPage;
