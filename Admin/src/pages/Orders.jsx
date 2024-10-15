import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify"; // Correct import for toast

export const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      console.log("No token provided");
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/order/all-orders`, {
        headers: { token },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value }, // Make sure to get the status from the event
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
      } else {
        toast.error(response.data.message || "Failed to update order status.");
      }
    } catch (error) {
      console.log("Error updating status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order) => {
          const { _id, items, address, paymentMethod, payment, date, amount, status } = order;

          return (
            <div key={_id} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12" />
              <div>
                <div>
                  {items.map((item, index) => (
                    <p className="py-0.5" key={index}>
                      {item.name} X {item.quantity} <span>{item.size}</span>
                      {index < items.length - 1 && ", "}
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <div>
                  <p>{address.street},</p>
                  <p>
                    {address.city}, {address.state}, {address.country}, {address.zipCode}
                  </p>
                </div>
                <p>{address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {items.length}</p>
                <p className="mt-3">Method: {paymentMethod}</p>
                <p>Payment: {payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{currency} {amount}</p>
              <select onChange={(e) => statusHandler(e, _id)} value={status} className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};
