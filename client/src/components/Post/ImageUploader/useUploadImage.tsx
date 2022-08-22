import { uploadProductImage } from '@apis/imageUpload';
import { FormEvent, useState } from 'react';

const MAX_QUANTITY_IMG_URLS = 2;

export const useUploadImage = () => {
  const [uploadedImgUrls, setUploadedImgUrls] = useState<string[]>([]);

  const deleteImageFile = (imgUrl: string) => {
    const newUploadedImageFiles = uploadedImgUrls.filter(
      (uploadedImgUrl) => uploadedImgUrl !== imgUrl,
    );
    setUploadedImgUrls(newUploadedImageFiles);
  };

  const addImageFile = (imgUrl: string) => {
    setUploadedImgUrls([...uploadedImgUrls, imgUrl]);
  };

  const imageUpload = async (e: FormEvent<HTMLInputElement>) => {
    // validation 로직 처리 필요
    if (uploadedImgUrls.length >= MAX_QUANTITY_IMG_URLS) {
      e.preventDefault();
      return;
    }

    const imageFiles = e.currentTarget.files;
    if (imageFiles && imageFiles.length > 0) {
      const imageFile = imageFiles[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgUrl = await uploadProductImage(formData);
      addImageFile(imgUrl);
    }
  };

  const actions = { deleteImageFile, imageUpload, addImageFile };
  return { uploadedImgUrls, actions };
};
