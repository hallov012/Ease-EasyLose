import axios from "axios";

const instance = axios.create({
  baseURL: "https://j7a704.p.ssafy.io/api",

  // baseURL: "https://i7a407.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const createHeaders = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export { instance, createHeaders };
