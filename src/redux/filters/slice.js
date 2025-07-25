import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCarBrands = createAsyncThunk(
  "filters/fetchCarBrands",
  async () => {
    const response = await axios.get(
      "https://car-rental-api.goit.global/brands"
    );
    return response.data; 
  }
);

const initialState = {
  brands: [],
  brand: "",
  priceFrom: null,
  priceTo: null,
  mileageFrom: null,
  mileageTo: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarBrands.fulfilled, (state, action) => {
      state.brands = action.payload; 
    });
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
