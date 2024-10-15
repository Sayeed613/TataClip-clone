import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      category,
      productCategory,
      sizes,
      price,
    } = req.body;

    // Log incoming request data for debugging
    console.log('Received body:', req.body);

    // Validate sizes
    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (error) {
        return res.status(400).json({ success: false, error: "Invalid sizes format. Must be a valid JSON string." });
      }
    }

    // Retrieve the uploaded images from the request
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );

    // Upload images to Cloudinary
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      title,
      description,
      category,
      productCategory,
      sizes: parsedSizes, // Use the parsed sizes
      price: Number(price),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// list products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// single product infor
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export { addProduct, listProduct, singleProduct, removeProduct };
