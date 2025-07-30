import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/opetations.js";
import { incrementPage, resetCars, setPage } from "../../redux/cars/slice";
import CarList from "../../components/CarList/CarList";
import Filter from "../../components/Filter/Filter";
import LoadMore from "../../components/LoadMore/LoadMore";
import { setFilters } from "../../redux/filters/slice";
import Loader from "../../components/Loader/Loader.jsx";

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
      {isLoading && <Loader />} {/* Лоадер при завантаженні */}
      {error && (
        <p
          style={{
            textAlign: "center",
            color: "#f44336",
            fontSize: "16px",
            zIndex: 10,
            marginTop: "20px", // Доданий відступ
          }}
        >
          Error: {error}
        </p>
      )}
      <Filter onFilter={(filters) => dispatch(setFilters(filters))} />
      <CarList cars={items} />
      {hasMore && !isLoading && (
        <LoadMore onClick={() => dispatch(incrementPage())} />
      )}
      {!hasMore && !isLoading && items.length > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#555",
            fontSize: "16px",
            zIndex: 10,
          }}
        >
          No more cars found
        </p>
      )}
      {!isLoading && items.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#555",
            fontSize: "16px",
            zIndex: 10,
            marginBottom: "40px", // Додано нижній відступ, щоб уникнути накладання
          }}
        >
          No cars available
        </p>
      )}
    </div>
  );

};

export default CatalogPage;
