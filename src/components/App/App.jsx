import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import CarDetailsPage from "../../pages/CarDetailsPage/CarDetailsPage";
import Header from "../Header/Header.jsx"; 
import NotFound from "../../components/NotFound/NotFound.jsx";

function App() {
  return (
    <div>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/catalog">About</Link>
        <Link to="/car/:id">Products</Link>
      </nav> */}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
