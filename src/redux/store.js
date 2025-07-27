import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import carsReducer from "../redux/cars/slice.js";
import filtersReducer from "../redux/filters/slice.js";
import favoritesReducer from "../redux/favorites/slice.js";


const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["items"], 
};

const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer), 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
