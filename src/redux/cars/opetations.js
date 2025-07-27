
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCarsAPI } from "../../services/api.js"; 


export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ filters, page = 1, limit = 12 }, thunkAPI) => {
    try {
      const response = await fetchCarsAPI({ filters, page, limit });
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);
