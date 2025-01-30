import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import AuthDetails from "./pages/authDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="pt-[60px] bg-gray-900">
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListingPage />} />
          <Route path="/auth/details" element={<AuthDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
