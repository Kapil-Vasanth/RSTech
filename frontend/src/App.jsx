import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import MainLayout from './layouts/MainLayout';
import AddEmployeePage from './pages/AddEmployeePage'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employee" element={<EmployeePage />} />
        <Route path="employee/add" element={<AddEmployeePage />} />
      </Route>
    </Routes>
  );
}
