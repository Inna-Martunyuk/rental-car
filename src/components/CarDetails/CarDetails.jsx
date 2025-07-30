import { useState } from "react";
import css from "./CarDetails.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import groupImage from "../../assets/group.png";
import { toast } from "react-toastify"; 
import { useDispatch } from "react-redux";
import { bookCar } from "../../redux/operations/operations.js"; 

const CarDetails = ({ car }) => {
  const dispatch = useDispatch();

  const [rentalData, setRentalData] = useState({
    startDate: null,
    endDate: null,
    contactName: "",
    contactPhone: "",
    comment: "",
  });

  const handleChange = (e) => {
    setRentalData({
      ...rentalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, field) => {
    setRentalData({
      ...rentalData,
      [field]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await dispatch(bookCar(rentalData));
      toast.success("Your booking has been successfully made!"); 
      setRentalData({
        startDate: null,
        endDate: null,
        contactName: "",
        contactPhone: "",
        comment: "",
      }); 
    } catch (error) {
      toast.error("An error occurred while making the reservation!"); 
    }
  };

  const numericId = car.id.match(/\d+/g)?.join("").slice(0, 4) || "0000";
  const addressParts = car.address.split(",").map((part) => part.trim());
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];
  const rentalConditions = car.rentalConditions || [
    "Minimum age: 21",
    "Valid driver's license",
    "Proof of insurance required",
  ];

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat("uk-UA").format(mileage);
  };

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
              placeholder="Phone*"
              className={css.input}
            />
          </label>
          <label>
            <DatePicker
              selected={rentalData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              placeholderText="Booking date"
              className={css.input}
              dateFormat="yyyy-MM-dd"
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
          <p className={css.id}>id: {numericId}</p>
        </div>

        <div className={css.info}>
          <img className={css.imgGroup} src={groupImage} alt="group" />
          <p>{city},</p>
          <p>{country}</p>
          <p className={css.mileage}>
            {" "}
            Mileage: {formatMileage(car.mileage)} km
          </p>
        </div>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.text}>{car.description}</p>
        <div className={css.detailsCar}>
          <h3 className={css.titleDetail}>Rental Conditions:</h3>
          <ul>
            {rentalConditions.map((condition, index) => (
              <li className={css.list} key={index}>
                <img
                  className={css.icons}
                  src="/public/assets/check-circle.png"
                  alt="check"
                />
                <p>{condition}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={css.detailsSpecification}>
          <h3 className={css.titleDetail}>Car Specifications:</h3>
          <ul>
            <li className={css.list}>
              <img
                className={css.icons}
                src="/public/assets/calendar.png"
                alt="calendar"
              />
              <p>Year: {car.year}</p>
            </li>
            <li className={css.list}>
              <img
                className={css.icons}
                src="/public/assets/car.png"
                alt="car"
              />
              <p>Type: {car.type} </p>
            </li>
            <li className={css.list}>
              <img
                className={css.icons}
                src="/public/assets/fuel-pump.png"
                alt="fuel-pump"
              />
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </li>
            <li className={css.list}>
              <img
                className={css.icons}
                src="/public/assets/gear.png"
                alt="gear"
              />
              <p>Engine Size: {car.engineSize}</p>
            </li>
          </ul>
        </div>
        <div className={css.detailsCar}>
          <h3 className={css.titleDetail}>Accessories and Functionalities:</h3>
          <ul>
            {[...car.accessories, ...car.functionalities].map((item, index) => (
              <li className={css.list} key={index}>
                <img
                  className={css.icons}
                  src="/public/assets/check-circle.png"
                  alt="check"
                />
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
