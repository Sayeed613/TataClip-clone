import {v2 as cloudinary} from "cloudinary"

const cloud = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_Name,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}

export default cloud