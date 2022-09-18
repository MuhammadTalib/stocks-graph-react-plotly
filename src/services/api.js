import axios from "axios";

axios.defaults.baseURL = "http://3.210.142.92:5000/";

export const getAllStocks = async (endpoint, method, data) => {
  if (method === "post") {
    return await axios
      .post(`${endpoint}`, data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return await axios
    .get(`${endpoint}`)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
