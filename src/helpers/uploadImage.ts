import axios from 'axios';

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_STORAGE_ENDPOINT || '',
      formData
    );
    return res;
  } catch (err) { }
};
