import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders() {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        console.error("No token found. Please log in.");
        return; // Exit if no token
      }

      const response = await axios.post(
        backendUrl + "/api/order/user-orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching order data", error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 w-[80%] m-auto">
      <div className="text-2xl">My Orders</div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              {/* Assuming image is an array, use the first image */}
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium ">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-400">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1">
                  Paymeny : <span className="text-gray-400">{item.paymentMethod}</span>
                </p>

              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-lg min-w-2 h-2 rounded-full bg-green-500 "></p>
                <p className="text-sm text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
