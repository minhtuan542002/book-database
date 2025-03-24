import axios from 'axios';

const API_BASE_URL = "https://your-gateway-api-url.com";

export const fetchComics = async () => {
  return axios.get(`${API_BASE_URL}/comics`);
};

export const createComic = async (comic, token) => {
  return axios.post(`${API_BASE_URL}/comics`, comic, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateComic = async (comic, token) => {
  return axios.put(`${API_BASE_URL}/comics`, comic, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteComic = async (id, token) => {
  return axios.delete(`${API_BASE_URL}/comics/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
