import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const makeRequest = async (url: string, method: string, data?: unknown) => {
  const response = await api({
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
