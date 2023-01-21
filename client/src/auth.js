import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

export default axiosWithAuth;
