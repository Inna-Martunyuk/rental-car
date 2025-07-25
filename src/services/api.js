import axios from "axios";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchCarsAPI = async ({ filters = {}, page = 1, limit = 12 }) => {
  const params = { page, limit };

 
  if (filters.brand) {
    params.brand = filters.brand;
  }
  if (filters.rentalPrice) {
    params.rentalPrice = filters.rentalPrice; 
  }
  if (filters.minMileage) {
    params.minMileage = filters.minMileage;
  }
  if (filters.maxMileage) {
    params.maxMileage = filters.maxMileage;
  }
  const response = await instance.get("/cars", { params });

  return {
    cars: response.data.cars,
    total: response.data.totalCars,
    page: Number(response.data.page),
    totalPages: response.data.totalPages,
  };
};
