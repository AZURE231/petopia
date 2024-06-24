import axios from 'axios';

export const postImage = async (formData: FormData) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_STORAGE_ENDPOINT || '',
      formData
    );
    return res.data.data.url;
  } catch (err) {
    return '';
  }
};
