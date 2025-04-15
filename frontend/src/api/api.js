import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL if different
});

// Employees API methods
export const getEmployees = async () => {
  const res = await API.get('/employees');
  return res.data;
};

export const getEmployeeById = async (id) => {
  const res = await API.get(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await API.post('/employees', employee);
  return res.data;
};

export const updateEmployee = async ({ id, ...employee }) => {
  const res = await API.put(`/employees/${id}`, employee);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};
