import {NavLink } from "react-router-dom";
import css from "./CarCard.module.css";

const CarCard = ({ car }) => {
   const addressParts = car.address.split(",").map((part) => part.trim());
   const city = addressParts[addressParts.length - 2];
   const country = addressParts[addressParts.length - 1];
  return (
    <div className={css.card}>
      <img className={css.img} src={car.img} alt={car.make} />
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
        <span className={css.suv}> Suv {car.mileage}</span>
      <NavLink className={css.readMore} to={`/catalog/${car.id}`}>Read more</NavLink>
    </div>
  );
};

export default CarCard;
