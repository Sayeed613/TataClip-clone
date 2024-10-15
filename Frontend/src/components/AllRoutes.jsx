import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Beauty from "../pages/Beauty";
import Contact from "../pages/Contact";
import Gadgets from "../pages/Gadgets";
import HomeKitchen from "../pages/Home&Kitchen";
import KidsFashion from "../pages/KidsFashion";
import MensFashion from "../pages/MensFashion";
import WomensFashion from "../pages/WomensFashion";
import SignInlogin from "../pages/SignIn&login";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import PlaceOrder from "../pages/PlaceOrder"
import Orders from "../pages/Orders"
import Verify from "../pages/Verify";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/beauty" element={<Beauty />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gadgets" element={<Gadgets />} />
      <Route path="/" element={<Home />} />
      <Route path="/home-kitchen" element={<HomeKitchen />} />
      <Route path="/kids" element={<KidsFashion />} />
      <Route path="/mens" element={<MensFashion />} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="/place-order" element={<PlaceOrder/>} />
      <Route path="/product/:productId" element={< ProductPage/>} />
      <Route path="/auth" element={<SignInlogin />} />
      <Route path="/womens" element={<WomensFashion />} />
      <Route path="/verify" element={<Verify />} />

    </Routes>
  );
}
