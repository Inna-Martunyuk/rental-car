import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCarsAPI } from "../../services/api";


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

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 12,
    totalPages: 0,
    hasMore: true,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        // Якщо сторінка 1 — замінити, інакше додати
        if (state.page === 1) {
          state.items = action.payload.cars;
        } else {
          // Додаємо нові елементи до існуючих
          state.items = [...state.items, ...action.payload.cars];
        }
        // Якщо дані є, оновлюємо totalPages
        state.totalPages = action.payload.totalPages;
        // Якщо поточна сторінка менша за загальну кількість сторінок, дозволяємо подальше завантаження
        state.hasMore = state.page < state.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars, setPage, incrementPage } = carsSlice.actions;
export default carsSlice.reducer;
