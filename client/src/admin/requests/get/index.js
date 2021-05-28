import axios from 'axios'
import { apiUrl } from '..'

export const getData = async (type) => {
    try {
      const { data } = await axios.get(`${apiUrl}/admin/${type}`, {
      });
      return data;
    } catch (err) {
      console.warn(err.message);
    }
  };