import axios from 'axios';
import { UseFormReturn } from 'react-hook-form';

export const postImage = async (formData: FormData) => {
  try {
    const res = await axios.post(
      'https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b',
      formData
    );
    return res.data.data.url;
  } catch (err) {
    return '';
  }
};

export const uploadImage = async ({
  uploadImageForm,
  createPostForm,
}: {
  uploadImageForm: UseFormReturn<any, any, undefined>;
  createPostForm: UseFormReturn<any, any, undefined>;
}) => {
  const files = uploadImageForm.getValues('files');

  if (files && files.length > 0) {
    // Convert FileList to array
    const filesArray = Array.from(files);

    // Use Promise.all to await all image uploads
    await Promise.all(
      filesArray.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const url: string = await postImage(formData);
        url &&
          createPostForm.setValue('images', [
            ...createPostForm.getValues('images'),
            url,
          ]);
      })
    );
  }
  setIsLoading(false);
};
