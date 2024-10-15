import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext"; // Context with shop data
import stripeLogo from "../assets/quicklinks/stripe_logo.png"; // Stripe logo
import razorPayLogo from "../assets/quicklinks/razorpay_logo.png"; // Razorpay logo
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const { currency, cartItems, setCartItems, delivery_fee, products, backendUrl, token ,  getCartAmount } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Prepare cart data for calculations
  const cartData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
    Object.entries(sizes).map(([size, quantity]) => ({
      id: itemId,
      size: size,
      quantity: quantity,
    }))
  );

  // Calculate bag total
  const bagTotal = cartData.reduce((total, item) => {
    const product = products.find((p) => p._id === item.id);
    if (product) {
      return total + product.price * item.quantity;
    }
    return total;
  }, 0);

  // Calculate discount total
  const discountTotal = cartData.reduce((total, item) => {
    const product = products.find((p) => p._id === item.id);
    return product && product.discount
      ? total + (product.price * product.discount * item.quantity) / 100
      : total;
  }, 0);

  // Calculate grand total
  const grandTotal = bagTotal - discountTotal + delivery_fee;

  // Handler for checkout button
  const handleCheckout = async(e) => {
    e.preventDefault();
    try {
      let orderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address : formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }
      switch(method){
        case "cod":
         const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { Authorization: `Bearer ${token}` }})
         if(response.data.success){
           setCartItems({})
           navigate("/orders")

         }else {
           toast.error(response.data.message)
         }
         break;
         default:
       }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  };


  return (
    <form onSubmit={handleCheckout} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t m-auto w-[80%]">
      {/* Delivery Information Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">Delivery Information</div>
        <div className="flex gap-3 mt-2">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3 mt-2">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Cart Summary Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80 bg-white p-6 rounded shadow-sm">
          <div className="flex justify-between mb-2">
            <p>Bag Total</p>
            <p>{currency} {bagTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Processing Fee</p>
            <p>{currency} {delivery_fee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Product Discount</p>
            <p className="text-green-600">-{currency} {discountTotal.toFixed(2)}</p>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <p>Total</p>
            <p>{currency} {grandTotal.toFixed(2)}</p>
          </div>

          <button type="submit" className="bg-pink-600 text-white w-full py-2 rounded">
            Place Order
          </button>
        </div>

        {/* Payment Method Section */}
        <div className="mt-4">
          <h1 className="text-lg font-semibold">Payment Method</h1>
          <div className="flex gap-3 flex-row sm:flex-col">

            <div
              className="flex items-center gap-4 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("razor")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razor" ? "bg-green-400" : ""
                }`}
              />
              <img src={razorPayLogo} alt="Razorpay" className="h-5 mx-4" />
            </div>

            {/* Cash on Delivery Option */}
            <div
              className="flex items-center gap-4 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p className="text-gray-500 text-sm">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
