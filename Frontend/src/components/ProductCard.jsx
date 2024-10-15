import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ id, image, name, title, price }) => {
  const { currency } = useContext(ShopContext); // Get the currency from context

  return (
    <Link to={`/product/${id}`} className="product-card">
      <img
        src={Array.isArray(image) && image.length > 0 ? image[0] : ""}
        alt={name}
        className="h-auto w-auto"
      />
      <p className="font-bold p-1">{title}</p>
      <p className="font-light p-1 text-gray-500">{name}</p>
      <p className="font-bold p-1">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductCard;
