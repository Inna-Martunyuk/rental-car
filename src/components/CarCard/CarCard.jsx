import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/slice";
import css from "./CarCard.module.css";
import { formatNumberWithCommas } from "../../utils/format";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((favorite) => favorite.id === car.id);

  const addressParts = car.address.split(",").map((part) => part.trim());
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(car));
  };

  return (
    <div className={css.card}>
      <div className={css.imgContainer}>
        <img className={css.img} src={car.img} alt={car.make} />
        <button
          onClick={handleFavoriteClick}
          className={`${css.favoriteButton} ${isFavorite ? css.favorited : ""}`}
        >
          {isFavorite ? (
            <img src="/assets/Property 1=Active.png" alt="Favorite" />
          ) : (
            <img src="/assets/Property.png" alt="Not Favorite" />
          )}
        </button>
      </div>
      <div className={css.title}>
        <h3 className={css.brand}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h3>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <div className={css.info}>
        <span>{city}</span>
        <span>{country}</span>
        <span>{car.rentalCompany}</span>
      </div>
      <span className={css.suv}>
        {" "}
        Suv {formatNumberWithCommas(car.mileage)}
      </span>
      <NavLink className={css.readMore} to={`/catalog/${car.id}`}>
        Read more
      </NavLink>
    </div>
  );
};

export default CarCard;
