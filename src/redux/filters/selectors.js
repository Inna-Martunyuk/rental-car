export const selectBrands = (state) => state.filters.brands;
export const selectSelectedBrand = (state) => state.filters.brand;
export const selectPriceRange = (state) => ({
  priceFrom: state.filters.priceFrom,
  priceTo: state.filters.priceTo,
});
export const selectMileageRange = (state) => ({
  mileageFrom: state.filters.mileageFrom,
  mileageTo: state.filters.mileageTo,
});
