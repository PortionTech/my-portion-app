import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary'

const cloudinaryUploadFolder = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export {  cloudinary, cloudinaryUploadFolder }