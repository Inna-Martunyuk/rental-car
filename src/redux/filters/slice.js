import { createSlice } from "@reduxjs/toolkit";
import { fetchCarBrands } from "./operations.js"; 

const initialState = {
  brands: [],
  brand: "",
  priceFrom: null,
  priceTo: null,
  mileageFrom: null,
  mileageTo: null,
  isLoading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
    resetFilterByKey: (state, action) => {
      const key = action.payload;
      state[key] = initialState[key];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchCarBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, resetFilters, resetFilterByKey } =
  filtersSlice.actions;
export default filtersSlice.reducer;
