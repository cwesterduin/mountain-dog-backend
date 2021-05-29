import axios from 'axios'
import { apiUrl } from '..'

export const createData = async (type, content) => {
    try {
      console.log(JSON.stringify(content))
      const { data } = await axios.post(`${apiUrl}/admin/${type}`, {
        ...content
      });
      return data;
    } catch (err) {
      console.warn(err.message);
    }
  };