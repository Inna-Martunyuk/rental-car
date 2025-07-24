import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../redux/favorites/slice.js";
import CarItem from "./CarItem"; 

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleRemoveFromFavorites = (carId) => {
    dispatch(removeFromFavorites(carId));
  };

  return (
    <div>
      <h2>Your Favorite Cars</h2>
      {favorites.length === 0 ? (
        <p>No favorite cars added yet.</p>
      ) : (
        favorites.map((car) => (
          <div key={car.id}>
            <CarItem car={car} />
            <button onClick={() => handleRemoveFromFavorites(car.id)}>
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
