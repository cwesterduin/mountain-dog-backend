import axios from 'axios'
import { apiUrl } from '..'

export const createEvent = async (marker) => {
    try {
      const { data } = await axios.post(`${apiUrl}/admin/events`, {
          x: "x",
          y: "y",
          z: "z"
      });
      return data;
    } catch (err) {
      console.warn(err.message);
    }
  };