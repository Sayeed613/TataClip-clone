import validator from "validator";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY )
}
// Route for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.json({
                success: false,
                message: "User doesn't exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({
                success: true,
                message: "User logged in successfully",
                token,
            });
        }else {
            return res.json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Route for user register
const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a Valided email address",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a Strong password",
      });
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
     const user =  await newUser.save();
     const token = createToken(user._id)
     res.json({
       success: true,
       message: "User registered successfully",
       token,
     });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
      res.json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    }
    else {
      res.json({
        success: false,
        message: "Invalid credentials",
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
};
export { loginUser, registerUser, adminLogin };
