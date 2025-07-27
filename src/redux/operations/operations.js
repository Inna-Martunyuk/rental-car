import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const bookCar = createAsyncThunk(
  "booking/bookCar", 
  async (rentalData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://car-rental-api.goit.global/book", 
        rentalData
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);
