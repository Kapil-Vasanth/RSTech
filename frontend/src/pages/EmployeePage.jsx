import EmployeeTable from '../components/EmployeeTable';
import { useEmployees } from '../hooks/useEmployees';

export default function EmployeePage() {
  const { data: employees, isLoading, isError } = useEmployees();

  if (isLoading) return <p className="p-4">Loading employees...</p>;
  if (isError) return <p className="p-4 text-red-600">Error fetching employees.</p>;

  return (
    <div className="p-4">
      <EmployeeTable employees={employees} />
    </div>
  );
}

// const dummyData = [{
//   name: "Arlene",
//   id: "671190345",
//   department: "Design",
//   designation: "Design Lead",
//   project: "Car Rental",
//   type: "Office",
//   status: "Permanent",
//   image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", // replace with a real image if needed
// }];