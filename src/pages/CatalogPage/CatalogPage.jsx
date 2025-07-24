import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCars,
  incrementPage,
  resetCars,
  setPage,
} from "../../redux/cars/slice";
import CarList from "../../components/CarList/CarList";
import Filter from "../../components/Filter/Filter";
import LoadMore from "../../components/LoadMore/LoadMore";
import { setFilters } from "../../redux/filters/slice"; 

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
    dispatch(fetchCars({ filters, page, limit }));
  }, [dispatch, filters, page, limit]);

  return (
    <div>
      {isLoading && <p>Loading cars...</p>}
      {error && <p>Error: {error}</p>}
      <Filter onFilter={(filters) => dispatch(setFilters(filters))} />
      <CarList cars={items} />
      {hasMore && !isLoading && (
        <LoadMore onClick={() => dispatch(incrementPage())} />
      )}
      {!hasMore && !isLoading && items.length > 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          No more cars found
        </p>
      )}
      {!isLoading && items.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          No cars found with current filters
        </p>
      )}
    </div>
  );
};

export default CatalogPage;
