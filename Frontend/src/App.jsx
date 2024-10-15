import AllRoutes from "./components/AllRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Navbar/>
       <ToastContainer autoClose={3000} />
      <AllRoutes/>
      <hr className="mt-12"/>
      <Footer/>
    </>
  )
}