import axios from 'axios';

const API_URL = 'http://localhost:3000/employees'; // Adjust to your backend URL

export const createEmployee = (employeeData: any) => {
  return axios.post(API_URL, employeeData);
};
