import cloudinary from '../config/cloudinary'
import Sentry from '../config/sentry';
import orderSchema from "../database/schemas/orderSchema";
import { CLOUDINARY_FOLDER_NAME, CLOUDINARY_EXISTING_FOLDER_NAME } from './constants';

export const uploadToCloudinaryUtil = async (url) => {
    return cloudinary.uploader.upload(url, {
      folder: CLOUDINARY_FOLDER_NAME,
      overwrite: true,
      invalidate: true,
      width: 810, height: 456, crop: "fill",
      resource_type: ".png",
    });
  };


export const renameCloudinaryFileUtil = async (url) => {
  const startIndex = url.indexOf(CLOUDINARY_EXISTING_FOLDER_NAME) + CLOUDINARY_EXISTING_FOLDER_NAME.length;

  let publicId = url.slice(startIndex, url.lastIndexOf("."));
  let existingId = `${CLOUDINARY_EXISTING_FOLDER_NAME}${publicId}`;
  let newPublicId = `${CLOUDINARY_FOLDER_NAME}${publicId}`;

  return cloudinary.uploader.rename(existingId, newPublicId);
};
    
export const moveCloudinaryImages = async (id, images, rename) => {
  try {
    const thumbs = []
    const updatedCloudinaryImages = {}
    const imageKeys = Object.keys(images)

    await Promise.all(imageKeys.map(async (key) => {
      let file = null
      if (rename) {
        file = await renameCloudinaryFileUtil(images[key]);
      } else {
        file = await uploadToCloudinaryUtil(images[key]);
      }
      const imgUrl = file.secure_url;
      thumbs.push(imgUrl)
      updatedCloudinaryImages[key] = imgUrl
      return
    }))

    return await orderSchema.findByIdAndUpdate(
      { _id: id },
      {
        thumbs,
        ...updatedCloudinaryImages,
      }
    );
  } catch (err) {
    console.info('Log', err)
    Sentry.captureEvent({
      message: "Unable to upload images to cloudinary",
      data: images,
    });
  }
};