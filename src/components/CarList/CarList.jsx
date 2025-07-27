import React from "react";
import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";

export default function CarList({ cars = [] }) {
  
  if (cars.length === 0) {
    return <p>No cars available</p>;
  }

  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
