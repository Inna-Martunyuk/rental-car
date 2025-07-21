import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import CarDetailsPage from "../../pages/CarDetailsPage/CarDetailsPage";
import Header from "../Header/Header.jsx"; 

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/car/:id" element={<CarDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
