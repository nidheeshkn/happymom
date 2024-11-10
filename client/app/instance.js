// axios.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`, // Replace with your backend API URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config=> {
  
   
    const token = sessionStorage.getItem('sls_token');

    // console.log(token);
    // If token exists, add it to the request headers
    // console.log(config,"config");
    // console.log(location.href,location.href.includes("registration"));
    if (token ) {
      config.headers.Authorization = `Bearer ${token}`;
    // console.log(config,"config");

    }

    
    else{
        console.log("login", location.href);
      if (location.href.includes("registration") || location.href.includes("resetpassword") || location.href.includes("readrequest")) {
        // Redirect to the login page
        
        console.log("login", location.href);
      }
      else{
        return location.href = "/login";
      }
    
    }
    
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
