import { createSlice } from "@reduxjs/toolkit";


const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState = {
  items: loadFavoritesFromLocalStorage(), 
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
       
        state.items = state.items.filter((favorite) => favorite.id !== car.id);
      } else {
       
        state.items.push(car);
      }

     
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
