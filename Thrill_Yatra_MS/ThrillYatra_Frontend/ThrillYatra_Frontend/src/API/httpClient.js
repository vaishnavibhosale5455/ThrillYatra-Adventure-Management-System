
import axios from "axios";

console.log("SPRING:", process.env.REACT_APP_SPRING_API_URL);
console.log("ADV:", process.env.REACT_APP_ADVENTURE_API_URL);
console.log("REVIEW:", process.env.REACT_APP_REVIEW_API_URL);  


export const springApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adventureApi = axios.create({
  baseURL: process.env.REACT_APP_ADVENTURE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mailApi = axios.create({
  baseURL: process.env.REACT_APP_MAIL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const reviewApi = axios.create({
  baseURL: process.env.REACT_APP_REVIEW_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const attachToken = (config) => {
  const token = sessionStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

springApi.interceptors.request.use(attachToken);
adventureApi.interceptors.request.use(attachToken);
mailApi.interceptors.request.use(attachToken);
reviewApi.interceptors.request.use(attachToken);
