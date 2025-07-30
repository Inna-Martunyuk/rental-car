import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CarDetails from "../../components/CarDetails/CarDetails";
import Loader from "../../components/Loader/Loader";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://car-rental-api.goit.global/cars/${id}`)
      .then((res) => {
        if (res.data) {
          setCar(res.data);
        } else {
          setError("Car not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err); 
        setError("Error fetching car data");
        setLoading(false);
      });
  }, [id]);

  const handleRentalSubmit = (rentalData) => {
    alert(
      `Rent a car from ${rentalData.startDate} to ${rentalData.endDate} for ${rentalData.contactName}`
    );
  };

  if (loading) return <Loader />;
  if (error) return {error}; 
  if (!car) return <div>Car not found</div>; 

  return <CarDetails car={car} onSubmitRental={handleRentalSubmit} />;
};

export default CarDetailsPage;
