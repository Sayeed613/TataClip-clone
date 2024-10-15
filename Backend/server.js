import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/db.js";
import cloud from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();
const port = process.env.PORT || 3000;
connect();
cloud();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the TataClip Clone API!");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
