import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { RelatedProducts } from "../components/RelatedProducts";

export default function ProductPage() {
  const { productId } = useParams(); // Get the productId from the URL
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const fetchProductData = () => {
    if (!Array.isArray(products)) {
      setError("Invalid products data structure");
      setLoading(false);
      return;
    }

    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image[0]); // Set default selected image
    } else {
      setError("Product not found");
    }
    setLoading(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message
  }

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 w-[90%] m-auto">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-8 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-hidden justify-between sm:justify-normal">
            {productData.image.map((item, index) => (
              <img
                onClick={() => handleImageSelect(item)}
                key={index}
                src={item}
                alt={`${productData.title} image ${index + 1}`} // More descriptive alt text
                className="w-[24%] sm:w-[120px] sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-[70vh] h-auto"
              src={selectedImage}
              alt={productData.title}
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-ms text-black">
            {productData.title}
          </h1>
          <h1 className="font-semibold text-2xl mt-2 text-black">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="w-3.5" />
            ))}
            <FaRegStarHalfStroke className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-6">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-black" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)} // Use _id for adding to cart
            disabled={!size}
            className={`bg-black text-white px-8 py-3 text-sm ${!size ? "opacity-50 cursor-not-allowed" : "active:bg-gray-700"}`}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 p-4 text-sm">Description</b>
          <p className="border px-5 p-4 text-sm">
            Reviews ({productData.reviews || 0}) {/* Assuming reviews exists */}
          </p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500">
          <p>
            {productData.longDescription || "No additional description available."}
          </p>
        </div>
      </div>
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
