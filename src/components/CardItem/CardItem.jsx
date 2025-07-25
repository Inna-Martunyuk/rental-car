import React from "react";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../../redux/favorites/slice.js";

const formatMileage = (mileage) => {
  return new Intl.NumberFormat("uk-UA").format(mileage); 
};

const CarItem = ({ car }) => {
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(car));
  };

  return (
    <div>
      <h3>
        {car.brand} {car.model}
      </h3>
      <p>Price: ${car.price}</p>
      <p>Mileage: {formatMileage(car.mileage)} km</p>
      <p>{car.description}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default CarItem;
