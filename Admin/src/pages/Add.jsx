import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import {toast } from "react-toastify"

export const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("mens");
  const [subCategory, setSubCategory] = useState("Ethnic Wear");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);

  const subCategories = {
    mens: ["Ethnic Wear", "Formal Wear", "Inner & Night", "Casual Wear"],
    womens: ["Ethnic Wear", "swim & beachwear", "Inner & Night", "Western Wear"],
    kids: ["Boys Clothing", "Girls Clothing", "Infants", "Accessories"],
    beauty: ["Bath, Body & Hygiene", "Perfumes", "Gifts", "Hair"],
    homeAndKitchen: ["Bath Accessories", "Bath Linen", "Bed Linen", "Furnishing"],
    gadgets: ["Camera", "Gaming", "Accessories", "Computer Parts"],
  };


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(subCategories[e.target.value][0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      formData.append("name", name);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("productCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(size));

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if(response.data.success) {
        toast.success(response.data.message)
        setName("");
        setTitle("");
        setDescription("");
        setPrice("");
        setSize([]);
        setCategory("mens");
        setSubCategory("Ethnic Wear");
        image1 && setImage1(false);
        image2 && setImage2(false);
        image3 && setImage3(false);
        image4 && setImage4(false);
      }else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Image Upload Section */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2 ">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""/>
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""/>
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""/>
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""/>
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* Product Fields */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Title</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full max-w-[500px] px-3 py-2" placeholder="Write content here" required />
      </div>

      {/* Product Category & SubCategory */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2" value={category} onChange={handleCategoryChange}>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="kids">Kids</option>
            <option value="beauty">Beauty</option>
            <option value="gadgets">Gadgets</option>
            <option value="homeAndKitchen">Home & Kitchen</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            {subCategories[category].map((subCat, index) => (
              <option key={index} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </div>

        {/* Product Price */}
        <div>
          <p className="mb-2">Product Price</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="25" required />
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
            <div key={sizeOption} onClick={() => setSize((prev) => prev.includes(sizeOption) ? prev.filter((item) => item !== sizeOption) : [...prev, sizeOption])}>
              <p className={`${size.includes(sizeOption) ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {sizeOption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        ADD
      </button>
    </form>
  );
};
