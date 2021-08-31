import axios, { AxiosInstance } from "axios"
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  });

export default apiClient