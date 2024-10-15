import { Route, Routes } from "react-router-dom";
import { Add } from "../pages/Add";
import { List } from "../pages/List";
import { Orders } from "../pages/Orders";
export default function AllRoutes({token}) {
  return (
    <Routes>
      <Route path="/add" element={<Add token={token} />} />
      <Route path="/list" element={<List token={token} />} />
      <Route path="/orders" element={<Orders token={token} />} />
    </Routes>
  );
}
