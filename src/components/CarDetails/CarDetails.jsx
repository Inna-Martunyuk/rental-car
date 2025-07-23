import { useState } from "react";
import css from "./CarDetails.module.css";

const CarDetails = ({ car, onSubmitRental }) => {
  const [rentalData, setRentalData] = useState({
    startDate: "",
    endDate: "",
    contactName: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setRentalData({
      ...rentalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRental(rentalData);
  };
const numericId = car.id.match(/\d+/g)?.join("").slice(0, 4) || "0000";
  return (
    <div className={`${css.container} ${css.div}`}>
      <div className={css.details}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={css.image}
        />
        <form className={css.rentalForm} onSubmit={handleSubmit}>
          <h3 className={css.title}>Book your car now</h3>
          <p className={css.text}>
            Stay connected! We are always ready to help you.
          </p>
          <label>
            <input
              type="text"
              name="contactName"
              value={rentalData.contactName}
              onChange={handleChange}
              required
              placeholder="Name*"
              className={css.input}
            />
          </label>
          <label>
            <input
              type="tel"
              name="contactPhone"
              value={rentalData.contactPhone}
              onChange={handleChange}
              required
              placeholder="Email*"
              className={css.input}
            />
          </label>
          <label>
            <input
              type="text"
              name="startDate"
              value={rentalData.startDate}
              onChange={handleChange}
              placeholder="Booking date"
              className={css.input}
              required
            />
          </label>
          <label>
            <textarea
              name="comment"
              value={rentalData.comment}
              onChange={handleChange}
              placeholder="Comment"
              className={css.textarea}
              rows={4}
              required
            />
          </label>
          <button className={css.button} type="submit">
            Send
          </button>
        </form>
      </div>

      <div className={css.params}>
        <div className={css.idTitle}>
          <h2 className={css.model}>
          {car.brand} {car.model}, {car.year}
        </h2>
          <p className={css.id} >id: {numericId}</p>
        </div>
        

        <div className={css.details}>
          <p>
            <strong>Тип:</strong> {car.type}
          </p>
          <p>
            <strong>Паливна ефективність:</strong> {car.fuelConsumption} л/100км
          </p>
          <p>
            <strong>Об’єм двигуна:</strong> {car.engineSize}
          </p>
          <p>
            <strong>Пробіг:</strong> {car.mileage} км
          </p>
          <p>
            <strong>Ціна оренди за годину:</strong> ${car.rentalPrice}
          </p>
          <p>
            <strong>Компанія оренди:</strong> {car.rentalCompany}
          </p>
          <p>
            <strong>Адреса:</strong> {car.address}
          </p>

          <p>
            <strong>Аксесуари:</strong>
          </p>
          <ul>
            {car.accessories.map((acc, idx) => (
              <li key={idx}>{acc}</li>
            ))}
          </ul>

          <p>
            <strong>Функції:</strong>
          </p>
          <ul>
            {car.functionalities.map((func, idx) => (
              <li key={idx}>{func}</li>
            ))}
          </ul>

          <p>
            <strong>Умови оренди:</strong>
          </p>
          <ul>
            {car.rentalConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
