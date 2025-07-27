import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavoritesFromAPI = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`/api/favorites/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
