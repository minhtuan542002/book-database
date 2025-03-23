import axios from 'axios';

const API_BASE_URL = "https://your-gateway-api-url.com";

export const login = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const logout = async (token) => {
  return axios.post(`${API_BASE_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};