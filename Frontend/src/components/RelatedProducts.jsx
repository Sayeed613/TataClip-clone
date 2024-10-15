import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";

export const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Check if products are loaded and valid
    if (Array.isArray(products) && category) {
      const relatedProducts = products.filter(item => item.category === category);
      // Limit the related products to a maximum of 5
      setRelated(relatedProducts.slice(0, 5));
    }
  }, [products, category]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">Related Products</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.length > 0 ? (
          related.map((item) => (
            <ProductCard
              key={item._id} // Ensure unique key for each item
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image} // Assuming this property is correct
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No related products found.</p> // Fallback message
        )}
      </div>
    </div>
  );
};
