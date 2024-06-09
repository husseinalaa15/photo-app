import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.pexels.com/', 
  headers: {
    Authorization:  `${import.meta.env.VITE_PEXELS_API_KEY}`, // Replace with your actual API key
  },
  timeout: 30000, 
});



export default axiosInstance;
