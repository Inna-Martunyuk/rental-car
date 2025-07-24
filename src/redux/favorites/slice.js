import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // масив улюблених автомобілів
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const car = action.payload;
      const isAlreadyFavorite = state.items.some(
        (favorite) => favorite.id === car.id
      );

      if (isAlreadyFavorite) {
        // Якщо автомобіль вже в улюблених, видаляємо його
        state.items = state.items.filter((favorite) => favorite.id !== car.id);
      } else {
        // Якщо автомобіль ще не в улюблених, додаємо його
        state.items.push(car);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
