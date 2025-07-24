import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Створіть асинхронний запит для отримання брендів
export const fetchCarBrands = createAsyncThunk(
  "filters/fetchCarBrands",
  async () => {
    const response = await axios.get(
      "https://car-rental-api.goit.global/brands"
    ); // Замість цього URL використовуйте ваш API
    return response.data; // Очікуємо масив брендів
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    brands: [],
    brand: "",
    priceFrom: null,
    priceTo: null,
    mileage: null,
  },
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarBrands.fulfilled, (state, action) => {
      state.brands = action.payload; // Зберігаємо отримані бренди
    });
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
