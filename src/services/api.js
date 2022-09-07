import axios from "axios";

axios.defaults.baseURL = "http://3.210.142.92:5000/";

export const getAllStocks = async (endpoint) => {
  return await axios
    .get(`${endpoint}`)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
