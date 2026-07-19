import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploads a local file path (from multer) to Cloudinary and returns the secure URL
export const uploadImage = async (filePath, folder = "smart-task-manager") => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return { url: result.secure_url, publicId: result.public_id };
};

// Deletes an image by its Cloudinary public_id
export const deleteImage = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;