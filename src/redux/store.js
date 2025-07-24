import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../redux/cars/slice.js";
import filtersReducer from "../redux/filters/slice.js";
import favoritesReducer from "../redux/favorites/slice.js"; 

const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer, 
  },
});

export default store;
