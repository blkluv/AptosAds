import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/list" element={<ListingPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
