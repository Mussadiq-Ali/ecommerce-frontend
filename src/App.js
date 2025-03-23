import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Checkout from "./Components/CheckOut/CheckOut";
import Footer from "./Components/Footer/Footer";
import LoginSignup from "./Pages/LoginSignup";
import Login from "./Pages/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

// Stripe Success and Cancel Pages
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";

import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ✅ Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/mens"
          element={
            <PrivateRoute>
              <ShopCategory banner={men_banner} category="men" />
            </PrivateRoute>
          }
        />
        <Route
          path="/womens"
          element={
            <PrivateRoute>
              <ShopCategory banner={women_banner} category="women" />
            </PrivateRoute>
          }
        />
        <Route
          path="/kids"
          element={
            <PrivateRoute>
              <ShopCategory banner={kid_banner} category="kid" />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* ✅ Stripe Payment Success and Cancel Pages */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* ✅ Open Routes (Login / Signup) */}
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ 404 Page */}
        <Route
          path="*"
          element={
            <h1 style={{ padding: "50px", textAlign: "center" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
