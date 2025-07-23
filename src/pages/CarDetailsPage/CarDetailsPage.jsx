import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CarDetails from "../../components/CarDetails/CarDetails";

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
        setCar(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Car not found");
        setLoading(false);
      });
  }, [id]);

  const handleRentalSubmit = (rentalData) => {
    alert(
      `Оренда авто з ${rentalData.startDate} по ${rentalData.endDate} для ${rentalData.contactName}`
    );
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (!car) return null;

  return <CarDetails car={car} onSubmitRental={handleRentalSubmit} />;
};

export default CarDetailsPage;
