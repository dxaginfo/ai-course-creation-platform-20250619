import axios from 'axios';
import { Course, CourseOutline } from '../types/Course';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const courseService = {
  getCourses: async () => {
    const response = await axios.get(`${API_URL}/courses`, getAuthHeaders());
    return response.data;
  },

  getCourseById: async (id: string) => {
    const response = await axios.get(`${API_URL}/courses/${id}`, getAuthHeaders());
    return response.data;
  },

  createCourse: async (courseData: Partial<Course>) => {
    const response = await axios.post(`${API_URL}/courses`, courseData, getAuthHeaders());
    return response.data;
  },

  updateCourse: async (id: string, courseData: Partial<Course>) => {
    const response = await axios.put(`${API_URL}/courses/${id}`, courseData, getAuthHeaders());
    return response.data;
  },

  deleteCourse: async (id: string) => {
    await axios.delete(`${API_URL}/courses/${id}`, getAuthHeaders());
    return id;
  },

  generateOutline: async (parameters: { topic: string; level: string; duration: string }) => {
    const response = await axios.post(`${API_URL}/ai/generate-outline`, parameters, getAuthHeaders());
    return response.data;
  },

  generateModuleContent: async (parameters: { moduleTitle: string; courseContext: string }) => {
    const response = await axios.post(`${API_URL}/ai/generate-module`, parameters, getAuthHeaders());
    return response.data;
  },

  generateAssessment: async (parameters: { moduleTitle: string; moduleContent: string; assessmentType: string }) => {
    const response = await axios.post(`${API_URL}/ai/generate-assessment`, parameters, getAuthHeaders());
    return response.data;
  },
};

export default courseService;
