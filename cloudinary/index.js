const cloudinary = require('cloudinary').v2;
const multer= require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

const storage =multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, '../../public/blogUploads')
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})



module.exports = {cloudinary, storage}