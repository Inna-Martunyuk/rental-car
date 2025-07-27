import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./opetations.js"; 

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
       
        if (state.page === 1) {
          state.items = action.payload.cars;
        } else {
          state.items = [...state.items, ...action.payload.cars];
        }
        
        state.totalPages = action.payload.totalPages;
        
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
