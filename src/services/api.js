import axios from "axios";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

const validBrands = [
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Chevrolet",
  "Chrysler",
  "GMC",
  "HUMMER",
  "Hyundai",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lincoln",
  "MINI",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Pontiac",
  "Subaru",
  "Volvo",
];

export const fetchCarsAPI = async ({ filters = {}, page = 1, limit = 12 }) => {
  const params = { page, limit };

  if (filters.brand && validBrands.includes(filters.brand)) {
    params.brand = filters.brand;
  }

  if (filters.priceFrom) params.priceFrom = filters.priceFrom;
  if (filters.priceTo) params.priceTo = filters.priceTo;
  if (filters.mileageFrom) params.mileageFrom = filters.mileageFrom;
  if (filters.mileageTo) params.mileageTo = filters.mileageTo;

  const response = await instance.get("/cars", { params });

  return {
    cars: response.data.cars,
    total: response.data.totalCars,
    page: Number(response.data.page),
    totalPages: response.data.totalPages,
  };
};
