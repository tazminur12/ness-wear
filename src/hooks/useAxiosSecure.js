import axios from "axios";
import { useMemo } from "react";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ness-wear-backend.vercel.app';
    const instance = axios.create({
      baseURL: apiBaseUrl,
      withCredentials: true,
      timeout: 10000, // 10 second timeout
    });

    // Add request interceptor
    instance.interceptors.request.use(
      (config) => {
        // Try to get token from multiple sources
        let token = localStorage.getItem('access-token');
        
        // If not found, try to get from auth data
        if (!token) {
          const authData = localStorage.getItem('auth');
          if (authData) {
            try {
              const parsedAuth = JSON.parse(authData);
              token = parsedAuth.token;
            } catch (error) {
              console.error('Error parsing auth data:', error);
            }
          }
        }
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for better error handling
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - clear local storage
          localStorage.removeItem('access-token');
          localStorage.removeItem('auth');
          // Optionally redirect to login page
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;