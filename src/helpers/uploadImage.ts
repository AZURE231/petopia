import axios from 'axios';

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await axios.post(
      'https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b',
      formData
    );
    return res;
    //   setValue('images', [...getValues('images'), res.data.data.url]);
  } catch (err) {
    console.error(err);
  }
};
