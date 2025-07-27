import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarBrands = createAsyncThunk(
  "filters/fetchCarBrands",
  async () => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/brands"
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch car brands");
    }
  }
);
