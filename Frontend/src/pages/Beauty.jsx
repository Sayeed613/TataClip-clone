import { useContext, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { MdArrowDropDown } from "react-icons/md";
import ProductCard from "../components/ProductCard";

export default function Beauty() {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const beautyCategory = "beauty";

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    const initialFiltered = products.filter((product) => product.category === beautyCategory);

    const filtered = category.length > 0
      ? initialFiltered.filter((product) => category.includes(product.productCategory))
      : initialFiltered;

    const sortFunctions = {
      "low-high": (a, b) => a.price - b.price,
      "high-low": (a, b) => b.price - a.price,
      "relevant": () => 0,
    };

    return filtered.sort(sortFunctions[sortType]);
  }, [category, sortType, products]);

  return (
    <>
      <div className="text-center text-xs mt-6 font-bold font-serif sm:text-3xl">
        Women's Clothing Online
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 w-[90%] m-auto">
        {/* Filter Section */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter((prev) => !prev)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <MdArrowDropDown size={34} className={`sm:hidden ${showFilter ? "rotate-90" : ""}`} />
          </p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {/* Category filters (checkboxes) */}
              {["Bath,Body & Hygiene", "Perfumes", "Gifts", "Hair"].map((cat) => (
                <label key={cat} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <h1 className="font-light">COLLECTIONS</h1>
            <select
              className="border-2 border-gray-300 text-sm px-2"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-15">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  title={item.name}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
