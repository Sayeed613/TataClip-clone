import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartSummary = ({
  currency,
  bagTotal,
  delivery_fee,
  discountTotal,
  grandTotal,
  onCheckout,
  btnText
}) => {
  // State for pincode and city
  const [pincode, setPincode] = useState("110001");
  const [city, setCity] = useState("Delhi");
  // Handler for pincode change
  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  // Handler for city change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">Deliver To</p>
        <button className="text-pink-600">Change</button>
      </div>

      <div className="bg-gray-100 p-2 rounded mb-4">
        {/* Input for pincode */}
        <input
          type="text"
          value={pincode}
          onChange={handlePincodeChange}
          placeholder="Enter Pincode"
          className="border p-2 rounded mb-2 w-full"
        />
        {/* Input for city */}
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter City"
          className="border p-2 rounded mb-2 w-full"
        />
      </div>

      <hr className="mb-4" />

      <div className="flex justify-between mb-2">
        <p>Bag Total</p>
        <p>{currency} {bagTotal}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p>Processing Fee</p>
        <p>{currency} {delivery_fee}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p>Product Discount</p>
        <p className="text-green-600">-{currency} {discountTotal}</p>
      </div>

      <hr className="mb-4" />

      <div className="flex justify-between font-bold text-lg mb-4">
        <p>Total</p>
        <p>{currency} {grandTotal}</p>
      </div>

      <button onClick={onCheckout} className="bg-pink-600 text-white w-full py-2 rounded">
        {btnText}
      </button>
    </div>
  );
};

export default CartSummary;
