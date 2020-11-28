import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.breakingbadapi.com/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default {
  getCharacters: (offset = 0, name = "") =>
    axiosInstance({
      method: "GET",
      url: `characters?name=${name}&limit=10&offset=${offset}`,
    }),
};
