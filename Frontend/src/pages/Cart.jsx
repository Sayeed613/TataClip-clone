import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import CartTotal from "../components/CartTotal";  // Import the new component

const CartPage = () => {
  const { currency, products, cartItems, delivery_fee, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Calculate totals
  const bagTotal = cartData.reduce((total, item) => {
    const product = products.find((p) => p._id === item.id); // Use _id here
    return product ? total + product.price * item.quantity : total;
  }, 0);

  const discountTotal = cartData.reduce((total, item) => {
    const product = products.find((p) => p._id === item.id); // Use _id here
    return product && product.discount
      ? total + (product.price * product.discount * item.quantity) / 100
      : total;
  }, 0);

  const grandTotal = bagTotal - discountTotal + delivery_fee;

  const handleCheckout = () => {
    navigate("/place-order");
  };

  return (
    <div className="bg-gray-50 min-h-screen w-[80%] m-auto">
      <div className="container mx-auto p-6">
        {/* My Bag title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Bag</h1>
          <p className="text-gray-600">
            Review your cart summary for the final amount and any eligible shipping discounts.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="col-span-2 bg-white p-6 rounded shadow-sm">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item.id); // Use _id here
              if (!productData) {
                return (
                  <div key={index} className="text-red-500">
                    Product not found for item ID: {item.id}
                  </div>
                );
              }

              return (
                <div key={index} className="flex justify-between items-start border-b pb-4 mb-4">
                  <div className="flex items-start">
                    <img
                      src={Array.isArray(productData.image) ? productData.image[0] : productData.image} // Ensure handling image
                      alt={productData.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="ml-4">
                      <h2 className="text-md font-semibold">{productData.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm mr-4">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const quantity = Number(e.target.value);
                            if (quantity > 0) {
                              updateQuantity(item.id, item.size, quantity);
                            }
                          }}
                          className="text-sm border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                        />
                      </div>
                      <p className="text-sm mt-3">
                        <span className="text-black font-semibold">
                          {currency} {(productData.price * item.quantity).toFixed(2)}
                        </span>
                        {productData.discount && (
                          <>
                            <span className="line-through text-gray-500 ml-2">
                              {currency} {(productData.price * item.quantity + (productData.price * productData.discount * item.quantity) / 100).toFixed(2)}
                            </span>
                            <span className="text-green-600 ml-2">
                              -{currency} {(productData.price * productData.discount * item.quantity / 100).toFixed(2)}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Delivery and Actions */}
                  <div className="flex flex-col gap-4 items-center">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <CiDeliveryTruck size={24} />
                      Delivery by 14th Oct
                    </p>
                    <div className="mt-4">
                      <button onClick={() => updateQuantity(item.id, item.size, 0)} className="text-red-500 text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Section */}
          <CartTotal
            currency={currency}
            bagTotal={bagTotal}
            delivery_fee={delivery_fee}
            discountTotal={discountTotal}
            grandTotal={grandTotal}
            onCheckout={handleCheckout}
            btnText="Check Out"
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
