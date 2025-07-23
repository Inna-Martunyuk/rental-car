import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../redux/cars/slice.js";
import filtersReducer from "../redux/filter/slice.js";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
  },
});

export default store;
