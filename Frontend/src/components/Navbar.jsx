import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiFillCaretDown, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowRight , MdOutlineContactSupport} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { CiInboxIn } from "react-icons/ci";
import { TfiCheckBox } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import adidas from "../assets/adidas.webp";
import pantaloons from "../assets/pantaloons.webp";
import puma from "../assets/puma.webp";
import w from "../assets/w.webp";
import WestSide from "../assets/west-side.webp";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const {getCartCount, token, setToken, setCartItems } = useContext(ShopContext)
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    navigate("/auth")
    localStorage.removeItem('token');
    setToken('');
    setCartItems({})

  };

  return (
    <div className="bg-[#212121] w-full relative">
      {/* Top section (hidden on small screens) */}
      <div className="hidden md:flex justify-between items-center h-8 px-4 bg-black text-white text-[10px]">
        <div className="font-bold">
          <p>Tata CLIQ Luxury</p>
        </div>

        <div className="flex gap-4">
          <p className="cursor-pointer hover:text-gray-400">CLiQ Cash</p>
          <p className="cursor-pointer hover:text-gray-400">Gift Card</p>
          <p className="cursor-pointer hover:text-gray-400">CLiQ Care</p>
          <p onClick={() => token ? navigate('/orders') : navigate("/auth")} className="cursor-pointer hover:text-gray-400">Track Orders</p>
          <Link to="/auth" className="cursor-pointer hover:text-gray-400" onClick={handleLogout}>
            {token ?"Logout" : "Sign In"}
          </Link>
        </div>
      </div>

      {/* Main navbar section */}
      <div className="  flex justify-between items-center h-20 px-8 relative">
        <Link to='/'>
          <img src={logo} alt="Tata Cliq Logo" className="h-16 object-cover" />
        </Link>

        {/* Middle Section: Categories, Brands, Search */}
        <div className="flex items-center w-[70%] hidden md:flex">
          {/* Categories with Dropdown */}
          <div className="relative group z-10">
            <div className="flex items-center cursor-pointer text-white font-semibold hover:text-gray-400">
              Categories
              <AiFillCaretDown className="ml-1" />
            </div>
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 mt-2 p-6 bg-white text-black grid grid-cols-4 gap-6 w-[800px] shadow-lg hidden group-hover:grid">
              {/* Category items */}
              <div className="text-left">
                <Link
                  to="/womens"
                  className="block font-bold mb-2 text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Women's Fashion
                </Link>
                <Link
                  to="/mens"
                  className="block font-bold mb-2 text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Men's Fashion
                </Link>
                <Link
                  to="/kids"
                  className="block font-bold mb-2 text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Kids' Fashion
                </Link>
                <Link
                  to="/home-kitchen"
                  className="block font-bold mb-2 text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Home & Kitchen
                </Link>
                <Link
                  to="/beauty"
                  className="block font-bold mb-2 text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Beauty
                </Link>
                <Link
                  to="/gadgets"
                  className="block font-bold mb-2 text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Gadgets
                </Link>
              </div>

              <div className="text-left">
                <h3 className="font-bold mb-2">Shop All Ethnic Wear</h3>
                <ul>
                  <li>Tops & T-shirts</li>
                  <li>Dresses</li>
                  <li>Jeans</li>
                  <li>Shirts</li>
                  <li>Trousers</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Kids' Fashion</h3>
                <ul>
                  <li>T-shirts</li>
                  <li>Shorts</li>
                  <li>Track Pants</li>
                  <li>Jackets</li>
                  <li>Sweatshirts</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Footwear</h3>
                <ul>
                  <li>Casual Footwear</li>
                  <li>Boots</li>
                  <li>Sneakers</li>
                  <li>Sports Shoes</li>
                  <li>Flip Flops</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Brands with Dropdown */}
          <div className="ml-8 relative group z-10">
            <div className="flex items-center cursor-pointer text-white font-semibold hover:text-gray-400">
              Brands
              <AiFillCaretDown className="ml-1" />
            </div>

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 mt-2 p-6 bg-white text-black grid grid-cols-4 gap-6 w-[800px] shadow-lg hidden group-hover:grid">
              {/* Brand items */}
              <div className="text-left">
                <h3 className="font-bold mb-2">Popular Brands</h3>
                <ul>
                  <li>Brand 1</li>
                  <li>Brand 2</li>
                  <li>Brand 3</li>
                  <li>Brand 4</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Luxury Brands</h3>
                <ul>
                  <li>Brand 5</li>
                  <li>Brand 6</li>
                  <li>Brand 7</li>
                  <li>Brand 8</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">New Brands</h3>
                <ul>
                  <li>Brand 9</li>
                  <li>Brand 10</li>
                  <li>Brand 11</li>
                  <li>Brand 12</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2">Trending</h3>
                <ul>
                  <li>Brand 13</li>
                  <li>Brand 14</li>
                  <li>Brand 15</li>
                  <li>Brand 16</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="ml-8 flex-1">
            <input

              type="text"
              placeholder="Search for Brands"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Wishlist and Cart */}
        <div className="flex items-center gap-6 text-white">
          <div onClick={() => token ? navigate('/orders') : navigate("/auth")}  className="cursor-pointer hover:text-gray-400">
            <FaRegHeart size={24} />
          </div>

          <div onClick={() => token ? navigate('/cart') : navigate("/auth")}  className="cursor-pointer hover:text-gray-400 relative ">
            <HiOutlineShoppingBag size={24} />
            <p className="absolute right-[-5px] bottom-[-5px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px] p-[1px]">{getCartCount()}</p>
          </div>
          <div className="md:hidden cursor-pointer" onClick={toggleSidebar}>
            <AiOutlineMenu size={24} />
          </div>
        </div>
      </div>

      {showSidebar && (
        <div className="fixed top-0 left-0 w-[85%] h-full bg-white text-black z-50 transition-transform transform md:hidden">
          <div className="flex justify-between items-center p-4">
            <img src={logo} alt="Logo" className="h-10" />
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="p-4">
            <p className="font-bold mb-2 cursor-pointer">Categories</p>
            <ul className="mb-4">
              <hr />
              <Link
               onClick={toggleSidebar}
                to="/mens"
                className="flex items-center justify-between w-[90%] py-4"
              >
                <div>Men's Fashion</div>
                <MdKeyboardArrowRight size={24} />
              </Link>
              <hr />
              <Link
               onClick={toggleSidebar}
                to="/womens"
                className="flex items-center justify-between w-[90%] py-4"
              >
                <div>Women's Fashion</div>
                <MdKeyboardArrowRight size={24} />
              </Link>
              <hr />
              <Link
               onClick={toggleSidebar}
                to="/kids"
                className="flex items-center justify-between w-[90%] py-4"
              >
                <div>Kids's Fashion</div>
                <MdKeyboardArrowRight size={24} />
              </Link>
              <hr />
              <Link
               onClick={toggleSidebar}
                to="/home-kitchen"
                className="flex items-center justify-between w-[90%] py-4"
              >
                <div>Home & Kitchen</div>
                <MdKeyboardArrowRight size={24} />
              </Link>
              <hr />
              <Link
               onClick={toggleSidebar}
                to="/gadgets"
                className="flex items-center justify-between w-[90%] py-4"
              >
                <div>Gadgets</div>
                <MdKeyboardArrowRight size={24} />
              </Link>
              <hr />
            </ul>
            <div className="flex items-center gap-6  ">
              <p className="font-bold  cursor-pointer ">My Account </p>
              <IoIosArrowDown size={20} />
            </div>
            <div className=" leading-8  ">
              <Link
               onClick={toggleSidebar}
                to="/orders"
                className="flex items-center gap-5 border-b-2 p-4 "
              >
                <p className="font-bold ">Orders</p>
                <CiInboxIn size={24} />
              </Link>
              <Link
               onClick={toggleSidebar}
                to="/cart"
                className="flex items-center gap-10 border-b-2 p-4"
              >
                <p className="font-bold">Cart</p>
                <PiShoppingCartSimpleLight size={24} />
              </Link>
              <Link
               onClick={toggleSidebar}
                to="/Contact"
                className="flex items-center gap-5 border-b-2 p-4"
              >
                <p className="font-bold">Contact</p>
                <MdOutlineContactSupport size={24} />
              </Link>
              <Link
               onClick={toggleSidebar}
                to="/place-order"
                className="flex items-center gap-4 border-b-2 p-4"
              >
                <p className="font-bold">Placed Orders</p>
                <TfiCheckBox size={24} />
              </Link>
            </div>
            <hr />
            <h1 className="font-bold  mt-6 cursor-pointer">Brands</h1>
            <div className="overflow-hidden w-full">
              <div className="flex animate-scroll w-max">
                <img src={adidas} alt="Adidas" className="h-24 mx-2" />
                <img src={puma} alt="Puma" className="h-24 mx-2" />
                <img src={w} alt="W" className="h-24 mx-2" />
                <img src={WestSide} alt="WestSide" className="h-24 mx-2" />
                <img src={pantaloons} alt="Pantaloons" className="h-24 mx-2" />

                <img src={adidas} alt="Adidas" className="h-24 mx-2" />
                <img src={puma} alt="Puma" className="h-24 mx-2" />
                <img src={w} alt="W" className="h-24 mx-2" />
                <img src={WestSide} alt="WestSide" className="h-24 mx-2" />
                <img src={pantaloons} alt="Pantaloons" className="h-24 mx-2" />
              </div>
            </div>
            <Link to="/auth"  onClick={toggleSidebar}>
              <div className="flex justify-center items-center py-4">
                <button className="bg-[#212121] text-white rounded-full w-[90%] md:w-40 h-10 waving-button">
                  Sign In
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
