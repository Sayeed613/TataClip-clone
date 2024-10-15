import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const [products, setProducts] = useState([]);
  const delivery_fee = 99;
  const backendUrl = "http://localhost:4000";

  // Add to Cart Function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems); // Create a copy of cartItems
    if (!cartData[itemId]) {
      cartData[itemId] = {}; // Initialize item if it doesn't exist
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1; // Increment size quantity
    } else {
      cartData[itemId][size] = 1; // Initialize size quantity
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } } // Use headers property
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  // Function to Calculate Cart Amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
      return totalAmount + Object.entries(sizes).reduce((subtotal, [size, quantity]) => {
        const product = products.find((p) => p._id === itemId);
        if (product) {
          return subtotal + product.price * quantity;
        }
        return subtotal;
      }, 0);
    }, 0);
  };

  // Function to Get Cart Count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((totalCount, itemSizes) => {
      return totalCount + Object.values(itemSizes).reduce((sizeCount, quantity) => sizeCount + quantity, 0);
    }, 0);
  };

  // Function to Update Quantity in Cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity; // Update quantity
      setCartItems(cartData);

      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, size, quantity },
            { headers: { Authorization: `Bearer ${token}` } } // Use headers property
          );
        } catch (error) {
          console.error("Error updating cart item:", error);
          toast.error("Failed to update cart item");
        }
      }
    } else {
      toast.error("Item not found in cart"); // Error handling if item doesn't exist
    }
  };

  // Fetch Product Data
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to fetch product data");
    }
  };

  // Get User Cart Data
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // Use headers property
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error("Failed to fetch user's cart data");
    }
  };

  // Fetch Products on Component Mount
  useEffect(() => {
    getProductData();
  }, []);

  // Get User Token from Local Storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,  // Added getCartAmount to context
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
