import axios from "axios";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchCarsAPI = async ({ filters = {}, page = 1, limit = 12 }) => {
  const response = await instance.get("/cars", {
    params: {
      ...filters,
      page,
      limit,
    },
  });

  return {
    cars: response.data.cars,
    total: response.data.totalCars,
    page: Number(response.data.page), 
    totalPages: response.data.totalPages,
  };
};