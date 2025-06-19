import axios from 'axios';
import { User } from '../types/User';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const authService = {
  register: async (userData: Omit<User, 'id'> & { password: string }) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;
