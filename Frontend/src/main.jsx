import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ShopContextProvider>
);
